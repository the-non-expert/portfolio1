<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { enhance } from "$app/forms";
  import { ENTRY_TYPES, ENTRY_TYPE_LABELS, formatDate, formatCurrency, canEditEntry, loggedByLabel } from "$lib/utils/crmDisplay";
  import Drawer from "./Drawer.svelte";
  import Highlight from "./Highlight.svelte";
  import Spinner from "./Spinner.svelte";

  type Comment = { id: string; author_type: "admin" | "client"; body: string; created_at: string };
  type Entry = {
    id: string;
    entry_type: string;
    title: string;
    body: string | null;
    entry_date: string;
    due_date: string | null;
    status: string | null;
    visible_to_client?: boolean;
    hours?: number | null;
    amount?: number | null;
    is_period?: boolean | null;
    period_end?: string | null;
    author_type?: string | null;
    comments: Comment[];
  };

  export let entry: Entry;
  export let canEdit: boolean;
  export let viewerType: "admin" | "client";
  export let searchQuery = "";
  export let hasPrev = false;
  export let hasNext = false;
  export let billingType: "hourly" | "flat" | null = null;
  export let rate: number | null = null;

  const dispatch = createEventDispatcher();

  // A meeting note's author edits the full record; the other party can
  // only reply below — never a flat page-level permission for this one.
  $: editableByViewer = canEditEntry(entry, viewerType);
  // Client-authored meeting notes get the restricted 3-field edit form
  // (title/date/notes) regardless of who's viewing, since that's all a
  // client's own entry can ever contain.
  $: restrictedEdit = (entry.author_type ?? "admin") === "client";

  let editing = false;
  let savingEdit = false;
  let sendingComment = false;
  let editType = "";
  let editTitle = "";
  let editBody = "";
  let editEntryDate = "";
  let editDueDate = "";
  let editStatus = "";
  let editVisible = true;
  let editHours = "";
  let editAmount = "";
  let editIsPeriod = false;
  let editPeriodEnd = "";

  $: showDueDate = editType === "deadline" || editType === "action_item";
  $: showStatus = editType === "action_item";
  $: showHours = editType === "action_item" && billingType === "hourly";
  $: showAmount = editType === "action_item" && billingType === "flat";
  $: showPeriodToggle = editType === "action_item";

  function startEdit() {
    editType = entry.entry_type;
    editTitle = entry.title;
    editBody = entry.body ?? "";
    editEntryDate = entry.entry_date;
    editDueDate = entry.due_date ?? "";
    editStatus = entry.status ?? "";
    editVisible = entry.visible_to_client !== false;
    editHours = entry.hours != null ? String(entry.hours) : "";
    editAmount = entry.amount != null ? String(entry.amount) : "";
    editIsPeriod = entry.is_period === true;
    editPeriodEnd = entry.period_end ?? "";
    editing = true;
  }
  function cancelEdit() {
    editing = false;
  }

  function close() {
    dispatch("close");
  }
  function prev() {
    if (hasPrev) {
      editing = false;
      dispatch("prev");
    }
  }
  function next() {
    if (hasNext) {
      editing = false;
      dispatch("next");
    }
  }

  // Drawer already owns Escape + backdrop-click to close; this only adds
  // arrow-key navigation between entries on top of that.
  function onKeydown(e: KeyboardEvent) {
    const target = e.target as HTMLElement;
    const isTyping = target.tagName === "TEXTAREA" || target.tagName === "INPUT" || target.tagName === "SELECT";

    if (e.key === "ArrowLeft" && !isTyping) prev();
    else if (e.key === "ArrowRight" && !isTyping) next();
  }

  function authorLabel(commentAuthorType: string) {
    if (viewerType === "admin") return commentAuthorType === "admin" ? "You" : "Client";
    return commentAuthorType === "admin" ? "Ayush" : "You";
  }
</script>

<svelte:window on:keydown={onKeydown} />

