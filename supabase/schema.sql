-- Run this once in the Supabase SQL editor: https://supabase.com/dashboard/project/ivyzanmdxjpoxohmatml/sql

create table if not exists contacts (
  id          uuid        default gen_random_uuid() primary key,
  created_at  timestamptz default now() not null,
  fullname    text        not null,
  email       text        not null,
  project_type text,
  description text        not null
);

-- Allow anonymous inserts (anon key used from the site)
grant insert on contacts to anon;

-- Prevent anon from reading other people's submissions
revoke select on contacts from anon;
