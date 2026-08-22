-- CRM Evolution 6 migration. Run after crm_evolution5.sql in the Supabase
-- SQL editor: https://supabase.com/dashboard/project/ivyzanmdxjpoxohmatml/sql
--
-- Two invoice tweaks:
--   - invoices.show_rate: per-invoice toggle for whether the hourly rate
--     is printed at all (some clients just get hours + total).
--   - invoices.invoice_number becomes nullable: the builder now lets you
--     type a custom number, leave it to fall back to the next default, or
--     explicitly issue an invoice with no number at all.
--
-- Safe to re-run: column add uses `if not exists`, drop not null is a
-- no-op if it's already nullable.

alter table invoices add column if not exists show_rate boolean not null default true;
alter table invoices alter column invoice_number drop not null;
