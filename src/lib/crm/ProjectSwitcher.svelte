<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { tick } from "svelte";

  export let isAdmin: boolean;
  export let projects: Array<{
    slug: string;
    name: string;
    status: string;
    archived: boolean;
    clientName?: string;
  }>;

  let open = false;
  let search = "";
  let showArchived = false;
  let activeIndex = -1;
  let triggerEl: HTMLButtonElement;
  let popoverEl: HTMLDivElement;
  let searchEl: HTMLInputElement;

  $: currentSlug = $page.params.slug;
  $: current = projects.find((p) => p.slug === currentSlug);
  $: liveProjects = projects.filter((p) => !p.archived);
  $: visibleProjects = (showArchived ? projects : liveProjects).filter((p) =>
    search.trim()
      ? (p.name + " " + (p.clientName ?? "")).toLowerCase().includes(search.trim().toLowerCase())
      : true
  );
  $: showSearch = liveProjects.length > 7;
  $: groups = isAdmin
    ? Object.entries(
        visibleProjects.reduce<Record<string, typeof visibleProjects>>((acc, p) => {
          const key = p.clientName ?? "";
          (acc[key] ??= []).push(p);
          return acc;
        }, {})
      )
    : [["", visibleProjects]] as [string, typeof visibleProjects][];
  $: flatVisible = groups.flatMap(([, list]) => list);
  $: isStatic = projects.length <= 1;

  async function openSwitcher() {
    if (isStatic) return;
    open = true;
    activeIndex = flatVisible.findIndex((p) => p.slug === currentSlug);
    await tick();
    if (showSearch) searchEl?.focus();
  }

  function close() {
    open = false;
    search = "";
    activeIndex = -1;
  }

  function select(slug: string) {
    close();
    goto(isAdmin ? `/crm/admin/projects/${slug}` : `/crm/projects/${slug}`);
  }

  function onKeydown(e: KeyboardEvent) {
    if (!open) return;
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      triggerEl?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, flatVisible.length - 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = flatVisible[activeIndex];
      if (target) select(target.slug);
    }
  }

  function onWindowClick(e: MouseEvent) {
    if (!open) return;
    const target = e.target as Node;
    if (popoverEl?.contains(target) || triggerEl?.contains(target)) return;
    close();
  }
</script>

<svelte:window on:click={onWindowClick} on:keydown={onKeydown} />

<div class="relative">
  {#if isStatic}
    <div class="bg-bg border border-stroke-strong rounded-lg pl-3 pr-3 py-1.5 flex flex-col leading-tight">
      <span class="text-sm text-ink truncate max-w-[7rem] sm:max-w-[13rem]">{current?.name ?? "No project"}</span>
      {#if isAdmin && current?.clientName}
        <span class="text-xs text-muted truncate">{current.clientName}</span>
      {:else if current}
        <span class="text-xs text-muted truncate">{current.status}</span>
      {/if}
    </div>
  {:else}
    <button
      bind:this={triggerEl}
      type="button"
      on:click={openSwitcher}
      aria-haspopup="listbox"
      aria-expanded={open}
      class="bg-bg border border-stroke-strong rounded-lg pl-3 pr-2 py-1.5 flex items-center gap-2 hover:border-accent transition-colors"
    >
      <span class="flex flex-col leading-tight text-left">
        <span class="text-sm text-ink truncate max-w-[7rem] sm:max-w-[13rem]">{current?.name ?? "Select a project"}</span>
        {#if isAdmin && current?.clientName}
          <span class="text-xs text-muted truncate">{current.clientName}</span>
        {:else if current}
          <span class="text-xs text-muted truncate">{current.status}</span>
        {/if}
      </span>
      {#if current?.archived}
        <span class="rounded-full px-2 py-0.5 text-xs uppercase tracking-widest border border-stroke-strong text-muted bg-transparent shrink-0">
          Archived
        </span>
      {/if}
      <svg class="w-4 h-4 text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {#if open}
      <div
        bind:this={popoverEl}
        role="listbox"
        class="absolute left-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-surface border border-stroke-strong rounded-xl shadow-pop z-50 overflow-hidden"
      >
        {#if showSearch}
          <input
            bind:this={searchEl}
            bind:value={search}
            type="text"
            placeholder="Search projects..."
            class="w-full bg-bg border-b border-stroke px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none"
          />
        {/if}

        <div class="max-h-80 overflow-y-auto">
          {#each groups as [clientName, list]}
            {#if list.length > 0}
              {#if isAdmin && clientName}
                <p class="text-xs uppercase tracking-widest text-muted px-4 pt-3 pb-1">{clientName}</p>
              {/if}
              {#each list as project}
                {@const idx = flatVisible.indexOf(project)}
                <button
                  type="button"
                  role="option"
                  aria-selected={project.slug === currentSlug}
                  on:click={() => select(project.slug)}
                  on:mouseenter={() => (activeIndex = idx)}
                  class="w-full px-4 py-2 flex items-center gap-2 text-left transition-colors {idx === activeIndex ? 'bg-bg' : ''} {project.slug === currentSlug ? 'bg-bg' : 'hover:bg-bg'}"
                >
                  <span class="w-1.5 h-1.5 rounded-full shrink-0 {project.archived ? 'bg-muted' : 'bg-good'}" />
                  <span class="text-sm text-ink truncate flex-1 {project.archived ? 'opacity-60' : ''}">{project.name}</span>
                  {#if project.slug === currentSlug}
                    <svg class="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  {/if}
                </button>
              {/each}
            {/if}
          {/each}
          {#if flatVisible.length === 0}
            <p class="text-sm text-muted px-4 py-6 text-center">No projects found.</p>
          {/if}
        </div>

        <div class="border-t border-stroke px-4 py-2.5 flex items-center justify-between">
          <label class="flex items-center gap-2 text-xs text-muted">
            <input type="checkbox" bind:checked={showArchived} class="accent-accent" />
            Show archived
          </label>
          {#if isAdmin}
            <a href="/crm/admin/clients" class="text-xs text-accent hover:text-accent-hover">Manage clients &rarr;</a>
          {/if}
        </div>
      </div>
    {/if}
  {/if}
</div>
