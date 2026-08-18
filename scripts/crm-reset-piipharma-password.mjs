/**
 * One-off: reset the Pii Pharma client login password and print it.
 * Passwords are hashed in Supabase Auth, so the one set when the client
 * was created (via /crm/admin/clients/new) can't be recovered — this
 * resets it to a new one so it can be handed to the client.
 * Run: node --env-file=.env scripts/crm-reset-piipharma-password.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'crypto';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('Missing PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const { data: client, error: clientError } = await supabase
  .from('clients')
  .select('auth_user_id, full_name, email')
  .eq('email', 'care@piipharma.com')
  .maybeSingle();

if (clientError || !client) {
  console.error('Could not find Pii Pharma client:', clientError?.message ?? 'no matching row');
  process.exit(1);
}

if (!client.auth_user_id) {
  console.error('Pii Pharma client row has no linked auth user — nothing to reset.');
  process.exit(1);
}

const password = randomBytes(9).toString('base64url'); // 12 chars, URL-safe

const { error: updateError } = await supabase.auth.admin.updateUserById(client.auth_user_id, { password });

if (updateError) {
  console.error('Could not reset password:', updateError.message);
  process.exit(1);
}

console.log(`Password reset for ${client.full_name} <${client.email}>.`);
console.log(`Login: https://ayushjhunjhunwala.com/crm/login`);
console.log(`Email: ${client.email}`);
console.log(`Password: ${password}`);
