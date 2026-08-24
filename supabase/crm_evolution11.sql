-- CRM Evolution 11 migration. Run after crm_evolution10.sql in the Supabase
-- SQL editor: https://supabase.com/dashboard/project/ivyzanmdxjpoxohmatml/sql
--
-- invoices.show_dates: per-invoice toggle for whether per-line-item dates
-- (the Date column, month-grouping headers, and the "Billing period" line)
-- print on the invoice — mirrors how invoices.show_rate already works.
-- The underlying entry/item dates are always kept in the database either
-- way; this only controls what's shown on that particular invoice. Useful
-- for backfilled work where the exact date isn't meaningful to the client.
--
-- Safe to re-run: column uses `if not exists`.

alter table invoices add column if not exists show_dates boolean not null default true;
