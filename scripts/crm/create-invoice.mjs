/**
 * Create a PENDING invoice on an existing project. Mirrors the
 * createInvoice action in
 * src/routes/crm/admin/projects/[slug]/invoices/new/+page.server.ts:
 * number = highest existing + 1 (from 10), payee/bill-to defaults, hours
 * back-derived on hourly lines, and bill_to/payee written back to the
 * client afterwards. Never marks anything paid or void.
 *
 *   node --env-file=$HOME/My-Github/portfolio1/.env \
 *     $HOME/My-Github/portfolio1/scripts/crm/create-invoice.mjs --json input.json --dry-run|--write
 *
 * input.json:
 *   { "slug": "b2b-app-2cfded",
 *     "lines": [ { "entry_id": "<action_item id>",
 *                  "percent": 20,              // of the entry's FULL value — or "amount": 20000
 *                  "description": "Advance (20%) — ..." } ],   // default = entry title (it prints!)
 *     "custom_lines": [ { "description": "...", "amount": 5000, "date": "YYYY-MM-DD", "date_to": "YYYY-MM-DD" } ],
 *     "issue_date": "YYYY-MM-DD",              // default today
 *     "due_date": "YYYY-MM-DD",                // default issue_date + 7
 *     "bill_to": "...", "payee": "...",        // default: client's saved values, then env
 *     "notes": "...",                          // PRINTED on the invoice
 *     "invoice_number": 16 | "no_invoice_number": true,
 *     "show_rate": true, "show_dates": true, "misc_section_label": null }
 *
 * A line may not bill more than the entry's remaining unbilled balance
 * unless --allow-overbill.
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
	billableEntries,
	nextInvoiceNumber,
	defaultBillTo,
	defaultPayee,
	isISODate,
	todayISO,
	round2,
	inr
} from './_lib.mjs';

const { flags, input } = parseArgs();
const write = writeMode(flags);
if (!input?.slug) die('Input needs "slug".');

const project = await getProjectBySlug(input.slug);
const client = project.client;

const issueDate = input.issue_date || todayISO();
const dueDate =
	input.due_date === null
		? null
		: input.due_date || new Date(Date.parse(issueDate) + 7 * 86400000).toISOString().slice(0, 10);
for (const [name, value] of [['issue_date', issueDate], ['due_date', dueDate]]) {
	if (value && !isISODate(value)) die(`${name} must be YYYY-MM-DD.`);
}

const billTo = (input.bill_to ?? defaultBillTo(client)).trim();
const payeeOverride = (input.payee ?? defaultPayee(client)).trim();
if (!billTo) die('No "bill to" — pass bill_to or fill clients.invoice_bill_to first (update-client.mjs).');
if (!payeeOverride) die('No "payable to" — pass payee.');
const notes = input.notes?.trim() || null;

let invoiceNumber = null;
if (!input.no_invoice_number) {
	if (input.invoice_number != null) {
		invoiceNumber = Number(input.invoice_number);
		if (!Number.isInteger(invoiceNumber) || invoiceNumber <= 0) die('Invoice number must be a positive whole number.');
		const { data: taken } = await supabase.from('invoices').select('id').eq('invoice_number', invoiceNumber);
		if (taken?.length) die(`Invoice #${invoiceNumber} already exists — pick a different number.`);
	} else {
		invoiceNumber = await nextInvoiceNumber();
	}
}

const billable = await billableEntries(project);
const isHourly = project.billing_type === 'hourly' && Number(project.rate) > 0;
const items = [];

for (const line of input.lines ?? []) {
	const entry = billable.find((b) => b.id === line.entry_id);
	if (!entry) die(`Entry ${line.entry_id} is not an action_item on ${project.slug} — only action items can be invoiced.`);
	if (entry.archived_at) warn(`"${entry.title}" is archived.`);

	let amount;
	if (line.percent != null) {
		if (line.amount != null) die('Give a line "percent" or "amount", not both.');
		amount = round2((entry.fullValue * Number(line.percent)) / 100);
	} else {
		amount = Number(line.amount ?? entry.remaining);
	}
	if (Number.isNaN(amount) || amount <= 0) die(`Line for "${entry.title}" needs a positive amount (entry value is ${inr(entry.fullValue)}).`);

	const remainingHere = round2(entry.remaining - items.filter((i) => i.entry_id === entry.id).reduce((s, i) => s + i.amount, 0));
	if (amount > remainingHere + 0.005 && !flags.has('allow-overbill')) {
		die(`"${entry.title}": ${inr(amount)} is more than the ${inr(remainingHere)} still unbilled. Pass --allow-overbill if intended.`);
	}

	const description = line.description?.trim() || entry.title;
	if (!line.description) warn(`Line uses the entry title as its printed description: "${entry.title}". Pass a clean "description" if that title has internal notes in it.`);

	items.push({
		entry_id: entry.id,
		description,
		item_date: entry.entry_date,
		hours: isHourly ? round2(amount / Number(project.rate)) : (entry.hours ?? null),
		rate: isHourly ? Number(project.rate) : null,
		amount,
		is_period: entry.is_period ?? false,
		period_end: entry.period_end ?? null
	});
}

for (const line of input.custom_lines ?? []) {
	const description = line.description?.trim();
	const amount = Number(line.amount);
	if (!description || Number.isNaN(amount) || amount <= 0) die('Every custom line needs a description and a positive amount.');
	for (const d of [line.date, line.date_to]) if (d && !isISODate(d)) die('Custom line dates must be YYYY-MM-DD.');
	items.push({
		entry_id: null,
		description,
		item_date: line.date || null,
		hours: null,
		rate: null,
		amount,
		is_period: Boolean(line.date_to),
		period_end: line.date_to || null
	});
}

if (items.length === 0) die('Select at least one item to invoice.');

const subtotal = round2(items.reduce((sum, item) => sum + item.amount, 0));
const invoice = {
	project_id: project.id,
	invoice_number: invoiceNumber,
	issue_date: issueDate,
	due_date: dueDate,
	bill_to: billTo,
	payee_override: payeeOverride,
	subtotal,
	total: subtotal,
	notes,
	show_rate: input.show_rate ?? true,
	show_dates: input.show_dates ?? true,
	misc_section_label: input.misc_section_label?.trim() || null
};

const clientUpdates = {};
if (client?.id) {
	if (billTo !== client.invoice_bill_to) clientUpdates.invoice_bill_to = billTo;
	if (payeeOverride !== client.invoice_payee_default) clientUpdates.invoice_payee_default = payeeOverride;
}

console.log(`Project: ${project.name} (${project.slug}) · ${project.billing_type}${project.rate != null ? ` @ ${project.rate}` : ''}\n`);
show('invoices INSERT (status defaults to pending)', invoice);
show('invoice_items INSERT', items);
if (Object.keys(clientUpdates).length) show(`clients UPDATE where id = ${client.id} (app remembers bill-to/payee)`, clientUpdates);

console.log('Unbilled after this invoice:');
for (const entry of billable) {
	const thisInvoice = items.filter((i) => i.entry_id === entry.id).reduce((s, i) => s + i.amount, 0);
	if (thisInvoice > 0 || entry.remaining > 0.005) {
		console.log(`  ${entry.title}: ${inr(entry.remaining)} → ${inr(round2(entry.remaining - thisInvoice))}`);
	}
}
console.log('');
for (const issue of preflight(project)) warn(issue);

if (!write) process.exit(0);

const { data: created, error: invoiceError } = await supabase.from('invoices').insert(invoice).select('id').single();
if (invoiceError) {
	if (invoiceError.code === '23505') die(`Invoice #${invoiceNumber} already exists — pick a different number.`);
	die(`Could not create the invoice: ${invoiceError.message}`);
}

const { error: itemsError } = await supabase.from('invoice_items').insert(items.map((item) => ({ ...item, invoice_id: created.id })));
if (itemsError) {
	// Roll back only the row this run created seconds ago, so a failed run
	// never leaves an empty invoice holding the next number.
	await supabase.from('invoices').delete().eq('id', created.id);
	die(`Line items failed (${itemsError.message}); the just-created empty invoice was rolled back.`);
}

if (Object.keys(clientUpdates).length) {
	const { error } = await supabase.from('clients').update(clientUpdates).eq('id', client.id);
	if (error) warn(`Invoice created, but saving bill-to/payee back to the client failed: ${error.message}`);
}

const { data: after } = await supabase.from('invoices').select('*, invoice_items(*)').eq('id', created.id).single();
show('Invoice (read back)', after);
const afterBillable = await billableEntries(project);
console.log('Unbilled now:');
for (const entry of afterBillable) console.log(`  ${entry.title}: ${inr(entry.remaining)}`);
console.log(`\nView/print: https://ayushjhunjhunwala.com/crm/admin/projects/${project.slug}/invoices/${created.id}`);
