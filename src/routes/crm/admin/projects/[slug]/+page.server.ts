import { error, fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import { ENTRY_TYPES, one } from '$lib/utils/crmDisplay';
import type { Actions, PageServerLoad } from './$types';

const resend = new Resend(RESEND_API_KEY);

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: projectRow } = await locals.supabase
		.from('projects')
		.select('id, name, slug, status, summary, created_at, billing_type, rate, clients(full_name, email)')
		.eq('slug', params.slug)
		.maybeSingle();

	if (!projectRow) throw error(404, 'Project not found');
	const project = { ...projectRow, client: one(projectRow.clients) };

	const { data: entries } = await locals.supabase
		.from('entries')
		.select(
			'id, entry_type, title, body, entry_date, due_date, status, visible_to_client, hours, amount, is_period, period_end, author_type'
		)
		.eq('project_id', project.id)
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
	addEntry: async ({ request, locals, params }) => {
		const data = await request.formData();
		const entryType = data.get('entry_type') as string;
		const title = (data.get('title') as string)?.trim();
		const body = (data.get('body') as string)?.trim() || null;
		const entryDate = (data.get('entry_date') as string) || null;
		const dueDate = (data.get('due_date') as string) || null;
		const status = (data.get('status') as string) || null;
		const visibleToClient = data.get('visible_to_client') === 'on';
		const hoursRaw = (data.get('hours') as string)?.trim();
		const hours = hoursRaw ? Number(hoursRaw) : null;
		const amountRaw = (data.get('amount') as string)?.trim();
		const amount = amountRaw ? Number(amountRaw) : null;
		const isPeriod = data.get('is_period') === 'on';
		const periodEnd = (data.get('period_end') as string) || null;

		if (!title || !ENTRY_TYPES.includes(entryType)) {
			return fail(400, { error: 'Pick a type and give the entry a title.' });
		}
		if (hoursRaw && (hours === null || Number.isNaN(hours) || hours < 0)) {
			return fail(400, { error: 'Hours must be a positive number.' });
		}
		if (amountRaw && (amount === null || Number.isNaN(amount) || amount < 0)) {
			return fail(400, { error: 'Amount must be a positive number.' });
		}

		const { data: projectRow } = await locals.supabase
			.from('projects')
			.select('id, name, clients(email)')
			.eq('slug', params.slug)
			.maybeSingle();

		if (!projectRow) return fail(404, { error: 'Project not found.' });
		const clientEmail = one(projectRow.clients)?.email;

		const { error: insertError } = await locals.supabase.from('entries').insert({
			project_id: projectRow.id,
			entry_type: entryType,
			title,
			body,
			...(entryDate ? { entry_date: entryDate } : {}),
			due_date: dueDate || null,
			status: status || null,
			visible_to_client: visibleToClient,
			hours,
			amount,
			is_period: isPeriod,
			period_end: isPeriod ? periodEnd : null
		});

		if (insertError) {
			return fail(500, { error: 'Could not save that entry. Please try again.' });
		}

		if (visibleToClient && clientEmail) {
			await resend.emails.send({
				from: 'Client Portal <onboarding@resend.dev>',
				to: clientEmail,
				subject: `New update on ${projectRow.name}`,
				html: `<p style="font-family: sans-serif; font-size: 14px;">There's a new update on your project. Log in to see it: <a href="https://ayushjhunjhunwala.com/crm/login">ayushjhunjhunwala.com/crm/login</a></p>`
			});
		}

		return { success: true };
	},

	logMeeting: async ({ request, locals, params }) => {
		const data = await request.formData();
		const title = (data.get('title') as string)?.trim() || 'Meeting';
		const body = (data.get('body') as string)?.trim() || null;
		const entryDate = (data.get('entry_date') as string) || null;

		if (body && body.length > 5000) {
			return fail(400, { error: 'Notes are too long (max 5000 characters).' });
		}

		const { data: projectRow } = await locals.supabase
			.from('projects')
			.select('id, name, clients(email)')
			.eq('slug', params.slug)
			.maybeSingle();

		if (!projectRow) return fail(404, { error: 'Project not found.' });
		const clientEmail = one(projectRow.clients)?.email;

		const { error: insertError } = await locals.supabase.from('entries').insert({
			project_id: projectRow.id,
			entry_type: 'meeting_note',
			title,
			body,
			...(entryDate ? { entry_date: entryDate } : {}),
			visible_to_client: true,
			author_type: 'admin'
		});

		if (insertError) {
			return fail(500, { error: 'Could not save that meeting. Please try again.' });
		}

		if (clientEmail) {
			await resend.emails.send({
				from: 'Client Portal <onboarding@resend.dev>',
				to: clientEmail,
				subject: `New update on ${projectRow.name}`,
				html: `<p style="font-family: sans-serif; font-size: 14px;">There's a new update on your project. Log in to see it: <a href="https://ayushjhunjhunwala.com/crm/login">ayushjhunjhunwala.com/crm/login</a></p>`
			});
		}

		return { success: true };
	},

	updateEntry: async ({ request, locals }) => {
		const data = await request.formData();
		const entryId = data.get('entry_id') as string;
		const entryType = data.get('entry_type') as string;
		const title = (data.get('title') as string)?.trim();
		const body = (data.get('body') as string)?.trim() || null;
		const entryDate = (data.get('entry_date') as string) || null;
		const dueDate = (data.get('due_date') as string) || null;
		const status = (data.get('status') as string) || null;
		const visibleToClient = data.get('visible_to_client') === 'on';
		const hoursRaw = (data.get('hours') as string)?.trim();
		const hours = hoursRaw ? Number(hoursRaw) : null;
		const amountRaw = (data.get('amount') as string)?.trim();
		const amount = amountRaw ? Number(amountRaw) : null;
		const isPeriod = data.get('is_period') === 'on';
		const periodEnd = (data.get('period_end') as string) || null;

		if (!entryId || !title || !ENTRY_TYPES.includes(entryType)) {
			return fail(400, { error: 'Pick a type and give the entry a title.' });
		}
		if (hoursRaw && (hours === null || Number.isNaN(hours) || hours < 0)) {
			return fail(400, { error: 'Hours must be a positive number.' });
		}
		if (amountRaw && (amount === null || Number.isNaN(amount) || amount < 0)) {
			return fail(400, { error: 'Amount must be a positive number.' });
		}

		// Editing never emails the client — re-notifying on every typo fix
		// would be spam. Resend only fires from addEntry/logMeeting, on
		// first creation.
		//
		// Scoped to author_type = 'admin': a client-logged meeting note is
		// the client's own record, so admin can reply via comments but not
		// silently rewrite it here.
		const { data: updatedRows, error: updateError } = await locals.supabase
			.from('entries')
			.update({
				entry_type: entryType,
				title,
				body,
				...(entryDate ? { entry_date: entryDate } : {}),
				due_date: dueDate || null,
				status: status || null,
				visible_to_client: visibleToClient,
				hours,
				amount,
				is_period: isPeriod,
				period_end: isPeriod ? periodEnd : null
			})
			.eq('id', entryId)
			.eq('author_type', 'admin')
			.select('id');

		if (updateError) {
			return fail(500, { error: 'Could not save your changes. Please try again.' });
		}
		if (!updatedRows || updatedRows.length === 0) {
			return fail(403, { error: "You can only edit updates you logged yourself — reply in the thread instead." });
		}

		return { success: true };
	},

	comment: async ({ request, locals }) => {
		const data = await request.formData();
		const entryId = data.get('entry_id') as string;
		const body = (data.get('body') as string)?.trim();

		if (!entryId || !body) {
			return fail(400, { error: 'Write a reply before sending.' });
		}

		const { error: insertError } = await locals.supabase
			.from('comments')
			.insert({ entry_id: entryId, author_type: 'admin', body });

		if (insertError) {
			return fail(500, { error: 'Could not post your reply. Please try again.' });
		}

		return { success: true };
	}
};
