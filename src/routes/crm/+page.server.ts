import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, parent }) => {
	const { isAdmin } = await parent();
	if (isAdmin) throw redirect(303, '/crm/admin');

	const { user } = await locals.safeGetSession();

	const { data: client } = await locals.supabase
		.from('clients')
		.select('id, full_name')
		.eq('auth_user_id', user!.id)
		.maybeSingle();

	if (!client) {
		return { client: null, projects: [] };
	}

	const { data: projects } = await locals.supabase
		.from('projects')
		.select('slug, name, status, summary')
		.eq('client_id', client.id)
		.order('created_at', { ascending: false });

	if (projects && projects.length === 1) {
		throw redirect(303, `/crm/projects/${projects[0].slug}`);
	}

	return { client, projects: projects ?? [] };
};
