/**
 * Read-only. Find a project by slug, project name, or client name/company/
 * email, and print everything the /crm skill needs before drafting a write:
 * client + project rows, timeline, invoices, unbilled balances, the next
 * invoice number, and pre-flight issues.
 *
 *   node --env-file=$HOME/My-Github/portfolio1/.env \
 *     $HOME/My-Github/portfolio1/scripts/crm/find-project.mjs "<slug or name>" \
 *     [--full-bodies] [--product=<repo or product name>]...
 *
 * --product feeds the "product name sitting in clients.full_name" check —
 * pass the current repo's name. Repeatable.
 */

import {
	parseArgs,
	die,
	searchProjects,
	preflight,
	billableEntries,
	nextInvoiceNumber,
	defaultBillTo,
	defaultPayee,
	supabase,
	inr
} from './_lib.mjs';

const { flags, positional } = parseArgs();
const productNames = [...flags].filter((f) => f.startsWith('product=')).map((f) => f.slice('product='.length));
const query = positional.join(' ').trim();
if (!query) die('Usage: find-project.mjs "<slug | project name | client name/company/email>"');

const matches = await searchProjects(query);
if (matches.length === 0) die(`No project or client matches "${query}". Clients are created by hand in the CRM, never by this script.`);

if (matches.length > 1) {
	console.log(`${matches.length} projects match "${query}" — re-run with the exact slug:\n`);
	for (const p of matches) {
		console.log(`  ${p.slug.padEnd(36)} ${p.name}  ·  ${p.client?.full_name ?? '?'}${p.client?.company ? ` (${p.client.company})` : ''}  ·  ${p.status}${p.archived_at ? ' · ARCHIVED' : ''}`);
	}
	process.exit(0);
}

const project = matches[0];
const { client, ...projectOnly } = project;

console.log('CLIENT');
console.log(JSON.stringify({ ...client, auth_user_id: client?.auth_user_id ? '(portal login linked)' : null }, null, 2));
console.log('\nPROJECT');
console.log(JSON.stringify(projectOnly, null, 2));
console.log(`\nAdmin URL: https://ayushjhunjhunwala.com/crm/admin/projects/${project.slug}`);

const { data: entries } = await supabase
	.from('entries')
	.select('id, entry_type, title, body, entry_date, due_date, status, visible_to_client, hours, amount, is_period, period_end, author_type, archived_at')
	.eq('project_id', project.id)
	.order('entry_date', { ascending: false })
	.order('created_at', { ascending: false });

console.log(`\nTIMELINE (${entries?.length ?? 0} entries, newest first)`);
for (const e of entries ?? []) {
	const money = [e.hours != null ? `${e.hours}h` : null, e.amount != null ? inr(e.amount) : null].filter(Boolean).join(' · ');
	const tags = [
		e.visible_to_client ? 'CLIENT-VISIBLE' : 'internal',
		e.status,
		e.author_type === 'client' ? 'by client' : null,
		e.archived_at ? 'ARCHIVED' : null
	].filter(Boolean).join(', ');
	console.log(`  ${e.entry_date}  ${e.entry_type.padEnd(12)} ${e.title}${money ? `  [${money}]` : ''}  (${tags})  id=${e.id}`);
	if (e.body) {
		const body = flags.has('full-bodies') ? e.body : e.body.split('\n')[0];
		console.log(`      ${body.replace(/\n/g, '\n      ')}`);
	}
}

const { data: invoices } = await supabase
	.from('invoices')
	.select('id, invoice_number, issue_date, due_date, status, total, notes, negotiated_from_id, invoice_items(description, amount, hours, entry_id)')
	.eq('project_id', project.id)
	.order('issue_date', { ascending: true });

console.log(`\nINVOICES (${invoices?.length ?? 0})`);
for (const inv of invoices ?? []) {
	console.log(`  #${inv.invoice_number ?? '—'}  ${inv.issue_date}  ${inv.status.toUpperCase().padEnd(7)} ${inr(inv.total)}  id=${inv.id}`);
	for (const item of inv.invoice_items ?? []) {
		console.log(`      · ${item.description}  ${inr(item.amount)}${item.entry_id ? `  (entry ${item.entry_id})` : '  (custom line)'}`);
	}
	if (inv.notes) console.log(`      notes: ${inv.notes.replace(/\n/g, ' / ')}`);
}

const billable = await billableEntries(project);
console.log('\nBILLABLE ACTION ITEMS');
if (billable.length === 0) console.log('  (none — the invoice builder only lists action_item entries)');
for (const b of billable) {
	const flag = b.fullValue === 0 ? '  ← no value: can\'t be invoiced (flat needs amount, hourly needs hours)' : '';
	console.log(`  ${b.title}: full ${inr(b.fullValue)} · billed ${inr(b.alreadyBilled)} · remaining ${inr(b.remaining)}  id=${b.id}${flag}`);
}
const totalRemaining = billable.reduce((s, b) => s + Math.max(0, b.remaining), 0);
console.log(`  Total unbilled: ${inr(totalRemaining)}`);

console.log('\nINVOICE DEFAULTS');
console.log(`  next number: #${await nextInvoiceNumber()}`);
console.log(`  bill_to:     ${defaultBillTo(client).replace(/\n/g, ' / ') || '(empty)'}`);
console.log(`  payee:       ${defaultPayee(client).replace(/\n/g, ' / ')}`);

const issues = preflight(project, { productNames });
console.log('\nPRE-FLIGHT');
if (issues.length === 0) console.log('  ✓ no mechanical issues');
for (const issue of issues) console.log(`  ⚠ ${issue}`);
