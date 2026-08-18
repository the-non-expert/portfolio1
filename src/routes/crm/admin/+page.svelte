<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main class="max-w-5xl mx-auto px-4 md:px-6 py-12">
  <div class="flex items-center justify-between gap-4 mb-8 flex-wrap">
    <div>
      <h1 class="font-display text-2xl font-semibold text-ink mb-1">Dashboard</h1>
      <p class="text-sm text-muted">Every project on the books.</p>
    </div>
    <div class="flex items-center gap-3 text-xs">
      <a href="?filter=active" class={data.filter === "active" ? "text-ink" : "text-muted hover:text-ink"}>Active</a>
      <a href="?filter=all" class={data.filter === "all" ? "text-ink" : "text-muted hover:text-ink"}>All</a>
      <a href="?filter=archived" class={data.filter === "archived" ? "text-ink" : "text-muted hover:text-ink"}>Archived</a>
    </div>
  </div>

  {#if data.projects.length === 0}
    <p class="text-sm text-muted">
      {data.filter === "archived" ? "No archived projects." : "No projects yet. Add a client after your next meeting."}
    </p>
  {:else}
    <div class="space-y-3">
      {#each data.projects as project}
        <a
          href={`/crm/admin/projects/${project.slug}`}
          class="block bg-surface border border-stroke rounded-xl px-6 py-4 hover:border-accent transition-colors {project.archived ? 'opacity-60' : ''}"
        >
          <div class="flex items-center justify-between gap-4">
            <div>
              <h2 class="font-display text-lg font-medium text-ink">{project.name}</h2>
              <p class="text-sm text-muted mt-0.5">
                {project.client?.full_name} &middot; {project.client?.email}
              </p>
            </div>
            <span class="text-xs text-muted uppercase tracking-widest shrink-0">
              {project.archived ? "Archived" : project.status}
            </span>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</main>
