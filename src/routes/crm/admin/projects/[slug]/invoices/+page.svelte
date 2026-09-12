<script lang="ts">
  import { enhance } from "$app/forms";
  import { formatCurrency, formatDate } from "$lib/utils/crmDisplay";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;

  let togglingId: string | null = null;

  function statusClass(status: string): string {
    if (status === "paid") return "bg-good-soft text-good";
    if (status === "void") return "bg-stroke text-muted";
    return "bg-warn-soft text-warn";
  }

  // Both sides of a negotiation always live in this same project-scoped
  // list, so the "negotiated from" / "superseded by" relationship is a
  // lookup into data.invoices rather than a separate query.
  $: byId = new Map(data.invoices.map((inv) => [inv.id, inv]));
  $: supersededBy = new Map(
    data.invoices.filter((inv) => inv.negotiated_from_id).map((inv) => [inv.negotiated_from_id as string, inv])
  );
</script>

<main class="max-w-5xl mx-auto px-4 md:px-6 py-12">
  <div class="mb-8">
    <a href={`/crm/admin/projects/${data.project.slug}`} class="text-sm text-muted hover:text-ink">
      &larr; {data.project.name}
    </a>
    <div class="flex items-center justify-between gap-4 flex-wrap mt-2">
      <h1 class="font-display text-2xl md:text-3xl font-semibold text-ink">Invoices</h1>
      <a
        href={`/crm/admin/projects/${data.project.slug}/invoices/new`}
        class="shrink-0 bg-ink text-bg rounded-full px-4 py-1.5 text-sm hover:bg-accent transition-colors duration-300 whitespace-nowrap"
      >
        New invoice
      </a>
    </div>
    <p class="text-base text-muted mt-1">
      {data.project.client?.full_name} &middot; {data.project.client?.email}
    </p>
  </div>

  {#if form?.error}
    <div class="mb-6 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-sm text-red-700">
      {form.error}
    </div>
  {/if}

  {#if data.invoices.length === 0}
    <p class="text-base text-muted">No invoices yet.</p>
  {:else}
    <div class="space-y-3">
      {#each data.invoices as invoice (invoice.id)}
        <div class="bg-surface border border-stroke rounded-xl px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <a href={`/crm/admin/projects/${data.project.slug}/invoices/${invoice.id}`} class="min-w-0">
            <h2 class="font-display text-lg font-medium text-ink hover:text-accent transition-colors">
              {invoice.invoice_number ? `Invoice #${invoice.invoice_number}` : "Invoice"}
            </h2>
            <p class="text-sm text-muted mt-0.5">
              {formatDate(invoice.issue_date)}
              {#if invoice.due_date}&middot; due {formatDate(invoice.due_date)}{/if}
              {#if invoice.negotiated_from_id && byId.get(invoice.negotiated_from_id)}
                &middot; negotiated from #{byId.get(invoice.negotiated_from_id)?.invoice_number}
              {/if}
              {#if supersededBy.get(invoice.id)}
                &middot; superseded by #{supersededBy.get(invoice.id)?.invoice_number}
              {/if}
            </p>
          </a>
          <div class="flex items-center gap-3 shrink-0">
            <span class="text-base text-ink tabular-nums">{formatCurrency(invoice.total)}</span>
            <form
              method="POST"
              action="?/markStatus"
              use:enhance={() => {
                togglingId = invoice.id;
                return async ({ update }) => {
                  await update();
                  togglingId = null;
                };
              }}
            >
              <input type="hidden" name="invoice_id" value={invoice.id} />
              <select
                name="status"
                value={invoice.status}
                disabled={togglingId === invoice.id}
                on:change={(e) => e.currentTarget.form?.requestSubmit()}
                class="text-xs uppercase tracking-widest rounded-full pl-2.5 pr-1.5 py-1 border-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-60 disabled:cursor-not-allowed {statusClass(invoice.status)}"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="void">Void</option>
              </select>
            </form>
            {#if invoice.status !== "void"}
              <a
                href={`/crm/admin/projects/${data.project.slug}/invoices/${invoice.id}/negotiate`}
                class="text-xs text-muted hover:text-ink px-2 py-1 rounded-lg hover:bg-bg whitespace-nowrap border border-stroke-strong"
              >
                Negotiate
              </a>
            {/if}
            <a
              href={`/crm/admin/projects/${data.project.slug}/invoices/${invoice.id}/edit`}
              class="text-xs text-muted hover:text-ink px-2 py-1 rounded-lg hover:bg-bg whitespace-nowrap border border-stroke-strong"
            >
              Edit
            </a>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>
