/**
 * Shared plumbing for scripts/crm/*.mjs — the service-role write path the
 * /crm skill (~/.claude/skills/crm) drives from any project repo:
 *
 *   node --env-file=$HOME/My-Github/portfolio1/.env \
 *     $HOME/My-Github/portfolio1/scripts/crm/<script>.mjs <args>
 *
 * The service-role key bypasses RLS AND every +page.server.ts action, so
 * none of the app's validation runs and no Resend email goes out. Each
 * script copies its validation from the matching action by hand — when an
 * action or the schema changes, change the script in the same commit.
 *
 * Every write script takes exactly one of:
 *   --dry-run   print the exact rows that would be written, write nothing
 *   --write     write, then read the rows back and print them
 * Neither flag is an error, so a forgotten flag never writes by accident.
 */

import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

export const ENTRY_TYPES = ['meeting_note', 'decision', 'deadline', 'action_item'];
export const PROJECT_STATUSES = ['active', 'on-hold', 'completed'];

const url = process.env.PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
	die(
		'Missing PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n' +
			'Run with: node --env-file=$HOME/My-Github/portfolio1/.env <script>'
	);
}

export const supabase = createClient(url, serviceKey, {
	auth: { autoRefreshToken: false, persistSession: false }
});

export function die(message) {
	console.error(`✗ ${message}`);
	process.exit(1);
}

export function warn(message) {
	console.log(`⚠ ${message}`);
}

/**
 * Flags: --dry-run, --write, any --some-flag (boolean), --json <file>.
 * Everything else is positional. Input JSON comes from --json <file> or,
 * for a one-liner, the first positional that starts with "{".
 */
export function parseArgs(argv = process.argv.slice(2)) {
	const flags = new Set();
	const positional = [];
	let jsonPath = null;
	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		if (arg === '--json') jsonPath = argv[++i];
		else if (arg.startsWith('--')) flags.add(arg.slice(2));
		else positional.push(arg);
	}

	let input = null;
	if (jsonPath) {
		try {
			input = JSON.parse(readFileSync(jsonPath, 'utf8'));
		} catch (e) {
			die(`Could not read JSON from ${jsonPath}: ${e.message}`);
		}
	} else if (positional[0]?.trim().startsWith('{')) {
		try {
			input = JSON.parse(positional.shift());
		} catch (e) {
			die(`Inline JSON did not parse: ${e.message}`);
		}
	}

	return { flags, positional, input };
}

/** Returns true for --write, false for --dry-run; dies on neither/both. */
export function writeMode(flags) {
	const dry = flags.has('dry-run');
	const write = flags.has('write');
	if (dry === write) die('Pass exactly one of --dry-run or --write.');
	console.log(dry ? '── DRY RUN — nothing will be written ──\n' : '── WRITE ──\n');
	return write;
}

export function show(label, value) {
	console.log(`${label}:`);
	console.log(JSON.stringify(value, null, 2));
	console.log('');
}

export function round2(n) {
	return Math.round(n * 100) / 100;
}

export function inr(n) {
	return `₹${Number(n).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function todayISO() {
	return new Date().toISOString().slice(0, 10);
}

export function isISODate(value) {
	return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}

/** Mirror of src/lib/utils/crmInvoice.ts → entryFullValue. */
export function entryFullValue(entry, billingType, rate) {
	if (billingType === 'hourly') return (entry.hours ?? 0) * (rate ?? 0);
	return entry.amount ?? 0;
}

const PROJECT_COLUMNS =
	'id, name, slug, status, summary, billing_type, rate, archived_at, created_at, ' +
	'clients(id, full_name, email, company, phone, invoice_bill_to, invoice_payee_default, auth_user_id, archived_at)';

function flattenProject(row) {
	const client = Array.isArray(row.clients) ? row.clients[0] : row.clients;
	const { clients: _, ...project } = row;
	return { ...project, client };
}

/** Exact slug lookup — every write script targets a project by slug. */
export async function getProjectBySlug(slug) {
	if (!slug) die('No project slug given.');
	const { data, error } = await supabase.from('projects').select(PROJECT_COLUMNS).eq('slug', slug).maybeSingle();
	if (error) die(`Project lookup failed: ${error.message}`);
	if (!data) die(`No project with slug "${slug}". Run find-project.mjs to search.`);
	return flattenProject(data);
}

/** Fuzzy lookup for find-project: slug, project name, or client name/company/email. */
export async function searchProjects(query) {
	const exact = await supabase.from('projects').select(PROJECT_COLUMNS).eq('slug', query).maybeSingle();
	if (exact.data) return [flattenProject(exact.data)];

	// PostgREST's or() filter uses commas and parens as syntax — strip them
	// out of free text so a client name like "Foo (Pvt), Ltd" can't break it.
	const safe = query.replace(/[,()*%]/g, ' ').trim();
	const like = `%${safe}%`;

	const { data: clients } = await supabase
		.from('clients')
		.select('id')
		.or(`full_name.ilike.${like},company.ilike.${like},email.ilike.${like},invoice_bill_to.ilike.${like}`);
	const clientIds = (clients ?? []).map((c) => c.id);

	const filters = [`name.ilike.${like}`, `slug.ilike.${like}`];
	if (clientIds.length) filters.push(`client_id.in.(${clientIds.join(',')})`);

	const { data, error } = await supabase
		.from('projects')
		.select(PROJECT_COLUMNS)
		.or(filters.join(','))
		.order('created_at', { ascending: false });
	if (error) die(`Project search failed: ${error.message}`);
	return (data ?? []).map(flattenProject);
}

/**
 * Mechanical pre-flight checks. Judgment calls (does the billing type
 * match the agreed deal?) belong to the skill; this only reports facts
 * the data itself can prove are off. Reports — never fixes.
 */
export function preflight(project, { productNames = [] } = {}) {
	const issues = [];
	const c = project.client ?? {};
	const rate = project.rate == null ? null : Number(project.rate);

	if (project.billing_type === 'flat' && rate != null) {
		issues.push(`Flat project has an hourly rate set (${inr(rate)}) — flat projects should have rate null.`);
	}
	if (project.billing_type === 'hourly' && !(rate > 0)) {
		issues.push('Hourly project has no rate — every hourly line would invoice at ₹0.');
	}
	if (!c.invoice_bill_to?.trim()) {
		issues.push('clients.invoice_bill_to is empty — invoices will fall back to company/full name with no address.');
	}
	if (c.company && c.invoice_bill_to && !c.invoice_bill_to.toLowerCase().includes(c.company.toLowerCase())) {
		issues.push(
			`Company "${c.company}" does not appear in invoice_bill_to — check the spelling against the billing address.`
		);
	}
	if (c.full_name && looksLikeProductName(c.full_name, [project.name, ...productNames])) {
		issues.push(
			`clients.full_name is "${c.full_name}" — looks like a product/project name, not a person or business.`
		);
	} else if (c.full_name && c.company && !sharesWord(c.full_name, c.company)) {
		issues.push(
			`clients.full_name "${c.full_name}" shares no word with company "${c.company}" — confirm it's the contact person, not a product name.`
		);
	}
	if (project.archived_at) issues.push('Project is archived.');
	if (c.archived_at) issues.push('Client is archived.');
	return issues;
}

