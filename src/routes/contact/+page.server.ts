import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    // Honeypot: real users never fill this in — bots do
    const honeypot = (data.get('website') as string) ?? '';
    if (honeypot) {
      return { success: true };
    }

    // Time gate: reject submissions faster than a human can type (< 3 s)
    const loadTime = parseInt((data.get('_t') as string) ?? '0', 10);
    if (loadTime && Date.now() - loadTime < 3000) {
      return fail(400, { error: 'Please take a moment to fill in your details.' });
    }

    const fullname = (data.get('fullname') as string)?.trim();
    const email = (data.get('email') as string)?.trim();
    const project_type = (data.get('project-type') as string)?.trim() || null;
    const description = (data.get('description') as string)?.trim();

    if (!fullname || !email || !description) {
      return fail(400, { error: 'Please fill in all required fields.' });
    }

    if (fullname.length > 100) {
      return fail(400, { error: 'Name is too long.' });
    }
    if (email.length > 254) {
      return fail(400, { error: 'Please enter a valid email address.' });
    }
    if (description.length > 5000) {
      return fail(400, { error: 'Message is too long (max 5000 characters).' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return fail(400, { error: 'Please enter a valid email address.' });
    }

    const { error: dbError } = await supabase
      .from('contacts')
      .insert({ fullname, email, project_type, description });

    if (dbError) {
      console.error('Supabase insert error:', dbError.message);
      return fail(500, { error: 'Something went wrong. Please try again or email me directly.' });
    }

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'ayushjhun13@gmail.com',
      subject: `New enquiry from ${fullname}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1C1B19;">
          <h2 style="font-size: 20px; margin-bottom: 4px;">New contact form submission</h2>
          <p style="color: #66635E; font-size: 13px; margin-top: 0;">Received via ayushjhunjhunwala.com</p>
          <hr style="border: none; border-top: 1px solid #D4D1CA; margin: 20px 0;" />
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #66635E; width: 120px;">Name</td>
              <td style="padding: 8px 0;">${fullname}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #66635E;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #C13B2A;">${email}</a></td>
            </tr>
            ${project_type ? `
            <tr>
              <td style="padding: 8px 0; color: #66635E;">Project type</td>
              <td style="padding: 8px 0;">${project_type}</td>
            </tr>` : ''}
          </table>
          <hr style="border: none; border-top: 1px solid #D4D1CA; margin: 20px 0;" />
          <p style="font-size: 13px; color: #66635E; margin-bottom: 6px;">Message</p>
          <p style="font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${description}</p>
        </div>
      `
    });

    return { success: true };
  }
};
