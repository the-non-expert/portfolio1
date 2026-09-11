import { error, json } from '@sveltejs/kit';
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
import type { RequestHandler } from './$types';

// Backs the dashboard's quick invoice preview modal — same shape the full
// invoice page's load() returns, minus the negotiation cross-links that
// only matter once you're managing the invoice rather than glancing at it.
// +layout.server.ts's admin gate only runs for page loads, not +server.ts
// endpoints, so this checks admin access itself rather than inheriting it.
export const GET: RequestHandler = async ({ locals, params }) => {
	const { session, user } = await locals.safeGetSession();
	if (!session || !user) throw error(401, 'Not signed in');

	const { data: adminRow } = await locals.supabase
		.from('admins')
		.select('auth_user_id')
		.eq('auth_user_id', user.id)
		.maybeSingle();
	if (!adminRow) throw error(403, 'Admin access required');

	const { data: invoice } = await locals.supabase
		.from('invoices')
		.select(
			'id, invoice_number, issue_date, due_date, status, paid_at, bill_to, payee_override, subtotal, total, notes, show_rate, show_dates, misc_section_label, project_id, negotiated_from_id'
		)
		.eq('id', params.invoiceId)
		.maybeSingle();

	if (!invoice) throw error(404, 'Invoice not found');

	const { data: supersedes } = invoice.negotiated_from_id
		? await locals.supabase
				.from('invoices')
				.select('invoice_number')
				.eq('id', invoice.negotiated_from_id)
				.maybeSingle()
		: { data: null };

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

	return json({
		invoice,
		items,
		project,
		supersedesInvoiceNumber: supersedes?.invoice_number ?? null,
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
	});
};
