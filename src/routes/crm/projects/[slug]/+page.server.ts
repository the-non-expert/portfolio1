import { error, fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import type { Actions, PageServerLoad } from './$types';

const resend = new Resend(RESEND_API_KEY);

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: project } = await locals.supabase
		.from('projects')
		.select('id, name, slug, status, summary, created_at, billing_type, rate')
		.eq('slug', params.slug)
		.maybeSingle();

	if (!project) throw error(404, 'Project not found');

	const { data: entries } = await locals.supabase
		.from('entries')
		.select('id, entry_type, title, body, entry_date, due_date, status, hours, author_type')
		.eq('project_id', project.id)
		.eq('visible_to_client', true)
		.order('entry_date', { ascending: false })
		.order('created_at', { ascending: false })
		.order('id', { ascending: false });

	const entryIds = (entries ?? []).map((e) => e.id);
	const { data: comments } = entryIds.length
		? await locals.supabase
				.from('comments')
				.select('id, entry_id, author_type, body, created_at')
				.in('entry_id', entryIds)
				.order('created_at', { ascending: true })
		: { data: [] };

	const entriesWithComments = (entries ?? []).map((entry) => ({
		...entry,
		comments: (comments ?? []).filter((c) => c.entry_id === entry.id)
	}));

	return { project, entries: entriesWithComments };
};

export const actions: Actions = {
	logMeeting: async ({ request, locals, params }) => {
		const data = await request.formData();
		const title = (data.get('title') as string)?.trim() || 'Meeting';
		const body = (data.get('body') as string)?.trim() || null;
		const entryDate = (data.get('entry_date') as string) || null;

		if (body && body.length > 5000) {
			return fail(400, { error: 'Notes are too long (max 5000 characters).' });
		}

		const { data: project } = await locals.supabase
			.from('projects')
			.select('id, name')
			.eq('slug', params.slug)
			.maybeSingle();

		if (!project) return fail(404, { error: 'Project not found.' });

		// Only title/body/entry_date ever come from the client. entry_type,
		// visible_to_client, and author_type are fixed here regardless of
		// what's submitted — RLS enforces the same constraints server-side
		// for any request that skips this route entirely.
		const { error: insertError } = await locals.supabase.from('entries').insert({
			project_id: project.id,
			entry_type: 'meeting_note',
			title,
			body,
			...(entryDate ? { entry_date: entryDate } : {}),
			visible_to_client: true,
			author_type: 'client'
		});

		if (insertError) {
			return fail(500, { error: 'Could not save that meeting. Please try again.' });
		}

		await resend.emails.send({
			from: 'Client Portal <onboarding@resend.dev>',
			to: 'ayushjhun13@gmail.com',
			subject: `New meeting logged on ${project.name}`,
			html: `<p style="font-family: sans-serif; font-size: 14px;">A client logged a meeting on ${project.name}. <a href="https://ayushjhunjhunwala.com/crm/login">Log in to see it</a>.</p>`
		});

		return { success: true };
	},

	updateEntry: async ({ request, locals }) => {
		const data = await request.formData();
		const entryId = data.get('entry_id') as string;
		const title = (data.get('title') as string)?.trim() || 'Meeting';
		const body = (data.get('body') as string)?.trim() || null;
		const entryDate = (data.get('entry_date') as string) || null;

		if (!entryId) {
			return fail(400, { error: 'Missing entry.' });
		}
		if (body && body.length > 5000) {
			return fail(400, { error: 'Notes are too long (max 5000 characters).' });
		}

		// Whitelisted to title/body/entry_date only, and scoped to entries
		// this client authored — a client can edit their own meeting note,
		// never one the admin logged. RLS enforces the same scoping.
		const { data: updatedRows, error: updateError } = await locals.supabase
			.from('entries')
			.update({
				title,
				body,
				...(entryDate ? { entry_date: entryDate } : {})
			})
			.eq('id', entryId)
			.eq('author_type', 'client')
			.select('id');

		if (updateError) {
			return fail(500, { error: 'Could not save your changes. Please try again.' });
		}
		if (!updatedRows || updatedRows.length === 0) {
			return fail(403, { error: 'You can only edit meetings you logged yourself.' });
		}

		return { success: true };
	},

	comment: async ({ request, locals, params }) => {
		const data = await request.formData();
		const entryId = data.get('entry_id') as string;
		const body = (data.get('body') as string)?.trim();

		if (!entryId || !body) {
			return fail(400, { error: 'Write a comment before sending.' });
		}
		if (body.length > 3000) {
			return fail(400, { error: 'Comment is too long (max 3000 characters).' });
		}

		const { error: insertError } = await locals.supabase
			.from('comments')
			.insert({ entry_id: entryId, author_type: 'client', body });

		if (insertError) {
			return fail(500, { error: 'Could not post your comment. Please try again.' });
		}

		const { data: project } = await locals.supabase
			.from('projects')
			.select('name')
			.eq('slug', params.slug)
			.maybeSingle();

		await resend.emails.send({
			from: 'Client Portal <onboarding@resend.dev>',
			to: 'ayushjhun13@gmail.com',
			subject: `New client comment on ${project?.name ?? 'a project'}`,
			html: `<p style="font-family: sans-serif; font-size: 14px; white-space: pre-wrap;">${body}</p>`
		});

		return { success: true };
	}
};
