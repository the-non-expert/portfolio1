/**
 * Update an existing project's name / summary / status / billing. The slug
 * never changes (it's the URL the client already has bookmarked) — a
 * rename only touches `name`.
 *
 *   node --env-file=$HOME/My-Github/portfolio1/.env \
 *     $HOME/My-Github/portfolio1/scripts/crm/update-project.mjs --json input.json --dry-run|--write
 *
 * input.json:
 *   { "slug": "b2b-app-2cfded",
 *     "set": { "name": "...", "summary": "...", "status": "active|on-hold|completed",
 *              "billing_type": "flat|hourly", "rate": 550 | null } }
 *
 * Validation mirrors the new-client form (billing_type/rate) and the
 * schema check constraint (status). A flat project should have rate null —
 * the fee lives on an action_item's amount instead.
 */

import { parseArgs, writeMode, die, warn, show, supabase, getProjectBySlug, preflight, PROJECT_STATUSES } from './_lib.mjs';

const ALLOWED = ['name', 'summary', 'status', 'billing_type', 'rate'];

const { flags, input } = parseArgs();
const write = writeMode(flags);
if (!input?.slug || !input?.set) die('Input needs { "slug": "...", "set": { ... } }.');

const project = await getProjectBySlug(input.slug);

const updates = {};
for (const [key, raw] of Object.entries(input.set)) {
	if (!ALLOWED.includes(key)) die(`"${key}" can't be set by this script. Allowed: ${ALLOWED.join(', ')}.`);
	let value = typeof raw === 'string' ? raw.trim() || null : raw;
	if (key === 'name' && !value) die('Project name can\'t be empty.');
	if (key === 'status' && !PROJECT_STATUSES.includes(value)) die(`status must be one of ${PROJECT_STATUSES.join(', ')}.`);
	if (key === 'billing_type' && !['flat', 'hourly'].includes(value)) die('billing_type must be "flat" or "hourly".');
	if (key === 'rate' && value !== null) {
		value = Number(value);
		if (Number.isNaN(value) || value < 0) die('Rate must be a positive number (or null).');
	}
	const current = key === 'rate' && project.rate != null ? Number(project.rate) : (project[key] ?? null);
	if (current !== value) updates[key] = value;
}

if (Object.keys(updates).length === 0) {
	console.log('Nothing to change — every field already matches.');
	process.exit(0);
}

const merged = { ...project, ...updates };
if (merged.billing_type === 'flat' && merged.rate != null) {
	warn(`Result would be a FLAT project with rate ${merged.rate} — set "rate": null alongside a switch to flat.`);
}
if (merged.billing_type === 'hourly' && !(Number(merged.rate) > 0)) {
	warn('Result would be an HOURLY project with no rate — every hourly line would invoice at ₹0.');
}
if (updates.billing_type && updates.billing_type !== project.billing_type) {
	warn(
		`Switching ${project.billing_type} → ${updates.billing_type} changes the full value of every existing action item ` +
			'(hourly = hours × rate, flat = entry amount). Run find-project afterwards and check the unbilled balances.'
	);
}

show('Project (before)', Object.fromEntries(Object.keys(updates).map((k) => [k, project[k] ?? null])));
show(`projects UPDATE where slug = ${project.slug}`, updates);

if (!write) process.exit(0);

const { error } = await supabase.from('projects').update(updates).eq('id', project.id);
if (error) die(`Project update failed: ${error.message}`);

const after = await getProjectBySlug(project.slug);
const { client: _, ...afterProject } = after;
show('Project (read back)', afterProject);
for (const issue of preflight(after)) warn(issue);
