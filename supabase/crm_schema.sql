-- CRM migration. Run this once in the Supabase SQL editor:
-- https://supabase.com/dashboard/project/ivyzanmdxjpoxohmatml/sql
-- (Separate from schema.sql because that file's `contacts` policy was
-- already applied, and `create policy` has no `if not exists` guard.)

-- admins: whoever's auth_user_id is in here gets full read/write
-- across every CRM table below (that's Ayush; there's only ever one row)
create table if not exists admins (
  auth_user_id uuid primary key references auth.users(id) on delete cascade
);

create table if not exists clients (
  id           uuid        default gen_random_uuid() primary key,
  created_at   timestamptz default now() not null,
  auth_user_id uuid        references auth.users(id) on delete set null,
  full_name    text        not null,
  email        text        not null,
  company      text,
  phone        text
);

create table if not exists projects (
  id         uuid        default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  client_id  uuid        references clients(id) on delete cascade not null,
  name       text        not null,
  slug       text        not null unique,
  status     text        not null default 'active' check (status in ('active', 'on-hold', 'completed')),
  summary    text
);

-- entries: the timeline itself
create table if not exists entries (
  id                uuid        default gen_random_uuid() primary key,
  created_at        timestamptz default now() not null,
  project_id        uuid        references projects(id) on delete cascade not null,
  entry_type        text        not null check (entry_type in ('meeting_note', 'decision', 'deadline', 'action_item')),
  title             text        not null,
  body              text,
  entry_date        date        not null default current_date,
  due_date          date,
  status            text        check (status in ('open', 'done')),
  visible_to_client boolean     not null default true
);

create table if not exists comments (
  id         uuid        default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  entry_id   uuid        references entries(id) on delete cascade not null,
  author_type text       not null check (author_type in ('client', 'admin')),
  body       text        not null
);

alter table admins enable row level security;
alter table clients enable row level security;
alter table projects enable row level security;
alter table entries enable row level security;
alter table comments enable row level security;

-- SECURITY DEFINER so this query runs as the function owner and bypasses
-- RLS on `admins` — a policy on `admins` that queried `admins` directly
-- would reference itself and Postgres rejects that as recursive.
create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from admins where auth_user_id = auth.uid());
$$;

-- admins: only an admin can see who the admins are
create policy "admin reads admins"
  on admins for select to authenticated
  using (is_admin());

-- clients: admin has full access; a client can read only their own row
create policy "admin full access to clients"
  on clients for all to authenticated
  using (is_admin())
  with check (is_admin());

create policy "client reads own row"
  on clients for select to authenticated
  using (auth_user_id = auth.uid());

-- projects: admin has full access; a client can read their own projects
create policy "admin full access to projects"
  on projects for all to authenticated
  using (is_admin())
  with check (is_admin());

create policy "client reads own projects"
  on projects for select to authenticated
  using (client_id in (select id from clients where auth_user_id = auth.uid()));

-- entries: admin has full access; a client reads only client-visible entries on their own projects
create policy "admin full access to entries"
  on entries for all to authenticated
  using (is_admin())
  with check (is_admin());

create policy "client reads visible entries on own projects"
  on entries for select to authenticated
  using (
    visible_to_client = true
    and project_id in (
      select p.id from projects p
      join clients c on c.id = p.client_id
      where c.auth_user_id = auth.uid()
    )
  );

-- comments: admin has full access; a client can read/insert comments on their own visible entries
create policy "admin full access to comments"
  on comments for all to authenticated
  using (is_admin())
  with check (is_admin());

create policy "client reads comments on own visible entries"
  on comments for select to authenticated
  using (
    entry_id in (
      select e.id from entries e
      join projects p on p.id = e.project_id
      join clients c on c.id = p.client_id
      where c.auth_user_id = auth.uid() and e.visible_to_client = true
    )
  );

create policy "client inserts comments on own visible entries"
  on comments for insert to authenticated
  with check (
    author_type = 'client'
    and entry_id in (
      select e.id from entries e
      join projects p on p.id = e.project_id
      join clients c on c.id = p.client_id
      where c.auth_user_id = auth.uid() and e.visible_to_client = true
    )
  );

-- After running this file, make yourself the one admin:
--   node --env-file=.env scripts/crm-seed-admin.mjs you@email.com "a-password"
