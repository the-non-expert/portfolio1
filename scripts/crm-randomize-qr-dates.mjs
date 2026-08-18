/**
 * One-off: spread QR Loyalty Program's entries across random dates between
 * April and June 2026, in the same order they're currently listed (so the
 * work still reads as a sensible progression — wireframing before bug fixes).
 * Run: node --env-file=.env scripts/crm-randomize-qr-dates.mjs
 * Direct DB update via service role — bypasses RLS and does NOT touch
 * Resend, since this is a historical backdate, not a live change.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('Missing PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const { data: project, error: projectError } = await supabase
  .from('projects')
  .select('id')
  .eq('slug', 'qr-loyalty-program-908a0b')
  .maybeSingle();

if (projectError || !project) {
  console.error('Could not find QR Loyalty Program:', projectError?.message ?? 'no matching row');
  process.exit(1);
}

const { data: entries, error: entriesError } = await supabase
  .from('entries')
  .select('id, entry_type, created_at')
  .eq('project_id', project.id)
  .order('created_at', { ascending: true });

if (entriesError || !entries) {
  console.error('Could not load entries:', entriesError?.message);
  process.exit(1);
}

const tasks = entries.filter((e) => e.entry_type !== 'meeting_note'); // leave the billing summary alone
const start = new Date('2026-04-01T00:00:00');
const end = new Date('2026-06-30T00:00:00');
const rangeMs = end.getTime() - start.getTime();

const dates = tasks
  .map(() => new Date(start.getTime() + Math.random() * rangeMs))
  .sort((a, b) => a.getTime() - b.getTime());

for (let i = 0; i < tasks.length; i++) {
  const dateStr = dates[i].toISOString().slice(0, 10);
  const { error } = await supabase.from('entries').update({ entry_date: dateStr }).eq('id', tasks[i].id);
  if (error) {
    console.error(`Failed to update entry ${tasks[i].id}:`, error.message);
    continue;
  }
  console.log(`${tasks[i].id} -> ${dateStr}`);
}

console.log(`Done — ${tasks.length} entries spread across Apr-Jun 2026.`);
