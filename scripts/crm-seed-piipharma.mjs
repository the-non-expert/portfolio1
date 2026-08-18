/**
 * One-off: backfill two Pii Pharma projects from the "Pii Pharma Work" sheet.
 * Run: node --env-file=.env scripts/crm-seed-piipharma.mjs
 * Inserts directly via the service-role key (bypasses RLS AND the addEntry
 * action's Resend notification — this is a historical backfill, not a live
 * update, so the client should not get 28 emails for it).
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

function slugify(name) {
  const base = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const suffix = Array.from({ length: 6 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  return `${base}-${suffix}`;
}

const { data: client, error: clientError } = await supabase
  .from('clients')
  .select('id, full_name')
  .eq('email', 'care@piipharma.com')
  .maybeSingle();

if (clientError || !client) {
  console.error('Could not find Pii Pharma client:', clientError?.message ?? 'no matching row');
  process.exit(1);
}

const projects = [
  {
    name: 'QR Loyalty Program',
    summary: 'QR-based coupon and loyalty system for retailers, with an admin portal.',
    status: 'active',
    billing: {
      title: 'Billing summary',
      body:
        'Hourly rate: ₹495/hr\nTotal cost: ₹22,000\nAdvance payment: ₹5,000\nPending: ₹17,000\n10% off applied on first work.'
    },
    tasks: [
      ['Wireframing of retailer side and admin portal', 2, 990],
      ['Designs coded', 5, 2475],
      ['Database connections and backend made', 4, 1980],
      ['Research and Report Generation', 2, 990],
      ['Testing', 3, 1485],
      ['Demo', 1, 495],
      ['Database updates Retailer main Node', 1, 495],
      ['OTP system redesigned', 2, 990],
      ['Added Loading screens', 1, 495],
      ['Retailer Screen Design Evolution', 2, 990],
      ['Admin Portal Product Changes', 2, 990],
      ['Auto Generate QR logic', 5, 2475],
      ['Migrate Supabase', 2, 990],
      ['Combo Products', 2, 990],
      ['AI Money', null, 2200],
      ['QR Coupon Redesign', 3, 1485],
      ['QR Direct Camera Scan Feature', 2, 990],
      ['Coupon Design System', 2, 990],
      ['OTP integration', 2, 990],
      ['Coupon Redesign and Bug Fixes', 3, 1485],
      ['MSG91 debug DLT Integration', 2, 990]
    ]
  },
  {
    name: 'Gift Tier & Lucky Draw',
    summary: 'Gift tier system and lucky draw feature. Still in progress.',
    status: 'active',
    billing: {
      title: 'Billing summary',
      body: 'Hourly rate: ₹550/hr\nTotal cost so far: ₹14,300'
    },
    tasks: [
      ['Frontend Design draft and Database logic Gift Tier System', 5, 2750],
      ['Multiple Versions of iterations across meetings for gift tiers', 3, 1650],
      ['Long term lucky draw initial design and logic building', 5, 2750],
      ['Sidebar Redesign with internal logic changes', 2, 1100],
      ['Redesign and tuning of flow across Long Term LD and Gifts', 5, 2750],
      ['Short Term Lucky Draw complete design', 3, 1650],
      ['Lucky Draw Page multiple redesigns', 3, 1650]
    ]
  }
];

for (const project of projects) {
  const slug = slugify(project.name);
  const { data: projectRow, error: projectError } = await supabase
    .from('projects')
    .insert({ client_id: client.id, name: project.name, slug, status: project.status, summary: project.summary })
    .select('id')
    .single();

  if (projectError || !projectRow) {
    console.error(`Failed to create project "${project.name}":`, projectError?.message);
    continue;
  }

  const taskEntries = project.tasks.map(([title, hours, cost]) => ({
    project_id: projectRow.id,
    entry_type: 'action_item',
    title,
    body: hours ? `${hours} hour${hours === 1 ? '' : 's'} logged · ₹${cost.toLocaleString('en-IN')}.00` : `₹${cost.toLocaleString('en-IN')}.00`,
    status: 'done',
    visible_to_client: true
  }));

  const billingEntry = {
    project_id: projectRow.id,
    entry_type: 'meeting_note',
    title: project.billing.title,
    body: project.billing.body,
    visible_to_client: false
  };

  const { error: entriesError } = await supabase.from('entries').insert([...taskEntries, billingEntry]);

  if (entriesError) {
    console.error(`Failed to insert entries for "${project.name}":`, entriesError.message);
    continue;
  }

  console.log(`${project.name} → /crm/admin/projects/${slug} (${taskEntries.length} tasks + 1 internal billing note)`);
}
