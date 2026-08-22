-- CRM Evolution 5 migration. Run after crm_evolution4.sql in the Supabase
-- SQL editor: https://supabase.com/dashboard/project/ivyzanmdxjpoxohmatml/sql
--
-- Adds structured invoicing:
--   - entries.amount:     flat-fee cost per entry (hourly entries keep
--                          computing cost live as hours × projects.rate;
--                          flat projects have no per-project rate, so cost
--                          has to be entered per entry instead of parsed
--                          out of body text the way the old seed data did)
--   - clients.invoice_bill_to: the "Invoice to" block printed on an
--                          invoice (name + address). Free text — persisted
--                          here so it only has to be typed once per client.
--   - invoices:            one row per issued invoice, always scoped to a
--                          single project. subtotal/total/bill_to are a
--                          snapshot at issue time so editing an entry or a
--                          client's address later never rewrites history.
--   - invoice_items:       line items on an invoice. entry_id is nullable
--                          (an ad-hoc line needs no source entry) and the
--                          same entry can appear on more than one invoice —
--                          each row just carries its own slice of the
--                          amount, which is what makes partial/split
--                          invoicing possible (bill 1/3 of a balance now,
--                          the rest across later invoices; a voided
--                          invoice's items no longer count as billed).
--
-- Safe to re-run: columns/tables use `if not exists`, policies/triggers
-- are dropped first.

alter table entries add column if not exists amount numeric;
alter table clients add column if not exists invoice_bill_to text;

create table if not exists invoices (
  id             uuid        default gen_random_uuid() primary key,
  created_at     timestamptz default now() not null,
  updated_at     timestamptz default now() not null,
  project_id     uuid        references projects(id) on delete cascade not null,
  invoice_number integer     not null unique,
  issue_date     date        not null default current_date,
  due_date       date,
  status         text        not null default 'pending' check (status in ('pending', 'paid', 'void')),
  paid_at        timestamptz,
  bill_to        text        not null,
  subtotal       numeric     not null,
  total          numeric     not null,
  notes          text
);

create table if not exists invoice_items (
  id          uuid        default gen_random_uuid() primary key,
  created_at  timestamptz default now() not null,
  invoice_id  uuid        references invoices(id) on delete cascade not null,
  entry_id    uuid        references entries(id) on delete set null,
  description text        not null,
  hours       numeric,
  rate        numeric,
  amount      numeric     not null
);

alter table invoices      enable row level security;
alter table invoice_items enable row level security;

-- Admin-only for now — clients don't get a portal view of invoices in v1.
drop policy if exists "admin full access to invoices" on invoices;
create policy "admin full access to invoices"
  on invoices for all to authenticated
  using (is_admin())
  with check (is_admin());

drop policy if exists "admin full access to invoice_items" on invoice_items;
create policy "admin full access to invoice_items"
  on invoice_items for all to authenticated
  using (is_admin())
  with check (is_admin());

drop trigger if exists set_updated_at on invoices;
create trigger set_updated_at before update on invoices
  for each row execute function public.set_updated_at();

create index if not exists invoices_project_idx     on invoices (project_id, issue_date desc);
create index if not exists invoices_status_idx       on invoices (status) where status = 'pending';
create index if not exists invoice_items_invoice_idx on invoice_items (invoice_id);
create index if not exists invoice_items_entry_idx   on invoice_items (entry_id);
