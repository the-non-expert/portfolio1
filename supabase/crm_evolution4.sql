-- CRM Evolution 4 migration. Run after crm_evolution3.sql.
-- Adds client-authored meeting notes: clients can now log a meeting entry
-- themselves (not just comment on ones the admin logs), scoped tightly by
-- RLS. Safe to re-run: column uses `if not exists`, policies are dropped
-- first.

-- ============================================================
-- Authorship: who logged this entry. Existing rows default to 'admin'
-- since every entry so far was admin-created.
-- ============================================================

alter table entries add column if not exists author_type text not null default 'admin'
  check (author_type in ('admin', 'client'));

-- ============================================================
-- Client write access: meeting notes only.
--
-- Both insert and update are pinned to entry_type = 'meeting_note',
-- visible_to_client = true, author_type = 'client', and every
-- admin-only field (status, due_date, hours) forced null. This is
-- defense in depth — the app layer already only ever sends title/body/
-- entry_date for a client-authored entry — but RLS is what actually
-- stops a client from writing a decision/deadline/action_item or a
-- billed hour by hitting the API directly.
--
-- Editing is author-scoped on purpose: a client can update only their
-- own meeting notes, never one the admin logged, and vice versa (the
-- admin update path in the app enforces the mirror image). Disagreements
-- go through comments, not silent rewrites of the original entry.
-- ============================================================

drop policy if exists "client inserts meeting notes on own projects" on entries;
create policy "client inserts meeting notes on own projects"
  on entries for insert to authenticated
  with check (
    author_type = 'client'
    and entry_type = 'meeting_note'
    and visible_to_client = true
    and status is null
    and due_date is null
    and hours is null
    and project_id in (
      select p.id from projects p
      join clients c on c.id = p.client_id
      where c.auth_user_id = auth.uid()
        and p.archived_at is null
        and c.archived_at is null
    )
  );

drop policy if exists "client updates own meeting notes" on entries;
create policy "client updates own meeting notes"
  on entries for update to authenticated
  using (
    author_type = 'client'
    and entry_type = 'meeting_note'
    and project_id in (
      select p.id from projects p
      join clients c on c.id = p.client_id
      where c.auth_user_id = auth.uid()
        and p.archived_at is null
        and c.archived_at is null
    )
  )
  with check (
    author_type = 'client'
    and entry_type = 'meeting_note'
    and visible_to_client = true
    and status is null
    and due_date is null
    and hours is null
    and project_id in (
      select p.id from projects p
      join clients c on c.id = p.client_id
      where c.auth_user_id = auth.uid()
        and p.archived_at is null
        and c.archived_at is null
    )
  );

-- ============================================================
-- Index for the cross-project "Meetings" admin view, which scans every
-- meeting_note entry regardless of project.
-- ============================================================

create index if not exists entries_meeting_notes_idx
  on entries (entry_date desc)
  where entry_type = 'meeting_note' and archived_at is null;
