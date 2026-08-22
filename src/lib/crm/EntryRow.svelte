<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { ENTRY_TYPE_LABELS, nodeClassFor, dueChipFor, formatCurrency } from "$lib/utils/crmDisplay";
  import Highlight from "./Highlight.svelte";

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
  export let isOpen = false;
  export let searchQuery = "";
  export let rate: number | null = null;

  const dispatch = createEventDispatcher();

  $: hoursNote = entry.hours
    ? `${entry.hours}h${rate ? ` · ${formatCurrency(entry.hours * rate)}` : ""}`
    : entry.amount
      ? formatCurrency(entry.amount)
      : "";
  $: firstLine = entry.body?.split("\n")[0] ?? "";
  $: preview = firstLine.length > 90 ? firstLine.slice(0, 90) + "…" : firstLine;
  $: dueChip = dueChipFor(entry);
  $: unanswered =
    entry.comments.length > 0 && entry.comments[entry.comments.length - 1].author_type !== viewerType;
</script>

<button
  type="button"
  on:click={() => dispatch("open")}
  class="relative w-full flex items-start gap-3 py-2.5 pl-0 {canEdit ? 'pr-9' : 'pr-2'} -mx-2 px-2 rounded-lg text-left
         hover:bg-surface focus-visible:bg-surface focus-visible:outline-none {isOpen ? 'bg-surface' : ''}"
>
  <span class="relative w-5 shrink-0 self-stretch border-l border-stroke" aria-hidden="true">
    <span class="absolute left-0 top-4 -translate-x-1/2 {isOpen ? 'ring-4 ring-bg' : ''} {nodeClassFor(entry)}"></span>
  </span>

  <span class="min-w-0 flex-1 truncate text-base">
    <span class="text-ink"><Highlight text={entry.title} query={searchQuery} /></span>
    {#if hoursNote}
      <span class="hidden sm:inline text-muted"> &middot; {hoursNote}</span>
    {:else if preview}
      <span class="hidden sm:inline text-muted"> &middot; <Highlight text={preview} query={searchQuery} /></span>
    {/if}
  </span>

  <span class="shrink-0 flex items-center gap-2 text-sm">
    {#if dueChip}
      <span class={dueChip.overdue ? "text-accent" : "text-muted"}>{dueChip.text}</span>
    {/if}
    {#if entry.comments.length}
      <span class="flex items-center gap-1 {unanswered ? 'text-accent' : 'text-muted'}">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8-1.17 0-2.29-.2-3.31-.566L3 21l1.5-4.5C3.55 15.28 3 13.7 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span class="tabular-nums">{entry.comments.length}</span>
      </span>
    {/if}
    {#if entry.entry_type === "meeting_note"}
      <span class="rounded px-1.5 py-0.5 uppercase tracking-widest bg-accent-soft text-accent">
        {(entry.author_type ?? "admin") === "client" ? "Client meeting" : "Meeting"}
      </span>
    {/if}
    {#if entry.is_period}
      <span class="rounded px-1.5 py-0.5 uppercase tracking-widest bg-surface text-muted border border-stroke-strong">
        Period
      </span>
    {/if}
    {#if canEdit && entry.visible_to_client === false}
      <span class="rounded px-1.5 py-0.5 uppercase tracking-widest bg-warn-soft text-warn">Internal</span>
    {/if}
  </span>

  <span class="sr-only">
    {ENTRY_TYPE_LABELS[entry.entry_type] ?? entry.entry_type}{entry.status ? `, ${entry.status === "done" ? "done" : "open"}` : ""}
  </span>
</button>
