<script lang="ts">
  export let routeId: string | null;

  const bone = "animate-pulse rounded bg-stroke";

  $: shape =
    routeId === "/crm" || routeId === "/crm/admin"
      ? "cards"
      : routeId === "/crm/admin/clients"
        ? "rows"
        : routeId === "/crm/admin/meetings"
          ? "meetings"
          : routeId === "/crm/admin/projects/[slug]" || routeId === "/crm/projects/[slug]"
            ? "timeline"
            : null;
</script>

{#if shape}
  <div class="absolute inset-0 bg-bg overflow-hidden" aria-hidden="true">
    <main class="max-w-5xl mx-auto px-4 md:px-6 py-12">
      {#if shape === "cards"}
        <div class="flex items-center justify-between gap-4 mb-8">
          <div class="space-y-2">
            <div class="{bone} h-6 w-40" />
            <div class="{bone} h-4 w-56" />
          </div>
          <div class="{bone} h-4 w-32" />
        </div>
        <div class="space-y-3">
          {#each Array(4) as _}
            <div class="bg-surface border border-stroke rounded-xl px-6 py-4 flex items-center justify-between gap-4">
              <div class="space-y-2 flex-1">
                <div class="{bone} h-5 w-1/3" />
                <div class="{bone} h-4 w-1/2" />
              </div>
              <div class="{bone} h-4 w-16 shrink-0" />
            </div>
          {/each}
        </div>
      {:else if shape === "rows"}
        <div class="flex items-center justify-between gap-4 mb-8">
          <div class="space-y-2">
            <div class="{bone} h-6 w-32" />
            <div class="{bone} h-4 w-48" />
          </div>
          <div class="{bone} h-4 w-32" />
        </div>
        <div class="border-t border-stroke-strong">
          {#each Array(6) as _}
            <div class="border-b border-stroke px-2 py-3 space-y-2">
              <div class="{bone} h-4 w-1/4" />
              <div class="{bone} h-3 w-1/3" />
            </div>
          {/each}
        </div>
      {:else if shape === "meetings"}
        <div class="flex items-center justify-between gap-4 mb-8">
          <div class="space-y-2">
            <div class="{bone} h-6 w-36" />
            <div class="{bone} h-4 w-52" />
          </div>
          <div class="{bone} h-4 w-32" />
        </div>
        <div class="max-w-3xl">
          <div class="flex items-baseline gap-3 py-2">
            <div class="{bone} h-4 w-20" />
            <span class="h-px flex-1 bg-stroke" />
          </div>
          {#each Array(3) as _}
            <div class="px-2 py-3 space-y-2">
              <div class="{bone} h-4 w-1/3" />
              <div class="{bone} h-3 w-1/2" />
            </div>
          {/each}
        </div>
      {:else if shape === "timeline"}
        <div class="mb-8 flex items-center justify-between gap-4">
          <div class="{bone} h-8 w-56" />
          <div class="flex items-center gap-3">
            <div class="{bone} h-8 w-28 rounded-full" />
            <div class="{bone} h-8 w-28 rounded-full" />
          </div>
        </div>
        <div class="{bone} h-10 w-full mb-4 rounded-xl" />
        <div class="max-w-3xl space-y-5">
          <div class="{bone} h-4 w-20" />
          {#each Array(5) as _}
            <div class="flex items-start gap-3">
              <span class="w-5 shrink-0 flex justify-center pt-1">
                <span class="w-2 h-2 rounded-full bg-stroke" />
              </span>
              <div class="{bone} h-4 flex-1 max-w-md" />
            </div>
          {/each}
        </div>
      {/if}
    </main>
  </div>
{/if}
