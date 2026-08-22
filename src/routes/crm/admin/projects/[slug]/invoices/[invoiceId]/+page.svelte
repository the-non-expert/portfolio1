<script lang="ts">
  import { enhance } from "$app/forms";
  import { invoiceStatusLabel } from "$lib/utils/crmInvoice";
  import InvoiceSheet from "$lib/crm/InvoiceSheet.svelte";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;

  let updating = false;

  function statusClass(status: string): string {
    if (status === "paid") return "bg-good-soft text-good";
    if (status === "void") return "bg-stroke text-muted";
    return "bg-warn-soft text-warn";
  }

  function print() {
    window.print();
  }
</script>

<svelte:head>
  <title>{data.invoice.invoice_number ? `Invoice #${data.invoice.invoice_number}` : "Invoice"}</title>
  <!-- Defining any @page margin box (here, @bottom-center) suppresses
       Chrome's own default print header/footer entirely on its own — no
       need to stay under an undocumented margin threshold for that anymore.
       counter(page)/counter(pages) are the browser's own real pagination
       count, computed from whatever actually rendered — accurate by
       construction, not something we have to track ourselves. Multi-page
       overflow itself is handled by print:break-inside-avoid on each
       section in InvoiceSheet — a section that doesn't fit moves to the
       next page as a whole unit instead of being cut mid-way. -->
  <style>
    @page {
      size: A4;
      margin: 12mm 12mm 16mm 12mm;

      @bottom-center {
        content: "Page " counter(page) " of " counter(pages);
        font-family: "Lato", system-ui, sans-serif;
        font-size: 8pt;
        color: #999999;
      }
    }
  </style>
</svelte:head>

<div class="min-h-screen bg-white text-[#1a1a1a]">
  <div class="print:hidden max-w-3xl mx-auto px-4 md:px-6 pt-8 flex items-center justify-between gap-4 flex-wrap">
    <a href={`/crm/admin/projects/${data.project?.slug}/invoices`} class="text-sm text-[#777] hover:text-[#1a1a1a]">
      &larr; Invoices
    </a>
    <div class="flex items-center gap-3 flex-wrap">
      <span class="text-xs uppercase tracking-widest rounded-full px-2.5 py-1 {statusClass(data.invoice.status)}">
        {invoiceStatusLabel(data.invoice.status)}
      </span>
      {#if data.invoice.status !== "void"}
        <form
          method="POST"
          action="?/markStatus"
          use:enhance={() => {
            updating = true;
            return async ({ update }) => {
              await update();
              updating = false;
            };
          }}
        >
          <input type="hidden" name="status" value={data.invoice.status === "paid" ? "pending" : "paid"} />
          <button
            type="submit"
            disabled={updating}
            class="text-sm text-[#555] hover:text-[#1a1a1a] border border-[#ccc] rounded-full px-3 py-1.5 disabled:opacity-60"
          >
            Mark {data.invoice.status === "paid" ? "pending" : "paid"}
          </button>
        </form>
        <form
          method="POST"
          action="?/markStatus"
          use:enhance={() => {
            updating = true;
            return async ({ update }) => {
              await update();
              updating = false;
            };
          }}
        >
          <input type="hidden" name="status" value="void" />
          <button type="submit" disabled={updating} class="text-sm text-[#999] hover:text-[#c13b2a] disabled:opacity-60">
            Void
          </button>
        </form>
      {/if}
      <button
        type="button"
        on:click={print}
        class="bg-[#1a1a1a] text-white px-4 py-1.5 rounded-full text-sm hover:bg-[#333] transition-colors"
      >
        Print / Save as PDF
      </button>
    </div>
  </div>

  {#if form?.error}
    <div class="print:hidden max-w-3xl mx-auto px-4 md:px-6 mt-4">
      <div class="px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-sm text-red-700">{form.error}</div>
    </div>
  {/if}

  <div class="my-8 print:my-0">
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
      miscSectionLabel={data.invoice.misc_section_label}
      payee={data.payee}
    />
  </div>
</div>
