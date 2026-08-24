-- CRM Evolution 10 migration. Run after crm_evolution9.sql in the Supabase
-- SQL editor: https://supabase.com/dashboard/project/ivyzanmdxjpoxohmatml/sql
--
-- Invoice negotiation: clients sometimes negotiate the price after
-- receiving an invoice. Rather than editing the original (which would
-- rewrite billing history — the whole point of invoices/invoice_items
-- being an issue-time snapshot), a brand new invoice is issued for the
-- settled price, linked back to the one it supersedes.
--
--   - invoices.negotiated_from_id: nullable self-reference, set on the NEW
--     (negotiated) invoice, pointing at the original it supersedes. The
--     reverse direction ("has this invoice been superseded?") is just a
--     lookup for any invoice whose negotiated_from_id equals this one's
--     id — no second column needed, and no new status value either
--     (negotiating still just flips the original's existing status to
--     'void', same as any other void).
--
-- Safe to re-run: column/index use `if not exists`.

alter table invoices add column if not exists negotiated_from_id uuid references invoices(id) on delete set null;
create index if not exists invoices_negotiated_from_idx on invoices (negotiated_from_id);
