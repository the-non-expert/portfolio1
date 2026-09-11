<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import { fade, fly } from "svelte/transition";
  import InvoiceSheet from "./InvoiceSheet.svelte";
  import Spinner from "./Spinner.svelte";

  export let invoiceId: string;

  const dispatch = createEventDispatcher();

  type Item = {
    description: string;
    date: string | null;
    hours: number | null;
    rate: number | null;
    amount: number;
    isPeriod?: boolean;
    periodEnd?: string | null;
  };
  type Payee = {
    name: string;
    address: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    ifsc: string;
    upi: string;
    phone: string;
    website: string;
  };

  let loading = true;
  let loadError = "";
  let data: {
    invoice: {
      id: string;
      invoice_number: number | null;
      issue_date: string;
      due_date: string | null;
      bill_to: string;
      payee_override: string | null;
      subtotal: number;
      total: number;
      notes: string | null;
      show_rate: boolean;
      show_dates: boolean;
      misc_section_label: string | null;
    };
    items: Item[];
    project: { name: string; slug: string } | null;
    supersedesInvoiceNumber: number | null;
    payee: Payee;
  } | null = null;

  function close() {
    dispatch("close");
  }
  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") close();
  }

  async function loadInvoice() {
    try {
      const res = await fetch(`/crm/admin/api/invoices/${invoiceId}`);
      if (!res.ok) throw new Error("Could not load that invoice.");
      data = await res.json();
    } catch {
      loadError = "Could not load that invoice.";
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    document.body.style.overflow = "hidden";
    loadInvoice();
  });
  onDestroy(() => {
    document.body.style.overflow = "";
  });
</script>

<svelte:window on:keydown={onKeydown} />

<div class="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-0 sm:p-6 overflow-y-auto">
  <button
    type="button"
    class="fixed inset-0 bg-ink opacity-40"
    on:click={close}
    aria-label="Close"
    transition:fade={{ duration: 200 }}
  ></button>

  <div
    role="dialog"
    aria-modal="true"
    aria-label="Invoice preview"
    class="relative bg-bg w-full sm:max-w-3xl sm:rounded-2xl shadow-pop my-0 sm:my-8"
    transition:fly={{ y: 24, duration: 250 }}
  >
    <div class="print:hidden sticky top-0 z-10 flex items-center justify-between gap-4 px-4 sm:px-6 py-3 bg-bg border-b border-stroke sm:rounded-t-2xl">
      {#if data?.project}
        <a
          href={`/crm/admin/projects/${data.project.slug}/invoices/${invoiceId}`}
          class="text-sm text-muted hover:text-ink"
        >
          View full invoice &rarr;
        </a>
      {:else}
        <span></span>
      {/if}
      <button
        type="button"
        on:click={close}
        aria-label="Close"
        class="text-muted hover:text-ink w-7 h-7 rounded-lg hover:bg-surface flex items-center justify-center shrink-0"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="p-4 sm:p-6">
      {#if loading}
        <div class="flex items-center justify-center py-24 text-muted">
          <Spinner class="w-6 h-6" />
        </div>
      {:else if loadError || !data}
        <p class="text-sm text-muted py-24 text-center">{loadError || "Could not load that invoice."}</p>
      {:else}
        <InvoiceSheet
          invoiceNumber={data.invoice.invoice_number}
          issueDate={data.invoice.issue_date}
          dueDate={data.invoice.due_date}
          billTo={data.invoice.bill_to}
          items={data.items}
          subtotal={data.invoice.subtotal}
          total={data.invoice.total}
          notes={data.invoice.notes}
          showRate={data.invoice.show_rate}
          showDates={data.invoice.show_dates}
          miscSectionLabel={data.invoice.misc_section_label}
          payeeOverride={data.invoice.payee_override}
          payee={data.payee}
          supersedesInvoiceNumber={data.supersedesInvoiceNumber}
        />
      {/if}
    </div>
  </div>
</div>
