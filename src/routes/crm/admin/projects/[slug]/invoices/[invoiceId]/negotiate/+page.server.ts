import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: invoice } = await locals.supabase
		.from('invoices')
		.select(
			'id, invoice_number, issue_date, due_date, status, bill_to, payee_override, subtotal, total, notes, show_rate, show_dates, misc_section_label, project_id, negotiated_from_id'
		)
		.eq('id', params.invoiceId)
		.maybeSingle();

	if (!invoice) throw error(404, 'Invoice not found');
	if (invoice.status === 'void') throw error(400, 'This invoice is void and cannot be negotiated.');

	const { data: itemRows } = await locals.supabase
		.from('invoice_items')
		.select('id, description, hours, rate, amount, item_date, is_period, period_end')
		.eq('invoice_id', invoice.id)
		.order('created_at', { ascending: true });

	const { data: project } = await locals.supabase
		.from('projects')
		.select('name, slug, clients(full_name)')
		.eq('id', invoice.project_id)
		.maybeSingle();

	const { data: lastInvoice } = await locals.supabase
		.from('invoices')
		.select('invoice_number')
		.not('invoice_number', 'is', null)
		.order('invoice_number', { ascending: false })
		.limit(1)
		.maybeSingle();

	return {
		invoice,
		items: itemRows ?? [],
		project,
		nextInvoiceNumber: (lastInvoice?.invoice_number ?? 10) + 1
	};
};

export const actions: Actions = {
	negotiate: async ({ request, locals, params }) => {
		const data = await request.formData();

		const { data: invoice } = await locals.supabase
			.from('invoices')
			.select(
				'id, project_id, bill_to, payee_override, subtotal, notes, show_rate, show_dates, misc_section_label, status'
			)
			.eq('id', params.invoiceId)
			.maybeSingle();

		if (!invoice) return fail(404, { error: 'Invoice not found.' });
		if (invoice.status === 'void') return fail(400, { error: 'This invoice is void and cannot be negotiated.' });

		const { data: itemRows } = await locals.supabase
			.from('invoice_items')
			.select('entry_id, description, hours, rate, amount, item_date, is_period, period_end')
			.eq('invoice_id', invoice.id);

		const settledRaw = (data.get('settled_amount') as string)?.trim();
		const settled = Number(settledRaw);
		if (!settledRaw || Number.isNaN(settled) || settled <= 0) {
			return fail(400, { error: 'Enter the settled price as a positive number.' });
		}
		const voidOriginal = data.get('void_original') === 'on';

		const today = new Date().toISOString().slice(0, 10);
		const due = new Date();
		due.setDate(due.getDate() + 7);

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

		const items: Item[] = (itemRows ?? []).map((row) => ({
			entry_id: row.entry_id,
			description: row.description,
			item_date: row.item_date,
			hours: row.hours,
			rate: row.rate,
			amount: Number(row.amount),
			is_period: row.is_period,
			period_end: row.period_end
		}));

		const adjustment = Math.round((settled - Number(invoice.subtotal)) * 100) / 100;
		if (Math.abs(adjustment) >= 0.005) {
			items.push({
				entry_id: null,
				description: 'Negotiated adjustment',
				item_date: today,
				hours: null,
				rate: null,
				amount: adjustment,
				is_period: false,
				period_end: null
			});
		}

		const { data: lastInvoice } = await locals.supabase
			.from('invoices')
			.select('invoice_number')
			.not('invoice_number', 'is', null)
			.order('invoice_number', { ascending: false })
			.limit(1)
			.maybeSingle();
		const invoiceNumber = (lastInvoice?.invoice_number ?? 10) + 1;

		const settledRounded = Math.round(settled * 100) / 100;

		const { data: newInvoice, error: invoiceError } = await locals.supabase
			.from('invoices')
			.insert({
				project_id: invoice.project_id,
				invoice_number: invoiceNumber,
				issue_date: today,
				due_date: due.toISOString().slice(0, 10),
				bill_to: invoice.bill_to,
				payee_override: invoice.payee_override,
				subtotal: settledRounded,
				total: settledRounded,
				notes: invoice.notes,
				show_rate: invoice.show_rate,
				show_dates: invoice.show_dates,
				misc_section_label: invoice.misc_section_label,
				negotiated_from_id: invoice.id
			})
			.select('id')
			.single();

		if (invoiceError || !newInvoice) {
			return fail(500, { error: 'Could not create the negotiated invoice. Please try again.' });
		}

		const { error: itemsError } = await locals.supabase
			.from('invoice_items')
			.insert(items.map((item) => ({ ...item, invoice_id: newInvoice.id })));

		if (itemsError) return fail(500, { error: 'Negotiated invoice created, but the line items failed to save.' });

		if (voidOriginal) {
			await locals.supabase.from('invoices').update({ status: 'void', paid_at: null }).eq('id', invoice.id);
		}

		throw redirect(303, `/crm/admin/projects/${params.slug}/invoices/${newInvoice.id}`);
	}
};
