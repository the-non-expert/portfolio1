import { one } from '$lib/utils/crmDisplay';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const filter = url.searchParams.get('filter') ?? 'active';

	const { data: rows } = await locals.supabase
		.from('entries')
		.select(
			'id, title, body, entry_date, author_type, projects(slug, name, archived_at, clients(full_name))'
		)
		.eq('entry_type', 'meeting_note')
		.is('archived_at', null)
		.order('entry_date', { ascending: false })
		.order('created_at', { ascending: false });

	const meetings = (rows ?? [])
		.map((r: Record<string, unknown>) => {
			const project = one(r.projects) as Record<string, unknown> | null;
			if (!project) return null;
			const client = one(project.clients) as Record<string, unknown> | null;
			return {
				id: r.id as string,
				title: r.title as string,
				body: r.body as string | null,
				entry_date: r.entry_date as string,
				author_type: r.author_type as string,
				projectSlug: project.slug as string,
				projectName: project.name as string,
				projectArchived: project.archived_at !== null,
				clientName: client?.full_name as string | undefined
			};
		})
		.filter((m): m is NonNullable<typeof m> => m !== null)
		.filter((m) => {
			if (filter === 'active') return !m.projectArchived;
			if (filter === 'archived') return m.projectArchived;
			return true;
		});

	return { filter, meetings };
};