<Drawer title={entry.title} on:close={close}>
  <div slot="header" class="flex items-center gap-2 pt-1">
    <span class="text-xs uppercase tracking-widest text-muted">
      {editing ? "Editing" : ENTRY_TYPE_LABELS[entry.entry_type] ?? entry.entry_type}
    </span>
    {#if editableByViewer && !editing}
      <button type="button" on:click={startEdit} class="text-xs text-muted hover:text-ink px-2 py-1 rounded-lg hover:bg-bg">
        Edit
      </button>
    {/if}
  </div>

  {#if editing}
    <form
      method="POST"
      action="?/updateEntry"
      use:enhance={() => {
        savingEdit = true;
        return async ({ update }) => {
          await update();
          savingEdit = false;
          editing = false;
        };
      }}
      class="space-y-4"
    >
      <input type="hidden" name="entry_id" value={entry.id} />

      {#if !restrictedEdit}
        <div class="flex flex-col gap-1.5">
          <label for="edit_entry_type" class="text-sm font-medium text-ink">Type</label>
          <select
            id="edit_entry_type"
            name="entry_type"
            bind:value={editType}
            class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
          >
            {#each ENTRY_TYPES as type}
              <option value={type}>{ENTRY_TYPE_LABELS[type]}</option>
            {/each}
          </select>
        </div>
      {/if}

      <div class="flex flex-col gap-1.5">
        <label for="edit_title" class="text-sm font-medium text-ink">
          Title {#if restrictedEdit}<span class="text-muted font-normal">(optional)</span>{/if}
        </label>
        <input
          id="edit_title"
          name="title"
          type="text"
          placeholder={restrictedEdit ? "Meeting" : undefined}
          bind:value={editTitle}
          class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
          required={!restrictedEdit}
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="edit_body" class="text-sm font-medium text-ink">Notes <span class="text-muted font-normal">(optional)</span></label>
        <textarea
          id="edit_body"
          name="body"
          rows="4"
          bind:value={editBody}
          class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors resize-none"
        ></textarea>
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="edit_entry_date" class="text-sm font-medium text-ink">{editIsPeriod ? "From" : "Date"}</label>
        <input
          id="edit_entry_date"
          name="entry_date"
          type="date"
          bind:value={editEntryDate}
          class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {#if !restrictedEdit && showPeriodToggle}
        <label class="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="is_period" bind:checked={editIsPeriod} class="accent-accent" />
          This covers a period, not a single date
        </label>

        {#if editIsPeriod}
          <div class="flex flex-col gap-1.5">
            <label for="edit_period_end" class="text-sm font-medium text-ink">
              Through <span class="text-muted font-normal">(optional — leave blank if still ongoing)</span>
            </label>
            <input
              id="edit_period_end"
              name="period_end"
              type="date"
              bind:value={editPeriodEnd}
              class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        {/if}
      {/if}

      {#if !restrictedEdit && showDueDate}
        <div class="flex flex-col gap-1.5">
          <label for="edit_due_date" class="text-sm font-medium text-ink">Due date</label>
          <input
            id="edit_due_date"
            name="due_date"
            type="date"
            bind:value={editDueDate}
            class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      {/if}

      {#if !restrictedEdit && showStatus}
        <div class="flex flex-col gap-1.5">
          <label for="edit_status" class="text-sm font-medium text-ink">Status</label>
          <select
            id="edit_status"
            name="status"
            bind:value={editStatus}
            class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
          >
            <option value="open">Open</option>
            <option value="done">Done</option>
          </select>
        </div>
      {/if}

      {#if !restrictedEdit && showHours}
        <div class="flex flex-col gap-1.5">
          <label for="edit_hours" class="text-sm font-medium text-ink">
            Hours {rate ? `(× ₹${rate}/hr)` : ""}
          </label>
          <input
            id="edit_hours"
            name="hours"
            type="number"
            min="0"
            step="0.25"
            bind:value={editHours}
            class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      {/if}

      {#if !restrictedEdit && showAmount}
        <div class="flex flex-col gap-1.5">
          <label for="edit_amount" class="text-sm font-medium text-ink">Amount (₹) <span class="text-muted font-normal">(for invoicing)</span></label>
          <input
            id="edit_amount"
            name="amount"
            type="number"
            min="0"
            step="0.01"
            bind:value={editAmount}
            class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      {/if}

      {#if !restrictedEdit}
        <label class="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="visible_to_client" bind:checked={editVisible} class="accent-accent" />
          Visible to client
        </label>
      {/if}

      <div class="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={savingEdit}
          class="bg-ink text-bg px-5 py-2 rounded-full text-xs font-medium hover:bg-accent transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {#if savingEdit}<Spinner class="w-3.5 h-3.5" />{/if}
          Save
        </button>
        <button type="button" on:click={cancelEdit} disabled={savingEdit} class="text-xs text-muted hover:text-ink disabled:opacity-60">Cancel</button>
      </div>
    </form>
  {:else}
    <h2 class="font-display text-xl font-semibold text-ink">
      <Highlight text={entry.title} query={searchQuery} />
    </h2>

    <p class="mt-1 text-sm text-muted">
      {#if entry.is_period}
        {formatDate(entry.entry_date)} &rarr; {entry.period_end ? formatDate(entry.period_end) : "ongoing"}
      {:else}
        {formatDate(entry.entry_date)}
      {/if}
      {#if entry.due_date}&middot; Due {formatDate(entry.due_date)}{/if}
      {#if entry.status}&middot; {entry.status === "done" ? "Done" : "Open"}{/if}
      {#if entry.hours}&middot; {entry.hours}h{rate ? ` · ${formatCurrency(entry.hours * rate)}` : ""}{/if}
      {#if entry.amount}&middot; {formatCurrency(entry.amount)}{/if}
      {#if entry.entry_type === "meeting_note"}&middot; {loggedByLabel(entry, viewerType)}{/if}
      {#if canEdit && entry.visible_to_client === false}&middot; <span class="text-warn">Internal</span>{/if}
    </p>

    {#if entry.body}
      <p class="text-base text-ink leading-relaxed whitespace-pre-wrap mt-4">
        <Highlight text={entry.body} query={searchQuery} />
      </p>
    {/if}

    {#if entry.comments.length > 0}
      <div class="mt-4 pt-4 border-t border-stroke space-y-3">
        {#each entry.comments as comment}
          <div class="pl-3 border-l-2 {comment.author_type === viewerType ? 'border-stroke' : 'border-accent-soft'}">
            <span class="text-xs uppercase tracking-widest text-muted">{authorLabel(comment.author_type)}</span>
            <p class="text-base text-ink mt-0.5 whitespace-pre-wrap">{comment.body}</p>
          </div>
        {/each}
      </div>
    {/if}

    <form
      method="POST"
      action="?/comment"
      use:enhance={() => {
        sendingComment = true;
        return async ({ update }) => {
          await update();
          sendingComment = false;
        };
      }}
      class="mt-4 pt-4 border-t border-stroke flex flex-col gap-2"
    >
      <input type="hidden" name="entry_id" value={entry.id} />
      <textarea
        name="body"
        placeholder={viewerType === "admin" ? "Reply..." : "Ask a question about this update..."}
        rows="2"
        class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-base text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
        required
      ></textarea>
      <button
        type="submit"
        disabled={sendingComment}
        class="self-end bg-ink text-bg px-5 py-2 rounded-full text-xs font-medium hover:bg-accent transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {#if sendingComment}<Spinner class="w-3.5 h-3.5" />{/if}
        {viewerType === "admin" ? "Reply" : "Send"}
      </button>
    </form>
  {/if}

  <div class="flex items-center justify-between mt-6 pt-4 border-t border-stroke">
    <button
      type="button"
      on:click={prev}
      disabled={!hasPrev}
      class="text-sm flex items-center gap-1 {hasPrev ? 'text-ink hover:text-accent' : 'text-muted opacity-40 cursor-not-allowed'}"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Previous
    </button>
    <button
      type="button"
      on:click={next}
      disabled={!hasNext}
      class="text-sm flex items-center gap-1 {hasNext ? 'text-ink hover:text-accent' : 'text-muted opacity-40 cursor-not-allowed'}"
    >
      Next
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</Drawer>
