<script lang="ts">
  import { formatDayLabel, groupByDay, loggedByLabel } from "$lib/utils/crmDisplay";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: groups = groupByDay(data.meetings);
</script>

<main class="max-w-5xl mx-auto px-4 md:px-6 py-12">
  <div class="flex items-center justify-between gap-4 mb-8 flex-wrap">
    <div>
      <h1 class="font-display text-2xl font-semibold text-ink mb-1">Meetings</h1>
      <p class="text-sm text-muted">Every meeting logged, across every client.</p>
    </div>
    <div class="flex items-center gap-3 text-xs">
      <a href="?filter=active" class={data.filter === "active" ? "text-ink" : "text-muted hover:text-ink"}>Active</a>
      <a href="?filter=all" class={data.filter === "all" ? "text-ink" : "text-muted hover:text-ink"}>All</a>
      <a href="?filter=archived" class={data.filter === "archived" ? "text-ink" : "text-muted hover:text-ink"}>Archived</a>
    </div>
  </div>

  {#if data.meetings.length === 0}
    <p class="text-sm text-muted">
      {data.filter === "archived" ? "No meetings on archived projects." : "No meetings logged yet."}
    </p>
  {:else}
    <div class="max-w-3xl">
      {#each groups as group (group.date)}
        <div class="flex items-baseline gap-3 py-2">
          <span class="font-display text-sm text-ink">{formatDayLabel(group.date)}</span>
          <span class="h-px flex-1 bg-stroke"></span>
        </div>
        {#each group.entries as meeting (meeting.id)}
          <a
            href={`/crm/admin/projects/${meeting.projectSlug}`}
            class="block px-2 py-3 -mx-2 rounded-lg hover:bg-surface transition-colors {meeting.projectArchived ? 'opacity-60' : ''}"
          >
            <div class="flex items-center justify-between gap-4">
              <span class="text-sm text-ink">{meeting.title}</span>
              <span class="text-xs text-muted uppercase tracking-widest shrink-0">
                {loggedByLabel(meeting, "admin")}
              </span>
            </div>
            <p class="text-xs text-muted mt-0.5">
              {meeting.clientName} &middot; {meeting.projectName}
            </p>
            {#if meeting.body}
              <p class="text-sm text-muted mt-1.5 line-clamp-2">{meeting.body}</p>
            {/if}
          </a>
        {/each}
      {/each}
    </div>
  {/if}
</main>
