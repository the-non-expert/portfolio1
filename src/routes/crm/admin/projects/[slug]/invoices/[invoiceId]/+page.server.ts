import { error, fail } from '@sveltejs/kit';
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
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: invoice } = await locals.supabase
		.from('invoices')
		.select(
			'id, invoice_number, issue_date, due_date, status, paid_at, bill_to, subtotal, total, notes, show_rate, misc_section_label, project_id'
		)
		.eq('id', params.invoiceId)
		.maybeSingle();

	if (!invoice) throw error(404, 'Invoice not found');

	const { data: itemRows } = await locals.supabase
		.from('invoice_items')
		.select('id, description, hours, rate, amount, item_date, is_period, period_end')
		.eq('invoice_id', invoice.id)
		.order('created_at', { ascending: true });

	const items = (itemRows ?? []).map((row) => ({
		...row,
		date: row.item_date,
		isPeriod: row.is_period,
		periodEnd: row.period_end
	}));

	const { data: project } = await locals.supabase
		.from('projects')
		.select('name, slug')
		.eq('id', invoice.project_id)
		.maybeSingle();

	return {
		invoice,
		items,
		project,
		payee: {
			name: INVOICE_PAYEE_NAME,
			address: INVOICE_PAYEE_ADDRESS,
			bankName: INVOICE_BANK_NAME,
			accountName: INVOICE_ACCOUNT_NAME,
			accountNumber: INVOICE_ACCOUNT_NUMBER,
			ifsc: INVOICE_IFSC_CODE,
			upi: INVOICE_UPI_ID,
			phone: INVOICE_CONTACT_PHONE,
			website: INVOICE_CONTACT_WEBSITE
		}
	};
};

export const actions: Actions = {
	markStatus: async ({ request, locals, params }) => {
		const data = await request.formData();
		const status = data.get('status') as string;

		if (!['pending', 'paid', 'void'].includes(status)) {
			return fail(400, { error: 'Invalid status update.' });
		}

		const { error: updateError } = await locals.supabase
			.from('invoices')
			.update({ status, paid_at: status === 'paid' ? new Date().toISOString() : null })
			.eq('id', params.invoiceId);

		if (updateError) return fail(500, { error: 'Could not update this invoice. Please try again.' });
		return { success: true };
	}
};
