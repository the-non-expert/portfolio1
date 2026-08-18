<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main class="max-w-5xl mx-auto px-4 md:px-6 py-12">
  <div class="flex items-center justify-between gap-4 mb-8 flex-wrap">
    <div>
      <h1 class="font-display text-2xl font-semibold text-ink mb-1">Clients</h1>
      <p class="text-sm text-muted">Everyone you've done work for.</p>
    </div>
    <div class="flex items-center gap-3 text-xs">
      <a href="?filter=active" class={data.filter === "active" ? "text-ink" : "text-muted hover:text-ink"}>Active</a>
      <a href="?filter=all" class={data.filter === "all" ? "text-ink" : "text-muted hover:text-ink"}>All</a>
      <a href="?filter=archived" class={data.filter === "archived" ? "text-ink" : "text-muted hover:text-ink"}>Archived</a>
    </div>
  </div>

  {#if data.clients.length === 0}
    <p class="text-sm text-muted">
      {data.filter === "archived" ? "No archived clients." : "No clients yet."}
    </p>
  {:else}
    <div class="border-t border-stroke-strong">
      {#each data.clients as client}
        <div class="border-b border-stroke px-2 py-3 flex items-center justify-between gap-4 {client.archived ? 'opacity-60' : ''}">
          <div>
            <p class="text-sm text-ink">{client.full_name}</p>
            <p class="text-xs text-muted mt-0.5">
              {client.company ?? client.email}
              &middot; {client.projectCount} {client.projectCount === 1 ? "project" : "projects"}
            </p>
          </div>
          {#if client.derivedStatus !== "Active"}
            <span class="text-xs text-muted uppercase tracking-widest shrink-0">{client.derivedStatus}</span>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</main>
