<script lang="ts">
  import { enhance } from "$app/forms";
  import { formatCurrency, formatDate } from "$lib/utils/crmDisplay";
  import { invoiceStatusLabel } from "$lib/utils/crmInvoice";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;

  let togglingId: string | null = null;

  function statusClass(status: string): string {
    if (status === "paid") return "bg-good-soft text-good";
    if (status === "void") return "bg-stroke text-muted";
    return "bg-warn-soft text-warn";
  }
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
    <div class="space-y-3 max-w-3xl">
      {#each data.invoices as invoice (invoice.id)}
        <div class="bg-surface border border-stroke rounded-xl px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <a href={`/crm/admin/projects/${data.project.slug}/invoices/${invoice.id}`} class="min-w-0">
            <h2 class="font-display text-lg font-medium text-ink hover:text-accent transition-colors">
              {invoice.invoice_number ? `Invoice #${invoice.invoice_number}` : "Invoice"}
            </h2>
            <p class="text-sm text-muted mt-0.5">
              {formatDate(invoice.issue_date)}
              {#if invoice.due_date}&middot; due {formatDate(invoice.due_date)}{/if}
            </p>
          </a>
          <div class="flex items-center gap-3 shrink-0">
            <span class="text-base text-ink tabular-nums">{formatCurrency(invoice.total)}</span>
            <span class="text-xs uppercase tracking-widest rounded-full px-2.5 py-1 {statusClass(invoice.status)}">
              {invoiceStatusLabel(invoice.status)}
            </span>
            <a
              href={`/crm/admin/projects/${data.project.slug}/invoices/${invoice.id}`}
              class="text-xs text-muted hover:text-ink px-2 py-1 rounded-lg hover:bg-bg whitespace-nowrap border border-stroke-strong"
            >
              Redownload
            </a>
            {#if invoice.status !== "void"}
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
                <input type="hidden" name="status" value={invoice.status === "paid" ? "pending" : "paid"} />
                <button
                  type="submit"
                  disabled={togglingId === invoice.id}
                  class="text-xs text-muted hover:text-ink px-2 py-1 rounded-lg hover:bg-bg whitespace-nowrap disabled:opacity-60"
                >
                  Mark {invoice.status === "paid" ? "pending" : "paid"}
                </button>
              </form>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>
