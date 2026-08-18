import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

// Service-role client. Bypasses RLS entirely — only ever import this on the
// server, and only for the one thing regular RLS can't do: creating a
// Supabase Auth user on a client's behalf when we hand them their login.
export const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
	auth: { autoRefreshToken: false, persistSession: false }
});
