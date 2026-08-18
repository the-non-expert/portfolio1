import type { PageServerLoad } from './$types';

type ProjectRow = { status: string; archived_at: string | null };

export const load: PageServerLoad = async ({ locals, url }) => {
	const filter = url.searchParams.get('filter') ?? 'active';

	let query = locals.supabase
		.from('clients')
		.select('id, full_name, company, email, archived_at, projects(status, archived_at)')
		.order('full_name');

	if (filter === 'active') query = query.is('archived_at', null);
	else if (filter === 'archived') query = query.not('archived_at', 'is', null);

	const { data: rows } = await query;

	const clients = (rows ?? []).map((c) => {
		const projects = (c.projects ?? []) as ProjectRow[];
		const live = projects.filter((p) => !p.archived_at);
		const archived = c.archived_at !== null;

		let derivedStatus: 'Archived' | 'Active' | 'Dormant' | 'No projects';
		if (archived) derivedStatus = 'Archived';
		else if (live.some((p) => p.status === 'active')) derivedStatus = 'Active';
		else if (live.length > 0) derivedStatus = 'Dormant';
		else derivedStatus = 'No projects';

		return {
			id: c.id,
			full_name: c.full_name,
			company: c.company,
			email: c.email,
			archived,
			projectCount: live.length,
			derivedStatus
		};
	});

	return { filter, clients };
};
