import { error, fail } from '@sveltejs/kit';
import { one } from '$lib/utils/crmDisplay';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: projectRow } = await locals.supabase
		.from('projects')
		.select('id, name, slug, clients(full_name, email)')
		.eq('slug', params.slug)
		.maybeSingle();

	if (!projectRow) throw error(404, 'Project not found');
	const project = { ...projectRow, client: one(projectRow.clients) };

	const { data: invoices } = await locals.supabase
		.from('invoices')
		.select('id, invoice_number, issue_date, due_date, status, total, paid_at')
		.eq('project_id', project.id)
		.order('invoice_number', { ascending: false });

	return { project, invoices: invoices ?? [] };
};

export const actions: Actions = {
	markStatus: async ({ request, locals }) => {
		const data = await request.formData();
		const invoiceId = data.get('invoice_id') as string;
		const status = data.get('status') as string;

		if (!invoiceId || !['pending', 'paid', 'void'].includes(status)) {
			return fail(400, { error: 'Invalid status update.' });
		}

		const { error: updateError } = await locals.supabase
			.from('invoices')
			.update({ status, paid_at: status === 'paid' ? new Date().toISOString() : null })
			.eq('id', invoiceId);

		if (updateError) return fail(500, { error: 'Could not update that invoice. Please try again.' });
		return { success: true };
	}
};
