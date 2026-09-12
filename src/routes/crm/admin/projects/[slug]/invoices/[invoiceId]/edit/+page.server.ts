import { error, fail, redirect } from '@sveltejs/kit';
import {
	INVOICE_PAYEE_NAME,
	INVOICE_PAYEE_ADDRESS,
	INVOICE_BANK_NAME,
	INVOICE_ACCOUNT_NAME,
	INVOICE_ACCOUNT_NUMBER,
	INVOICE_IFSC_CODE,
	INVOICE_UPI_ID,
	INVOICE_CONTACT_PHONE,
	INVOICE_CONTACT_WEBSITE
} from '$env/static/private';
import { one } from '$lib/utils/crmDisplay';
import { entryFullValue } from '$lib/utils/crmInvoice';
import type { Actions, PageServerLoad } from './$types';

const payee = {
	name: INVOICE_PAYEE_NAME,
	address: INVOICE_PAYEE_ADDRESS,
	bankName: INVOICE_BANK_NAME,
	accountName: INVOICE_ACCOUNT_NAME,
	accountNumber: INVOICE_ACCOUNT_NUMBER,
	ifsc: INVOICE_IFSC_CODE,
	upi: INVOICE_UPI_ID,
	phone: INVOICE_CONTACT_PHONE,
	website: INVOICE_CONTACT_WEBSITE
};

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: invoice } = await locals.supabase
		.from('invoices')
		.select(
			'id, invoice_number, issue_date, due_date, status, bill_to, payee_override, subtotal, total, notes, show_rate, show_dates, misc_section_label, project_id'
		)
		.eq('id', params.invoiceId)
		.maybeSingle();

	if (!invoice) throw error(404, 'Invoice not found');

	const { data: existingItemRows } = await locals.supabase
		.from('invoice_items')
		.select('id, entry_id, description, hours, rate, amount, item_date, is_period, period_end')
		.eq('invoice_id', invoice.id)
		.order('created_at', { ascending: true });
	const existingItems = existingItemRows ?? [];

	const { data: projectRow } = await locals.supabase
		.from('projects')
		.select('id, name, slug, billing_type, rate, clients(id, full_name, company)')
		.eq('id', invoice.project_id)
		.maybeSingle();

	if (!projectRow) throw error(404, 'Project not found');
	const project = { ...projectRow, client: one(projectRow.clients) };

	const { data: entries } = await locals.supabase
		.from('entries')
		.select('id, title, entry_date, hours, amount, status, is_period, period_end')
		.eq('project_id', project.id)
		.eq('entry_type', 'action_item')
		.order('entry_date', { ascending: true });

	const entryIds = (entries ?? []).map((e) => e.id);

	// Excludes this invoice's own items from "already billed" — otherwise an
	// entry currently on this invoice would show 0 remaining instead of the
	// full amount available to re-allocate.
	const { data: billedRows } = entryIds.length
		? await locals.supabase
				.from('invoice_items')
				.select('entry_id, amount, invoices!inner(status)')
				.in('entry_id', entryIds)
				.neq('invoices.status', 'void')
				.neq('invoice_id', invoice.id)
		: { data: [] };

	const billedByEntry = new Map<string, number>();
	for (const row of billedRows ?? []) {
		if (!row.entry_id) continue;
		billedByEntry.set(row.entry_id, (billedByEntry.get(row.entry_id) ?? 0) + Number(row.amount));
	}

	const existingByEntry = new Map(
		existingItems.filter((i) => i.entry_id).map((i) => [i.entry_id as string, i])
	);

	const billable = (entries ?? [])
		.map((entry) => {
			const fullValue = entryFullValue(entry, project.billing_type, project.rate);
			const alreadyBilled = billedByEntry.get(entry.id) ?? 0;
			const remaining = Math.round((fullValue - alreadyBilled) * 100) / 100;
			const onThisInvoice = existingByEntry.get(entry.id);
			return { ...entry, fullValue, alreadyBilled, remaining, currentAmount: onThisInvoice?.amount ?? null };
		})
		// Keep an entry visible if there's still money left to bill on it,
		// OR it's already a line on this invoice (so it stays checked/editable
		// even if that fully accounts for its remaining value).
		.filter((entry) => entry.remaining > 0.005 || existingByEntry.has(entry.id));

	const customItems = existingItems.filter((i) => !i.entry_id);

	return {
		invoice,
		project,
		billable,
		customItems,
		payee
	};
};

