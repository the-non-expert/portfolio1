-- CRM Evolution 2 migration. Run this once in the Supabase SQL editor,
-- after crm_schema.sql has already been applied.
-- Safe to re-run: columns use `if not exists`, policies are dropped first.

-- ============================================================
-- Columns: archived_at (hide, never delete) + updated_at
-- ============================================================

alter table clients  add column if not exists archived_at timestamptz;
alter table projects add column if not exists archived_at timestamptz;
alter table entries  add column if not exists archived_at timestamptz;

alter table clients  add column if not exists updated_at timestamptz not null default now();
alter table projects add column if not exists updated_at timestamptz not null default now();
alter table entries  add column if not exists updated_at timestamptz not null default now();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on clients;
create trigger set_updated_at before update on clients
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on projects;
create trigger set_updated_at before update on projects
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on entries;
create trigger set_updated_at before update on entries
  for each row execute function public.set_updated_at();

-- ============================================================
-- RLS: archived rows disappear from every client-facing policy.
-- Admin policies are untouched — is_admin() already sees everything,
-- which is what makes "show archived" a query-level toggle for Ayush.
-- ============================================================

drop policy if exists "client reads visible entries on own projects" on entries;
create policy "client reads visible entries on own projects"
  on entries for select to authenticated
  using (
    visible_to_client = true
    and archived_at is null
    and project_id in (
      select p.id from projects p
      join clients c on c.id = p.client_id
      where c.auth_user_id = auth.uid()
    )
  );

drop policy if exists "client reads comments on own visible entries" on comments;
create policy "client reads comments on own visible entries"
  on comments for select to authenticated
  using (
    entry_id in (
      select e.id from entries e
      join projects p on p.id = e.project_id
      join clients c on c.id = p.client_id
      where c.auth_user_id = auth.uid()
        and e.visible_to_client = true
        and e.archived_at is null
    )
  );

drop policy if exists "client inserts comments on own visible entries" on comments;
create policy "client inserts comments on own visible entries"
  on comments for insert to authenticated
  with check (
    author_type = 'client'
    and entry_id in (
      select e.id from entries e
      join projects p on p.id = e.project_id
      join clients c on c.id = p.client_id
      where c.auth_user_id = auth.uid()
        and e.visible_to_client = true
        and e.archived_at is null
    )
  );

drop policy if exists "client reads own projects" on projects;
create policy "client reads own projects"
  on projects for select to authenticated
  using (
    archived_at is null
    and client_id in (
      select id from clients
      where auth_user_id = auth.uid() and archived_at is null
    )
  );

-- clients: "client reads own row" is untouched on purpose. An archived
-- client should still see their own row (no confusing empty state) —
-- access revocation is a separate, optional auth-level ban, not a
-- row-visibility rule.

-- ============================================================
-- Indexes for the default (live) path, which is now the common case
-- ============================================================

create index if not exists entries_project_live_idx
  on entries (project_id, entry_date desc) where archived_at is null;
create index if not exists projects_client_live_idx
  on projects (client_id) where archived_at is null;
create index if not exists clients_live_idx
  on clients (id) where archived_at is null;

-- ============================================================
-- Dashboard overview: one view instead of N+1 queries per project.
-- security_invoker is required — without it this runs as the view's
-- owner and bypasses RLS, leaking every client's projects to everyone.
-- ============================================================

create or replace view crm_project_overview
with (security_invoker = on) as
select
  p.id, p.slug, p.name, p.status, p.summary, p.archived_at, p.created_at,
  c.id as client_id, c.full_name as client_name, c.email as client_email,
  c.archived_at as client_archived_at,
  (select count(*) from entries e where e.project_id = p.id and e.archived_at is null) as entry_count,
  (select max(e.created_at) from entries e where e.project_id = p.id and e.archived_at is null) as last_entry_at
from projects p
join clients c on c.id = p.client_id;
