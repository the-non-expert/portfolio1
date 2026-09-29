/**
 * Update fields on the EXISTING client that owns a project. Never creates
 * a client (the new-client form does that — it makes the portal login and
 * shows the password once, which has to stay a human step).
 *
 *   node --env-file=$HOME/My-Github/portfolio1/.env \
 *     $HOME/My-Github/portfolio1/scripts/crm/update-client.mjs --json input.json --dry-run|--write
 *
 * input.json:
 *   { "slug": "b2b-app-2cfded",
 *     "set": { "full_name": "...", "email": "...", "company": "...", "phone": "...",
 *              "invoice_bill_to": "line1\nline2", "invoice_payee_default": "..." } }
 *
 * Changing email ALSO changes the Supabase Auth user (email_confirm: true,
 * no confirmation mail) — clients.email is only a display copy; the portal
 * login lives on auth.users. Changing just the row would strand the client
 * on their old login. That auth write requires --change-login-email.
 */

import { parseArgs, writeMode, die, warn, show, supabase, getProjectBySlug, preflight } from './_lib.mjs';

const ALLOWED = ['full_name', 'email', 'company', 'phone', 'invoice_bill_to', 'invoice_payee_default'];
const REQUIRED = ['full_name', 'email']; // not null in the schema

const { flags, input } = parseArgs();
const write = writeMode(flags);
if (!input?.slug || !input?.set) die('Input needs { "slug": "...", "set": { ... } }.');

const project = await getProjectBySlug(input.slug);
const client = project.client;
if (!client) die('Project has no client row.');

const updates = {};
for (const [key, raw] of Object.entries(input.set)) {
	if (!ALLOWED.includes(key)) die(`"${key}" can't be set by this script. Allowed: ${ALLOWED.join(', ')}.`);
	const value = typeof raw === 'string' ? raw.trim() || null : raw;
	if (REQUIRED.includes(key) && !value) die(`${key} can't be empty.`);
	if ((client[key] ?? null) !== value) updates[key] = value;
}

if (Object.keys(updates).length === 0) {
	console.log('Nothing to change — every field already matches.');
	process.exit(0);
}

const emailChange = 'email' in updates;
if (emailChange) {
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updates.email)) die(`"${updates.email}" is not a valid email.`);
	const { data: clash } = await supabase.from('clients').select('id, full_name').ilike('email', updates.email).neq('id', client.id);
	if (clash?.length) die(`Another client (${clash[0].full_name}) already uses ${updates.email}.`);
	if (!client.auth_user_id) warn('Client has no linked portal login — only the row will change.');
	else if (!flags.has('change-login-email')) {
		die('Email change also moves the client\'s portal login (auth.users). Re-run with --change-login-email once Ayush has confirmed.');
	}
}

show('Client (before)', Object.fromEntries(Object.keys(updates).map((k) => [k, client[k] ?? null])));
show('clients UPDATE where id = ' + client.id, updates);
if (emailChange && client.auth_user_id) {
	show('auth.admin.updateUserById(' + client.auth_user_id + ')', { email: updates.email, email_confirm: true });
}

if (!write) process.exit(0);

// Auth first: it's the call that can refuse (duplicate login email), and
// a row pointing at an email the login doesn't have is the worse half-state.
if (emailChange && client.auth_user_id) {
	const { error } = await supabase.auth.admin.updateUserById(client.auth_user_id, { email: updates.email, email_confirm: true });
	if (error) die(`Auth email change failed, nothing written: ${error.message}`);
}

const { error } = await supabase.from('clients').update(updates).eq('id', client.id);
if (error) {
	die(
		`clients row update failed: ${error.message}` +
			(emailChange && client.auth_user_id ? '\nThe AUTH email WAS changed — the row still has the old email. Fix the row by hand.' : '')
	);
}

const { data: after } = await supabase
	.from('clients')
	.select('id, full_name, email, company, phone, invoice_bill_to, invoice_payee_default, updated_at')
	.eq('id', client.id)
	.single();
show('Client (read back)', after);

if (emailChange && client.auth_user_id) {
	const { data: authUser } = await supabase.auth.admin.getUserById(client.auth_user_id);
	show('Auth user (read back)', { email: authUser?.user?.email, email_confirmed_at: authUser?.user?.email_confirmed_at });
}

for (const issue of preflight({ ...project, client: { ...client, ...after } })) warn(issue);
