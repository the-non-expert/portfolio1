import type { PageServerLoad } from './$types';

type OverviewRow = {
	id: string;
	slug: string;
	name: string;
	status: string;
	archived_at: string | null;
	created_at: string;
	client_name: string;
	client_email: string;
	entry_count: number;
	last_entry_at: string | null;
};

type EntryRow = { project_id: string; entry_type: string; status: string | null };
type InvoiceRow = {
	id: string;
	invoice_number: number | null;
	project_id: string;
	status: string;
	total: number;
	issue_date: string;
};

export const load: PageServerLoad = async ({ locals, url }) => {
	const filter = url.searchParams.get('filter') ?? 'active';

	let query = locals.supabase
		.from('crm_project_overview')
		.select('id, slug, name, status, archived_at, created_at, client_name, client_email, entry_count, last_entry_at')
		.order('created_at', { ascending: false });

	if (filter === 'active') query = query.is('archived_at', null);
	else if (filter === 'archived') query = query.not('archived_at', 'is', null);

	const { data: overview } = await query;
	const projectIds = (overview ?? []).map((p) => p.id);

	const [{ data: entries }, { data: invoices }] = await Promise.all([
		projectIds.length
			? locals.supabase
					.from('entries')
					.select('project_id, entry_type, status')
					.in('project_id', projectIds)
					.is('archived_at', null)
			: Promise.resolve({ data: [] as EntryRow[] }),
		projectIds.length
			? locals.supabase
					.from('invoices')
					.select('id, invoice_number, project_id, status, total, issue_date')
					.in('project_id', projectIds)
			: Promise.resolve({ data: [] as InvoiceRow[] })
	]);

	const projects = (overview ?? []).map((p: OverviewRow) => {
		const projectEntries = (entries ?? []).filter((e) => e.project_id === p.id);
		const openCount = projectEntries.filter(
			(e) => (e.entry_type === 'action_item' || e.entry_type === 'deadline') && e.status !== 'done'
		).length;
		const meetingCount = projectEntries.filter((e) => e.entry_type === 'meeting_note').length;

		const projectInvoices = (invoices ?? []).filter((i) => i.project_id === p.id);
		const pending = projectInvoices.filter((i) => i.status === 'pending');
		const pendingTotal = pending.reduce((sum, i) => sum + Number(i.total), 0);
		const latestPaid = projectInvoices
			.filter((i) => i.status === 'paid')
			.sort((a, b) => b.issue_date.localeCompare(a.issue_date))[0];

		let invoiceBadge: { kind: 'pending' | 'paid'; text: string; date?: string } | null = null;
		if (pending.length > 0) {
			invoiceBadge = {
				kind: 'pending',
				text: pending.length > 1 ? `${pending.length} invoices pending` : 'Invoice pending'
			};
		} else if (latestPaid) {
			invoiceBadge = { kind: 'paid', text: 'Paid through', date: latestPaid.issue_date };
		}

		return {
			...p,
			archived: p.archived_at !== null,
			openCount,
			meetingCount,
			pendingTotal,
			invoiceBadge
		};
	});

	const projectById = new Map(projects.map((p) => [p.id, p]));
	const pendingInvoices = (invoices ?? [])
		.filter((i) => i.status === 'pending')
		.map((i) => ({
			id: i.id,
			invoiceNumber: i.invoice_number,
			total: i.total,
			issueDate: i.issue_date,
			projectName: projectById.get(i.project_id)?.name ?? '',
			projectSlug: projectById.get(i.project_id)?.slug ?? ''
		}))
		.sort((a, b) => b.issueDate.localeCompare(a.issueDate));

	const pendingInvoiceCount = pendingInvoices.length;
	const pendingInvoiceTotal = pendingInvoices.reduce((sum, i) => sum + Number(i.total), 0);

	return {
		filter,
		projects,
		pendingInvoices,
		pendingInvoiceCount,
		pendingInvoiceTotal
	};
};
