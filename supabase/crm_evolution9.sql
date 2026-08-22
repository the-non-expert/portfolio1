-- CRM Evolution 9 migration. Run after crm_evolution8.sql in the Supabase
-- SQL editor: https://supabase.com/dashboard/project/ivyzanmdxjpoxohmatml/sql
--
-- The "Payable to" block (your name + address) was hardcoded from env vars
-- on every invoice — some clients don't want a home address printed. Makes
-- it editable per invoice, mirroring how "Bill to" already works:
--   - invoices.payee_override:      the exact text printed for this
--                                    invoice. Nullable — an existing
--                                    invoice with none set falls back to
--                                    the env-var default, no backfill
--                                    required.
--   - clients.invoice_payee_default: remembered per client, so once you
--                                    edit it for a client that doesn't
--                                    want an address, every future invoice
--                                    for them starts from that instead of
--                                    the default.
--
-- Safe to re-run: columns use `if not exists`.

alter table invoices add column if not exists payee_override text;
alter table clients add column if not exists invoice_payee_default text;
