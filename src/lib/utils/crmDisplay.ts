export const ENTRY_TYPE_LABELS: Record<string, string> = {
	meeting_note: 'Meeting note',
	decision: 'Decision',
	deadline: 'Deadline',
	action_item: 'Action item'
};

export const ENTRY_TYPES = Object.keys(ENTRY_TYPE_LABELS);

// Supabase's embedded-relation typing can't tell a to-one join from a to-many
// one without generated DB types, so it comes back as `T | T[]` either way.
export function one<T>(value: T | T[] | null | undefined): T | null {
	if (!value) return null;
	return Array.isArray(value) ? (value[0] ?? null) : value;
}

// `entry_date` is a Postgres `date` (no time component). Parsing with an
// explicit local midnight avoids the UTC-parse day-shift `new Date(dateStr)`
// is prone to in negative UTC offsets.
function toLocalDate(dateStr: string): Date {
	return new Date(dateStr + 'T00:00:00');
}

export function formatDate(dateStr: string): string {
	return toLocalDate(dateStr).toLocaleDateString('en-IN', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	});
}

export function formatDayLabel(dateStr: string): string {
	const date = toLocalDate(dateStr);
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	if (date.getTime() === today.getTime()) return 'Today';
	if (date.getTime() === yesterday.getTime()) return 'Yesterday';

	const sameYear = date.getFullYear() === today.getFullYear();
	return date.toLocaleDateString('en-IN', {
		day: 'numeric',
		month: 'short',
		year: sameYear ? undefined : 'numeric'
	});
}

// Entries arrive newest-first already; grouping just has to notice when the
// date changes, not re-sort anything.
export function groupByDay<T extends { entry_date: string }>(
	entries: T[]
): Array<{ date: string; entries: T[] }> {
	const groups: Array<{ date: string; entries: T[] }> = [];
	for (const entry of entries) {
		const last = groups[groups.length - 1];
		if (last && last.date === entry.entry_date) {
			last.entries.push(entry);
		} else {
			groups.push({ date: entry.entry_date, entries: [entry] });
		}
	}
	return groups;
}

type NodeEntry = { entry_type: string; status: string | null; due_date: string | null };

function isOverdue(dueDate: string | null): boolean {
	if (!dueDate) return false;
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return toLocalDate(dueDate).getTime() < today.getTime();
}

// The timeline's type/state carrier: a shape on the spine instead of a text
// badge, so 21 same-type rows don't repeat the same label 21 times.
export function nodeClassFor(entry: NodeEntry): string {
	if (entry.entry_type === 'meeting_note') {
		return 'w-2 h-2 rounded-full bg-bg border border-muted';
	}
	if (entry.entry_type === 'decision') {
		return 'w-2 h-2 rotate-45 bg-ink';
	}
	if ((entry.entry_type === 'action_item' || entry.entry_type === 'deadline') && entry.status !== 'done') {
		return isOverdue(entry.due_date)
			? 'w-2 h-2 rounded-full bg-accent'
			: 'w-2 h-2 rounded-full bg-bg border-2 border-accent';
	}
	return 'w-1.5 h-1.5 rounded-full bg-muted';
}

// A meeting note can be logged by either party, but only its author may
// edit it — the other side responds via comments instead of rewriting it.
// Older rows have no author_type; they default to 'admin' at the DB level,
// so treat a missing value the same way here.
export function canEditEntry(
	entry: { author_type?: string | null },
	viewerType: 'admin' | 'client'
): boolean {
	return (entry.author_type ?? 'admin') === viewerType;
}

export function loggedByLabel(
	entry: { author_type?: string | null },
	viewerType: 'admin' | 'client'
): string | null {
	const authorType = entry.author_type ?? 'admin';
	if (authorType !== 'client' && authorType !== 'admin') return null;
	if (authorType === viewerType) return 'Logged by you';
	return authorType === 'admin' ? 'Logged by Ayush' : 'Logged by client';
}

export function formatCurrency(amount: number): string {
	return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function dueChipFor(entry: NodeEntry): { text: string; overdue: boolean } | null {
	if (!entry.due_date || entry.status === 'done') return null;
	const overdue = isOverdue(entry.due_date);
	return { text: `${overdue ? 'Overdue' : 'Due'} ${formatDate(entry.due_date)}`, overdue };
}

// Splits `text` into segments so a template can wrap matches in <mark> without
// resorting to {@html} on user-authored content.
export function highlightSegments(text: string, query: string): Array<{ text: string; match: boolean }> {
	const q = query.trim();
	if (!q) return [{ text, match: false }];

	const lower = text.toLowerCase();
	const qLower = q.toLowerCase();
	const segments: Array<{ text: string; match: boolean }> = [];
	let i = 0;
	while (i < text.length) {
		const idx = lower.indexOf(qLower, i);
		if (idx === -1) {
			segments.push({ text: text.slice(i), match: false });
			break;
		}
		if (idx > i) segments.push({ text: text.slice(i, idx), match: false });
		segments.push({ text: text.slice(idx, idx + q.length), match: true });
		i = idx + q.length;
	}
	return segments;
}
