import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const email = (data.get('email') as string)?.trim();
		const password = (data.get('password') as string) ?? '';

		if (!email || !password) {
			return fail(400, { error: 'Enter your email and password.' });
		}

		const { data: signInData, error } = await locals.supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error || !signInData.user) {
			return fail(400, { error: 'Incorrect email or password.' });
		}

		const { data: adminRow } = await locals.supabase
			.from('admins')
			.select('auth_user_id')
			.eq('auth_user_id', signInData.user.id)
			.maybeSingle();

		throw redirect(303, adminRow ? '/crm/admin' : '/crm');
	}
};