export const actions: Actions = {
	updateInvoice: async ({ request, locals, params }) => {
		const data = await request.formData();

		const { data: invoice } = await locals.supabase
			.from('invoices')
			.select('id, project_id')
			.eq('id', params.invoiceId)
			.maybeSingle();

		if (!invoice) return fail(404, { error: 'Invoice not found.' });

		const { data: projectRow } = await locals.supabase
			.from('projects')
			.select('id, billing_type, rate, clients(id, invoice_bill_to, invoice_payee_default)')
			.eq('id', invoice.project_id)
			.maybeSingle();

		if (!projectRow) return fail(404, { error: 'Project not found.' });
		const client = one(projectRow.clients);

		const issueDate = (data.get('issue_date') as string) || new Date().toISOString().slice(0, 10);
		const dueDate = (data.get('due_date') as string) || null;
		const billTo = (data.get('bill_to') as string)?.trim();
		const payeeOverride = (data.get('payee_override') as string)?.trim();
		const notes = (data.get('notes') as string)?.trim() || null;
		const showRate = data.get('show_rate') === 'on';
		const showDates = data.get('show_dates') === 'on';
		const miscSectionLabel = (data.get('misc_section_label') as string)?.trim() || null;

		if (!billTo) return fail(400, { error: 'Add a "bill to" name and address.' });
		if (!payeeOverride) return fail(400, { error: 'Add a "payable to" name (address is optional).' });

		const includedIds = data.getAll('entry_id') as string[];
		const customDescriptions = data.getAll('custom_description') as string[];
		const customAmounts = data.getAll('custom_amount') as string[];
		const customDates = data.getAll('custom_date') as string[];
		const customDateTos = data.getAll('custom_date_to') as string[];

		if (includedIds.length === 0 && customDescriptions.every((d) => !d.trim())) {
			return fail(400, { error: 'Select at least one item to invoice.' });
		}

		const { data: entryRows } = includedIds.length
			? await locals.supabase
					.from('entries')
					.select('id, title, hours, amount, entry_date, is_period, period_end')
					.in('id', includedIds)
			: { data: [] };

		type Item = {
			entry_id: string | null;
			description: string;
			item_date: string | null;
			hours: number | null;
			rate: number | null;
			amount: number;
			is_period: boolean;
			period_end: string | null;
		};
		const items: Item[] = [];

		const isHourly = projectRow.billing_type === 'hourly' && Number(projectRow.rate) > 0;

		for (const id of includedIds) {
			const entry = (entryRows ?? []).find((e) => e.id === id);
			if (!entry) continue;
			const amountRaw = data.get(`amount_${id}`) as string;
			const amount = Number(amountRaw);
			if (!amountRaw || Number.isNaN(amount) || amount <= 0) continue;

			const hours = isHourly ? Math.round((amount / Number(projectRow.rate)) * 100) / 100 : (entry.hours ?? null);
			const rate = isHourly ? Number(projectRow.rate) : null;

			items.push({
				entry_id: entry.id,
				description: entry.title,
				item_date: entry.entry_date,
				hours,
				rate,
				amount,
				is_period: entry.is_period ?? false,
				period_end: entry.period_end ?? null
			});
		}

		for (let i = 0; i < customDescriptions.length; i++) {
			const description = customDescriptions[i]?.trim();
			const amount = Number(customAmounts[i]);
			if (!description || Number.isNaN(amount) || amount <= 0) continue;
			const dateTo = customDateTos[i] || null;
			items.push({
				entry_id: null,
				description,
				item_date: customDates[i] || null,
				hours: null,
				rate: null,
				amount,
				is_period: Boolean(dateTo),
				period_end: dateTo
			});
		}

		if (items.length === 0) return fail(400, { error: 'Every selected line needs a positive amount.' });

		const subtotal = Math.round(items.reduce((sum, item) => sum + item.amount, 0) * 100) / 100;

		const { error: updateError } = await locals.supabase
			.from('invoices')
			.update({
				issue_date: issueDate,
				due_date: dueDate,
				bill_to: billTo,
				payee_override: payeeOverride,
				subtotal,
				total: subtotal,
				notes,
				show_rate: showRate,
				show_dates: showDates,
				misc_section_label: miscSectionLabel
			})
			.eq('id', invoice.id);

		if (updateError) return fail(500, { error: 'Could not update this invoice. Please try again.' });

		// Replacing rather than diffing keeps this in step with createInvoice's
		// line-building logic instead of needing a second, update-aware version
		// of it — invoice_items carry no id that anything outside this invoice
		// depends on, so a clean delete + reinsert is safe.
		const { error: deleteError } = await locals.supabase.from('invoice_items').delete().eq('invoice_id', invoice.id);
		if (deleteError) return fail(500, { error: 'Invoice updated, but replacing the line items failed.' });

		const { error: itemsError } = await locals.supabase
			.from('invoice_items')
			.insert(items.map((item) => ({ ...item, invoice_id: invoice.id })));

		if (itemsError) return fail(500, { error: 'Invoice updated, but the line items failed to save.' });

		if (client?.id) {
			const clientUpdates: Record<string, string> = {};
			if (billTo !== client.invoice_bill_to) clientUpdates.invoice_bill_to = billTo;
			if (payeeOverride !== client.invoice_payee_default) clientUpdates.invoice_payee_default = payeeOverride;
			if (Object.keys(clientUpdates).length) {
				await locals.supabase.from('clients').update(clientUpdates).eq('id', client.id);
			}
		}

		throw redirect(303, `/crm/admin/projects/${params.slug}/invoices/${invoice.id}`);
	}
};
