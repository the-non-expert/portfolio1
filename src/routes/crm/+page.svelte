<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main class="max-w-5xl mx-auto px-4 md:px-6 py-12">
  <h1 class="font-display text-2xl font-semibold text-ink mb-1">Your projects</h1>
  <p class="text-sm text-muted mb-8">Pick a project to see its timeline.</p>

  {#if !data.client}
    <p class="text-sm text-muted">
      We couldn't find a project linked to your account yet. Reach out and I'll get it set up.
    </p>
  {:else if data.projects.length === 0}
    <p class="text-sm text-muted">No projects yet — check back soon.</p>
  {:else}
    <div class="space-y-3">
      {#each data.projects as project}
        <a
          href={`/crm/projects/${project.slug}`}
          class="block bg-surface border border-stroke rounded-xl px-6 py-4 hover:border-accent transition-colors"
        >
          <div class="flex items-center justify-between gap-4">
            <h2 class="font-display text-lg font-medium text-ink">{project.name}</h2>
            <span class="text-xs text-muted uppercase tracking-widest shrink-0">{project.status}</span>
          </div>
          {#if project.summary}
            <p class="text-sm text-muted mt-2">{project.summary}</p>
          {/if}
        </a>
      {/each}
    </div>
  {/if}
</main>
