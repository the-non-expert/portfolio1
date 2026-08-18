import { redirect } from '@sveltejs/kit';
import { one } from '$lib/utils/crmDisplay';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const { session, user } = await locals.safeGetSession();

	if (!session || !user) {
		if (url.pathname !== '/crm/login') {
			throw redirect(303, '/crm/login');
		}
		return { session: null, isAdmin: false, email: undefined, switcherProjects: [] };
	}

	const { data: adminRow } = await locals.supabase
		.from('admins')
		.select('auth_user_id')
		.eq('auth_user_id', user.id)
		.maybeSingle();
	const isAdmin = !!adminRow;

	if (url.pathname === '/crm/login') {
		throw redirect(303, isAdmin ? '/crm/admin' : '/crm');
	}

	const projectsQuery = isAdmin
		? locals.supabase
				.from('projects')
				.select('slug, name, status, archived_at, clients(full_name)')
				.order('full_name', { foreignTable: 'clients' })
				.order('name')
		: locals.supabase.from('projects').select('slug, name, status, archived_at').order('name');

	const { data: projectRows, error: projectsError } = await projectsQuery;
	if (projectsError) console.error('CRM switcher projects query failed:', projectsError.message);

	const switcherProjects = (projectRows ?? []).map((p: Record<string, unknown>) => ({
		slug: p.slug as string,
		name: p.name as string,
		status: p.status as string,
		archived: p.archived_at !== null,
		clientName: isAdmin ? (one(p.clients) as { full_name?: string } | null)?.full_name : undefined
	}));

	return { session, isAdmin, email: user.email, switcherProjects };
};
