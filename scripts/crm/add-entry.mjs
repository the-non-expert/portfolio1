/**
 * Add one timeline entry to an existing project. Mirrors the addEntry
 * action in src/routes/crm/admin/projects/[slug]/+page.server.ts — minus
 * the Resend email, which the service-role path never sends.
 *
 *   node --env-file=$HOME/My-Github/portfolio1/.env \
 *     $HOME/My-Github/portfolio1/scripts/crm/add-entry.mjs --json input.json --dry-run|--write
 *
 * input.json:
 *   { "slug": "b2b-app-2cfded",
 *     "entry_type": "meeting_note|decision|deadline|action_item",
 *     "title": "...",
 *     "body": "One-line summary.\n\nSECTION\n- detail",   // plain text, first line = timeline preview
 *     "entry_date": "YYYY-MM-DD",          // default today
 *     "due_date": "YYYY-MM-DD",            // optional
 *     "status": "open|done",               // optional
 *     "hours": 3, "amount": 100000,        // optional; flat action items need amount to be invoiceable
 *     "is_period": false, "period_end": "YYYY-MM-DD",
 *     "visible_to_client": false }         // default false; true also needs --client-visible
 *
 * Refuses an exact duplicate (same project + type + title + date) unless
 * --allow-duplicate, so a re-run after a flaky network doesn't double-log.
 */

import {
	parseArgs,
	writeMode,
	die,
	warn,
	show,
	supabase,
	getProjectBySlug,
	preflight,
	bodyWarnings,
	isISODate,
	todayISO,
	ENTRY_TYPES
} from './_lib.mjs';

const { flags, input } = parseArgs();
const write = writeMode(flags);
if (!input?.slug) die('Input needs "slug".');

const project = await getProjectBySlug(input.slug);

const entryType = input.entry_type;
const title = input.title?.trim();
const body = input.body?.trim() || null;
const entryDate = input.entry_date || todayISO();
const dueDate = input.due_date || null;
const status = input.status || null;
const visibleToClient = input.visible_to_client === true;
const hours = input.hours ?? null;
const amount = input.amount ?? null;
const isPeriod = input.is_period === true;
const periodEnd = input.period_end || null;

// Same checks as addEntry, plus the ones its form inputs enforce implicitly.
if (!title || !ENTRY_TYPES.includes(entryType)) die(`Needs a title and entry_type in: ${ENTRY_TYPES.join(', ')}.`);
if (hours !== null && (typeof hours !== 'number' || Number.isNaN(hours) || hours < 0)) die('Hours must be a positive number.');
if (amount !== null && (typeof amount !== 'number' || Number.isNaN(amount) || amount < 0)) die('Amount must be a positive number.');
if (status !== null && !['open', 'done'].includes(status)) die('status must be "open", "done", or omitted.');
for (const [name, value] of [['entry_date', entryDate], ['due_date', dueDate], ['period_end', periodEnd]]) {
	if (value && !isISODate(value)) die(`${name} must be YYYY-MM-DD.`);
}
if (visibleToClient && !flags.has('client-visible')) {
	die('visible_to_client: true puts this in the client\'s portal. Re-run with --client-visible once Ayush has confirmed.');
}

if (entryType === 'action_item' && amount === null && hours === null) {
	warn(`Action item has neither hours nor amount — it will show ₹0 in the invoice builder (project is ${project.billing_type}).`);
} else if (entryType === 'action_item' && project.billing_type === 'flat' && amount === null) {
	warn('Flat project: an action item needs "amount" to be invoiceable — hours alone count for nothing.');
} else if (entryType === 'action_item' && project.billing_type === 'hourly' && hours === null) {
	warn('Hourly project: invoice value is hours × rate — "amount" is ignored without hours.');
}
if (entryType !== 'action_item' && (hours !== null || amount !== null)) {
	warn('Hours/amount only feed invoices on action_item entries — on this type they are display-only.');
}
if (visibleToClient) warn('Client-visible, but no notification email goes out from this path (the app\'s addEntry would send one).');
for (const w of bodyWarnings(body)) warn(w);

const row = {
	project_id: project.id,
	entry_type: entryType,
	title,
	body,
	entry_date: entryDate,
	due_date: dueDate,
	status,
	visible_to_client: visibleToClient,
	hours,
	amount,
	is_period: isPeriod,
	period_end: isPeriod ? periodEnd : null,
	author_type: 'admin'
};

const { data: dupes } = await supabase
	.from('entries')
	.select('id')
	.eq('project_id', project.id)
	.eq('entry_type', entryType)
	.eq('title', title)
	.eq('entry_date', entryDate);
if (dupes?.length && !flags.has('allow-duplicate')) {
	die(`An identical entry already exists (id ${dupes[0].id}). Nothing written. Pass --allow-duplicate if that's intended.`);
}

console.log(`Project: ${project.name} (${project.slug}) · ${project.billing_type}${project.rate != null ? ` @ ${project.rate}` : ''}\n`);
show('entries INSERT', row);
if (body) {
	console.log('Body as it will render (plain text):\n' + '─'.repeat(60) + '\n' + body + '\n' + '─'.repeat(60) + '\n');
}

for (const issue of preflight(project)) warn(issue);
if (!write) process.exit(0);

const { data: inserted, error } = await supabase.from('entries').insert(row).select('id').single();
if (error) die(`Insert failed: ${error.message}`);

const { data: after } = await supabase.from('entries').select('*').eq('id', inserted.id).single();
show('Entry (read back)', after);
console.log(`View: https://ayushjhunjhunwala.com/crm/admin/projects/${project.slug}`);
