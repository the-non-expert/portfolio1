<script lang="ts">
  import { formatCurrency, formatDate } from "$lib/utils/crmDisplay";
  import InvoicePreviewModal from "$lib/crm/InvoicePreviewModal.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let previewInvoiceId: string | null = null;
  let showPendingList = false;
  let pendingMenuEl: HTMLElement;

  function openPendingInvoices() {
    if (data.pendingInvoices.length === 1) {
      previewInvoiceId = data.pendingInvoices[0].id;
    } else if (data.pendingInvoices.length > 1) {
      showPendingList = !showPendingList;
    }
  }

  function openInvoice(id: string) {
    previewInvoiceId = id;
    showPendingList = false;
  }

  function onBodyClick(e: MouseEvent) {
    if (pendingMenuEl && !pendingMenuEl.contains(e.target as Node)) showPendingList = false;
  }
</script>

<svelte:window on:keydown={(e) => e.key === "Escape" && (showPendingList = false)} />

<svelte:body on:click={onBodyClick} />

<main class="max-w-5xl mx-auto px-4 md:px-6 py-12">
  <div class="flex items-center justify-between gap-4 mb-8 flex-wrap">
    <div>
      <h1 class="font-display text-2xl font-semibold text-ink mb-1">Dashboard</h1>
      <p class="text-sm text-muted">
        {data.projects.length} project{data.projects.length === 1 ? "" : "s"} on the books.
        {#if data.pendingInvoiceCount > 0}
          &middot;
          <span class="relative inline-block" bind:this={pendingMenuEl}>
            <button type="button" on:click={openPendingInvoices} class="text-warn hover:underline">
              {formatCurrency(data.pendingInvoiceTotal)} pending across {data.pendingInvoiceCount} invoice{data.pendingInvoiceCount === 1 ? "" : "s"}
            </button>

            {#if showPendingList}
              <div
                role="menu"
                class="absolute left-0 top-full mt-2 z-30 w-72 bg-surface border border-stroke-strong rounded-xl shadow-pop py-1.5 text-left"
              >
                {#each data.pendingInvoices as inv}
                  <button
                    type="button"
                    role="menuitem"
                    on:click={() => openInvoice(inv.id)}
                    class="w-full flex items-center justify-between gap-3 px-3.5 py-2 text-xs hover:bg-bg transition-colors"
                  >
                    <span class="text-ink truncate">{inv.projectName}</span>
                    <span class="text-muted shrink-0 tabular-nums">{formatCurrency(inv.total)}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </span>
        {/if}
      </p>
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
        <div
          class="relative bg-surface border border-stroke rounded-xl px-6 py-4 hover:border-accent transition-colors {project.archived ? 'opacity-60' : ''}"
        >
          <a href={`/crm/admin/projects/${project.slug}`} class="absolute inset-0 rounded-xl" aria-label={project.name}></a>

          <div class="relative flex items-center justify-between gap-4 pointer-events-none">
            <div class="min-w-0">
              <h2 class="font-display text-lg font-medium text-ink">{project.name}</h2>
              <p class="text-sm text-muted mt-0.5">
                {project.client_name} &middot; {project.client_email}
              </p>
            </div>
            <span class="text-xs text-muted uppercase tracking-widest shrink-0">
              {project.archived ? "Archived" : project.status}
            </span>
          </div>

          <div class="relative flex items-center gap-x-4 gap-y-1.5 flex-wrap mt-3 text-xs text-muted">
            {#if project.last_entry_at}
              <span class="pointer-events-none">Updated {formatDate(project.last_entry_at.slice(0, 10))}</span>
            {/if}
            <span class="pointer-events-none">{project.entry_count} {project.entry_count === 1 ? "entry" : "entries"}</span>
            {#if project.meetingCount > 0}
              <span class="pointer-events-none">{project.meetingCount} meeting{project.meetingCount === 1 ? "" : "s"}</span>
            {/if}
            {#if project.openCount > 0}
              <span class="text-accent pointer-events-none">{project.openCount} open</span>
            {/if}
            {#if project.invoiceBadge}
              <a
                href={`/crm/admin/projects/${project.slug}/invoices`}
                class="relative rounded-full px-2.5 py-0.5 hover:underline {project.invoiceBadge.kind === 'pending' ? 'bg-warn-soft text-warn' : 'bg-good-soft text-good'}"
              >
                {project.invoiceBadge.text}{project.invoiceBadge.date ? ` ${formatDate(project.invoiceBadge.date)}` : ""}
              </a>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>

{#if previewInvoiceId}
  <InvoicePreviewModal invoiceId={previewInvoiceId} on:close={() => (previewInvoiceId = null)} />
{/if}
