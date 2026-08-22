-- CRM Evolution 8 migration. Run after crm_evolution7.sql in the Supabase
-- SQL editor: https://supabase.com/dashboard/project/ivyzanmdxjpoxohmatml/sql
--
-- Some work (e.g. "Miscellaneous" small fixes) doesn't belong to one day —
-- it accrues across the whole engagement, and forcing it into a single
-- calendar month on an invoice misrepresents when the work actually
-- happened. Adds an optional "this spans a period, not a single date"
-- toggle to action items:
--   - entries.is_period:  the toggle itself (default false — off unless
--                          explicitly turned on, and can be flipped later
--                          when editing an existing entry).
--   - entries.period_end: the "through" date. Nullable even when
--                          is_period is true — an open-ended range ("since
--                          7 May, still ongoing") is valid; a client's
--                          billing cycle doesn't always wait for work to
--                          finish before the invoice goes out.
-- invoice_items mirrors both columns as a snapshot, same as item_date
-- already does. invoices.misc_section_label is free text so the section
-- heading for these lines on the printed invoice is fully editable per
-- invoice, not a hardcoded "Miscellaneous".
--
-- Safe to re-run: columns use `if not exists`.

alter table entries add column if not exists is_period boolean not null default false;
alter table entries add column if not exists period_end date;

alter table invoice_items add column if not exists is_period boolean not null default false;
alter table invoice_items add column if not exists period_end date;

alter table invoices add column if not exists misc_section_label text;
