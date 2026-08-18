import { one } from '$lib/utils/crmDisplay';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const filter = url.searchParams.get('filter') ?? 'active';

	let query = locals.supabase
		.from('projects')
		.select('slug, name, status, archived_at, created_at, clients(full_name, email)')
		.order('created_at', { ascending: false });

	if (filter === 'active') query = query.is('archived_at', null);
	else if (filter === 'archived') query = query.not('archived_at', 'is', null);

	const { data: projects } = await query;

	return {
		filter,
		projects: (projects ?? []).map((p) => ({
			...p,
			client: one(p.clients),
			archived: p.archived_at !== null
		}))
	};
};
