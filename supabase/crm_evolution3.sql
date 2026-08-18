-- CRM Evolution 2, follow-up migration. Run after crm_evolution2.sql.
-- Adds billing (hourly vs flat rate) to projects, and hours logged to entries.
-- Safe to re-run: columns use `if not exists`.

alter table projects add column if not exists billing_type text not null default 'flat'
  check (billing_type in ('hourly', 'flat'));
alter table projects add column if not exists rate numeric;

alter table entries add column if not exists hours numeric;
