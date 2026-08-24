<script lang="ts">
  import { enhance } from "$app/forms";
  import { formatCurrency, formatDate, one } from "$lib/utils/crmDisplay";
  import Spinner from "$lib/crm/Spinner.svelte";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;

  let submitting = false;
  let settledAmount = "";
  let voidOriginal = true;

  $: client = one(data.project?.clients);
  $: adjustment = settledAmount ? Math.round((Number(settledAmount) - Number(data.invoice.subtotal)) * 100) / 100 : 0;
</script>

<main class="max-w-2xl mx-auto px-4 md:px-6 py-12">
  <div class="mb-8">
    <a
      href={`/crm/admin/projects/${data.project?.slug}/invoices/${data.invoice.id}`}
      class="text-sm text-muted hover:text-ink"
    >
      &larr; {data.invoice.invoice_number ? `Invoice #${data.invoice.invoice_number}` : "Invoice"}
    </a>
    <h1 class="font-display text-2xl md:text-3xl font-semibold text-ink mt-2">Negotiate</h1>
    <p class="text-base text-muted mt-1">{data.project?.name} &middot; {client?.full_name}</p>
  </div>

  {#if form?.error}
    <div class="mb-6 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-sm text-red-700">
      {form.error}
    </div>
  {/if}

  <div class="bg-surface border border-stroke rounded-xl px-6 py-4 mb-8">
    <p class="text-xs uppercase tracking-widest text-muted mb-1">Original invoice</p>
    <div class="flex items-center justify-between gap-4">
      <span class="font-display text-lg font-medium text-ink">
        {data.invoice.invoice_number ? `Invoice #${data.invoice.invoice_number}` : "Invoice"}
      </span>
      <span class="text-base text-ink tabular-nums">{formatCurrency(data.invoice.total)}</span>
    </div>
    <p class="text-sm text-muted mt-1">{formatDate(data.invoice.issue_date)} &middot; {data.items.length} line item{data.items.length === 1 ? "" : "s"}</p>
  </div>

  <form
    method="POST"
    action="?/negotiate"
    use:enhance={() => {
      submitting = true;
      return async ({ update }) => {
        await update();
        submitting = false;
      };
    }}
    class="space-y-6"
  >
    <div class="flex flex-col gap-1.5">
      <label for="settled_amount" class="text-sm font-medium text-ink">Settled price</label>
      <div class="flex items-center gap-2 max-w-xs">
        <span class="text-muted">₹</span>
        <input
          id="settled_amount"
          name="settled_amount"
          type="number"
          min="0"
          step="0.01"
          bind:value={settledAmount}
          placeholder={String(data.invoice.total)}
          required
          class="w-full bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
        />
      </div>
      {#if settledAmount && adjustment !== 0}
        <p class="text-xs text-muted">
          {adjustment > 0 ? "+" : ""}{formatCurrency(adjustment)} vs. the original subtotal — shown on the new invoice as a
          "Negotiated adjustment" line.
        </p>
      {/if}
    </div>

    <p class="text-sm text-muted">
      Invoice #{data.nextInvoiceNumber} will be created with the same line items as Invoice #{data.invoice.invoice_number},
      plus the adjustment above, for a total of {settledAmount ? formatCurrency(Number(settledAmount)) : "—"}.
    </p>

    <label class="flex items-center gap-2 text-sm text-ink">
      <input type="checkbox" name="void_original" bind:checked={voidOriginal} class="accent-accent" />
      Mark Invoice #{data.invoice.invoice_number} as void
    </label>

    <button
      type="submit"
      disabled={submitting}
      class="bg-ink text-bg px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {#if submitting}<Spinner class="w-4 h-4" />{/if}
      Create negotiated invoice
    </button>
  </form>
</main>
