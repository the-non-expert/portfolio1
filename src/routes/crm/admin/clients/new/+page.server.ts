import { fail } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';
import { slugify, generatePassword } from '$lib/server/crm';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const fullName = (data.get('full_name') as string)?.trim();
		const email = (data.get('email') as string)?.trim();
		const company = (data.get('company') as string)?.trim() || null;
		const phone = (data.get('phone') as string)?.trim() || null;
		const projectName = (data.get('project_name') as string)?.trim();
		const billingType = (data.get('billing_type') as string) === 'hourly' ? 'hourly' : 'flat';
		const rateRaw = (data.get('rate') as string)?.trim();
		const rate = rateRaw ? Number(rateRaw) : null;

		if (!fullName || !email || !projectName) {
			return fail(400, { error: 'Fill in the client name, email, and project name.' });
		}
		if (rateRaw && (rate === null || Number.isNaN(rate) || rate < 0)) {
			return fail(400, { error: 'Rate must be a positive number.' });
		}

		const password = generatePassword();

		const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
			email,
			password,
			email_confirm: true
		});

		if (authError || !authUser.user) {
			return fail(400, { error: authError?.message ?? 'Could not create a login for this email.' });
		}

		const { data: client, error: clientError } = await locals.supabase
			.from('clients')
			.insert({ auth_user_id: authUser.user.id, full_name: fullName, email, company, phone })
			.select('id')
			.single();

		if (clientError || !client) {
			return fail(500, {
				error: 'Login was created, but saving the client record failed. Check Supabase.'
			});
		}

		const slug = slugify(projectName);
		const { error: projectError } = await locals.supabase
			.from('projects')
			.insert({ client_id: client.id, name: projectName, slug, billing_type: billingType, rate });

		if (projectError) {
			return fail(500, {
				error: 'Client saved, but creating the project failed. Check Supabase.'
			});
		}

		return { success: true, email, password, slug, projectName };
	}
};
