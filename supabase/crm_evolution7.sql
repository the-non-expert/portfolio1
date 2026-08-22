-- CRM Evolution 7 migration. Run after crm_evolution6.sql in the Supabase
-- SQL editor: https://supabase.com/dashboard/project/ivyzanmdxjpoxohmatml/sql
--
-- A multi-month invoice (e.g. Vedi Herbals' Shopify Manager work spanning
-- May–Aug) needs to show the client WHEN each line item happened, not just
-- a flat total. invoice_items.item_date snapshots the entry's date (or a
-- custom line's chosen date) at invoice time, so the printed invoice can
-- group line items by month with a subtotal each, and show the overall
-- billing period next to the issue date.
--
-- Safe to re-run: column add uses `if not exists`.

alter table invoice_items add column if not exists item_date date;
