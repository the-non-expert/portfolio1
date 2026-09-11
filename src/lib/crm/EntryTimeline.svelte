<script lang="ts">
  import { ENTRY_TYPES, ENTRY_TYPE_LABELS, formatCurrency, formatDate, formatDayLabel, groupByDay } from "$lib/utils/crmDisplay";
  import EntryRow from "./EntryRow.svelte";
  import EntryModal from "./EntryModal.svelte";

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
    comments: Comment[];
  };
  type PaidMarker = {
    invoiceNumber: number | null;
    total: number;
    coverDate: string;
    paidAt: string | null;
    href?: string;
  };

  export let entries: Entry[];
  export let canEdit: boolean;
  export let viewerType: "admin" | "client";
  export let projectCreatedAt: string;
  export let emptyMessage: string;
  export let billingType: "hourly" | "flat" | null = null;
  export let rate: number | null = null;
  export let paidMarkers: PaidMarker[] = [];

  let searchQuery = "";
  let selectedTypes = new Set<string>();
  let periodOnly = false;
  let openEntryId: string | null = null;

  function toggleType(type: string) {
    const next = new Set(selectedTypes);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    selectedTypes = next;
  }

  $: filtered = entries.filter((e) => {
    if (selectedTypes.size && !selectedTypes.has(e.entry_type)) return false;
    if (periodOnly && !e.is_period) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const haystack = `${e.title} ${e.body ?? ""}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  $: groups = groupByDay(filtered);

  // Merges day-groups with paid-invoice markers into one descending-date
  // list. A marker's sort key sits just below its coverDate's own group (so
  // the day it settles renders above the line, as paid) but above any older
  // group — placement is purely date-driven, so it still lands correctly
  // even when a search/type filter removes the group at that exact date.
  type TimelineRow =
    | { kind: "group"; key: string; sortKey: number; group: { date: string; entries: Entry[] } }
    | { kind: "marker"; key: string; sortKey: number; marker: PaidMarker };
  $: timelineRows = (() => {
    const rows: TimelineRow[] = [
      ...groups.map((group) => ({
        kind: "group" as const,
        key: `g-${group.date}`,
        sortKey: new Date(group.date).getTime() * 2 + 1,
        group
      })),
      ...paidMarkers.map((marker) => ({
        kind: "marker" as const,
        key: `m-${marker.invoiceNumber ?? "x"}-${marker.coverDate}`,
        sortKey: new Date(marker.coverDate).getTime() * 2,
        marker
      }))
    ];
    rows.sort((a, b) => b.sortKey - a.sortKey);
    return rows;
  })();
  $: openCount = filtered.filter(
    (e) => (e.entry_type === "action_item" || e.entry_type === "deadline") && e.status !== "done"
  ).length;
  $: internalCount = filtered.filter((e) => e.visible_to_client === false).length;
  $: hasActiveFilter = Boolean(searchQuery.trim()) || selectedTypes.size > 0 || periodOnly;

  $: openIndex = openEntryId ? filtered.findIndex((e) => e.id === openEntryId) : -1;
  $: openEntry = openIndex >= 0 ? filtered[openIndex] : null;
  $: hasPrev = openIndex > 0;
  $: hasNext = openIndex >= 0 && openIndex < filtered.length - 1;

  function closeModal() {
    openEntryId = null;
  }
  function goPrev() {
    if (hasPrev) openEntryId = filtered[openIndex - 1].id;
  }
  function goNext() {
    if (hasNext) openEntryId = filtered[openIndex + 1].id;
  }
</script>

{#if entries.length === 0}
  <p class="text-base text-muted">{emptyMessage}</p>
{:else}
  <div class="sticky top-0 z-20 bg-bg pt-1 pb-4 flex flex-col sm:flex-row sm:items-center gap-3">
    <div class="relative w-full sm:w-52 shrink-0">
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="7" />
        <path stroke-linecap="round" d="M21 21l-4.35-4.35" />
      </svg>
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search this timeline..."
        class="w-full bg-surface border border-stroke rounded-xl pl-9 pr-4 py-2.5 text-base text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
      />
    </div>
    <div class="flex items-center gap-1.5 flex-wrap">
      {#each ENTRY_TYPES as type}
        <button
          type="button"
          on:click={() => toggleType(type)}
          class="text-sm px-2.5 py-1 rounded-full border transition-colors {selectedTypes.has(type) ? 'bg-ink text-bg border-ink' : 'border-stroke-strong text-muted hover:text-ink'}"
        >
          {ENTRY_TYPE_LABELS[type]}
        </button>
      {/each}
      <button
        type="button"
        on:click={() => (periodOnly = !periodOnly)}
        class="text-sm px-2.5 py-1 rounded-full border transition-colors {periodOnly ? 'bg-ink text-bg border-ink' : 'border-stroke-strong text-muted hover:text-ink'}"
      >
        Period
      </button>
    </div>
  </div>

  {#if filtered.length === 0}
    <p class="text-base text-muted">No entries match your search.</p>
  {:else}
    {#if filtered.length >= 3 || hasActiveFilter}
      <div class="flex items-center gap-3 text-sm text-muted mb-4">
        <span>{filtered.length} {filtered.length === entries.length ? "entries" : `of ${entries.length}`}</span>
        {#if openCount}<span class="text-accent">{openCount} open</span>{/if}
        {#if canEdit && internalCount}<span>{internalCount} internal</span>{/if}
      </div>
    {/if}

    <div class="max-w-3xl">
      {#each timelineRows as row (row.key)}
        {#if row.kind === "marker"}
          <div class="flex items-center gap-3 py-3">
            <span class="h-px flex-1 bg-good/30"></span>
            <svelte:element
              this={row.marker.href ? "a" : "span"}
              href={row.marker.href}
              class="inline-flex items-center gap-1.5 text-sm text-good font-medium px-3 py-1 rounded-full bg-good-soft whitespace-nowrap transition-colors {row.marker.href ? 'hover:bg-good hover:text-bg cursor-pointer' : ''}"
            >
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {row.marker.invoiceNumber ? `Invoice #${row.marker.invoiceNumber}` : "Invoice"} paid &middot; {formatCurrency(row.marker.total)}
              settled through {formatDate(row.marker.coverDate)}
            </svelte:element>
            <span class="h-px flex-1 bg-good/30"></span>
          </div>
        {:else}
          <div class="sticky top-[104px] sm:top-[64px] z-10 bg-bg flex items-baseline gap-3 py-2">
            <span class="font-display text-base text-ink">{formatDayLabel(row.group.date)}</span>
            <span class="h-px flex-1 bg-stroke"></span>
            <span class="text-sm text-muted tabular-nums">{row.group.entries.length}</span>
          </div>
          {#each row.group.entries as entry (entry.id)}
            <EntryRow
              {entry}
              {canEdit}
              {viewerType}
              {searchQuery}
              {rate}
              isOpen={entry.id === openEntryId}
              on:open={() => (openEntryId = entry.id)}
            />
          {/each}
        {/if}
      {/each}

      <div class="flex items-center gap-3 py-2">
        <span class="w-5 shrink-0 flex justify-center">
          <span class="w-1.5 h-1.5 rounded-full bg-bg border border-stroke"></span>
        </span>
        <span class="text-sm text-muted">Project started &middot; {formatDate(projectCreatedAt.slice(0, 10))}</span>
      </div>
    </div>
  {/if}
{/if}

{#if openEntry}
  <EntryModal
    entry={openEntry}
    {canEdit}
    {viewerType}
    {searchQuery}
    {hasPrev}
    {hasNext}
    {billingType}
    {rate}
    on:close={closeModal}
    on:prev={goPrev}
    on:next={goNext}
  />
{/if}
