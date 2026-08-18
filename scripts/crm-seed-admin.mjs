/**
 * One-off: create your own CRM admin login.
 * Run: node --env-file=.env scripts/crm-seed-admin.mjs you@email.com "a-password"
 * Requires PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env, and the
 * CRM tables from supabase/schema.sql already created.
 */

import { createClient } from '@supabase/supabase-js';

const [, , email, password] = process.argv;

if (!email || !password) {
  console.error('Usage: node --env-file=.env scripts/crm-seed-admin.mjs you@email.com "a-password"');
  process.exit(1);
}

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('Missing PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true
});

if (error || !data.user) {
  console.error('Could not create user:', error?.message);
  process.exit(1);
}

const { error: adminError } = await supabase.from('admins').insert({ auth_user_id: data.user.id });

if (adminError) {
  console.error('User created, but adding to admins failed:', adminError.message);
  process.exit(1);
}

console.log(`Admin login ready. Log in at /crm/login with ${email}`);