function words(text) {
	return text.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2);
}

function sharesWord(a, b) {
	const bWords = new Set(words(b));
	return words(a).some((w) => bWords.has(w));
}

// productNames: the project name plus any hints the caller passes (the
// /crm skill passes the current repo's name, e.g. "digital-retail-saathi").
function looksLikeProductName(fullName, productNames) {
	const n = words(fullName).join(' ');
	for (const name of productNames.filter(Boolean)) {
		const p = words(name).join(' ');
		if (p && (n === p || n.includes(p) || p.includes(n))) return true;
	}
	return /\b(app|platform|portal|website|site|dashboard|system|crm|erp|b2b|b2c|saas|mvp)\b/.test(n);
}

/** Unbilled balance per action_item, mirroring the new-invoice load(). */
export async function billableEntries(project) {
	const { data: entries, error } = await supabase
		.from('entries')
		.select('id, title, entry_date, hours, amount, status, is_period, period_end, visible_to_client, archived_at')
		.eq('project_id', project.id)
		.eq('entry_type', 'action_item')
		.order('entry_date', { ascending: true });
	if (error) die(`Entry lookup failed: ${error.message}`);

	const ids = (entries ?? []).map((e) => e.id);
	const { data: billedRows } = ids.length
		? await supabase
				.from('invoice_items')
				.select('entry_id, amount, invoices!inner(status)')
				.in('entry_id', ids)
				.neq('invoices.status', 'void')
		: { data: [] };

	const billed = new Map();
	for (const row of billedRows ?? []) {
		if (!row.entry_id) continue;
		billed.set(row.entry_id, (billed.get(row.entry_id) ?? 0) + Number(row.amount));
	}

	const rate = project.rate == null ? null : Number(project.rate);
	return (entries ?? []).map((entry) => {
		const fullValue = entryFullValue(entry, project.billing_type, rate);
		const alreadyBilled = billed.get(entry.id) ?? 0;
		return { ...entry, fullValue, alreadyBilled, remaining: round2(fullValue - alreadyBilled) };
	});
}

/** Mirror of the new-invoice default: highest existing number + 1, from 10. */
export async function nextInvoiceNumber() {
	const { data } = await supabase
		.from('invoices')
		.select('invoice_number')
		.not('invoice_number', 'is', null)
		.order('invoice_number', { ascending: false })
		.limit(1)
		.maybeSingle();
	return (data?.invoice_number ?? 10) + 1;
}

export function defaultPayee(client) {
	const envDefault = `${process.env.INVOICE_PAYEE_NAME ?? ''}\n${process.env.INVOICE_PAYEE_ADDRESS ?? ''}`;
	return client?.invoice_payee_default || envDefault;
}

export function defaultBillTo(client) {
	return client?.invoice_bill_to || client?.company || client?.full_name || '';
}

/** Plain-text body rules: first line is the timeline preview; no markdown renders. */
export function bodyWarnings(body) {
	if (!body) return [];
	const out = [];
	const first = body.split('\n')[0];
	if (!first.trim()) out.push('Body starts with a blank line — the timeline preview will be empty.');
	if (first.length > 140) out.push(`First line is ${first.length} chars — it's the timeline preview; keep it one short summary line.`);
	if (/^\s*(#{1,6}\s|\*\*|[-*]\s\[|```)/m.test(body) || /\*\*[^*]+\*\*/.test(body)) {
		out.push('Body looks like markdown — entries render as plain text (whitespace-pre-wrap), so markup shows literally.');
	}
	return out;
}
