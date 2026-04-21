import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const fullname = (data.get('fullname') as string)?.trim();
    const email = (data.get('email') as string)?.trim();
    const project_type = (data.get('project-type') as string)?.trim() || null;
    const description = (data.get('description') as string)?.trim();

    if (!fullname || !email || !description) {
      return fail(400, { error: 'Please fill in all required fields.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return fail(400, { error: 'Please enter a valid email address.' });
    }

    const { error } = await supabase
      .from('contacts')
      .insert({ fullname, email, project_type, description });

    if (error) {
      console.error('Supabase insert error:', error.message);
      return fail(500, { error: 'Something went wrong. Please try again or email me directly.' });
    }

    return { success: true };
  }
};
