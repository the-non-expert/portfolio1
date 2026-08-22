<script lang="ts">
  import { enhance } from "$app/forms";
  import { formatCurrency, formatDate } from "$lib/utils/crmDisplay";
  import Spinner from "$lib/crm/Spinner.svelte";
  import InvoiceSheet from "$lib/crm/InvoiceSheet.svelte";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;

  let submitting = false;
  let mode: "edit" | "preview" = "edit";

  let issueDate = data.todayDate;
  let dueDate = data.defaultDueDate;
  let billTo = data.defaultBillTo;
  let payeeOverride = data.defaultPayeeOverride;
  let notes = "";
  let invoiceNumberInput = "";
  let noInvoiceNumber = false;
  let showRate = true;
  let miscSectionLabel = "";

  let items = data.billable.map((entry) => ({
    ...entry,
    checked: false,
    amount: String(entry.remaining)
  }));

  type CustomLine = { description: string; amount: string; date: string; dateTo: string };
  let customLines: CustomLine[] = [];

  function addCustomLine() {
    customLines = [...customLines, { description: "", amount: "", date: "", dateTo: "" }];
  }
  function removeCustomLine(index: number) {
    customLines = customLines.filter((_, i) => i !== index);
  }

  $: subtotal =
    items.filter((i) => i.checked).reduce((sum, i) => sum + (Number(i.amount) || 0), 0) +
    customLines.reduce((sum, c) => sum + (Number(c.amount) || 0), 0);

  $: allChecked = items.length > 0 && items.every((i) => i.checked);

  function toggleAll() {
    const next = !allChecked;
    items = items.map((i) => ({ ...i, checked: next }));
  }

  // Mirrors the server's own line-building logic so the preview is exactly
  // what gets created — a partial line back-derives hours from the amount
  // actually billed, rather than copying the entry's full hours.
  $: isHourly = data.project.billing_type === "hourly" && Number(data.project.rate) > 0;
  $: previewItems = [
    ...items
      .filter((i) => i.checked && Number(i.amount) > 0)
      .map((i) => {
        const amount = Number(i.amount) || 0;
        const hours = isHourly ? Math.round((amount / Number(data.project.rate)) * 100) / 100 : (i.hours ?? null);
        const rate = isHourly ? Number(data.project.rate) : null;
        return { description: i.title, date: i.entry_date, hours, rate, amount, isPeriod: i.is_period ?? false, periodEnd: i.period_end ?? null };
      }),
    ...customLines
      .filter((c) => c.description.trim() && Number(c.amount) > 0)
      .map((c) => ({
        description: c.description.trim(),
        date: c.date || null,
        hours: null,
        rate: null,
        amount: Number(c.amount),
        isPeriod: Boolean(c.dateTo),
        periodEnd: c.dateTo || null
      }))
  ];
  $: previewInvoiceNumber = noInvoiceNumber
    ? null
    : invoiceNumberInput.trim()
      ? Number(invoiceNumberInput)
      : data.nextInvoiceNumber;
  $: hasPeriodItems = previewItems.some((i) => i.isPeriod);
</script>

<main class="max-w-5xl mx-auto px-4 md:px-6 py-12">
  <div class="mb-8">
    <a href={`/crm/admin/projects/${data.project.slug}/invoices`} class="text-sm text-muted hover:text-ink">
      &larr; Invoices
    </a>
    <h1 class="font-display text-2xl md:text-3xl font-semibold text-ink mt-2">New invoice</h1>
    <p class="text-base text-muted mt-1">{data.project.name} &middot; {data.project.client?.full_name}</p>
  </div>

  {#if form?.error}
    <div class="mb-6 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-sm text-red-700 max-w-3xl">
      {form.error}
    </div>
  {/if}

  <div class="flex items-center gap-2 mb-6">
    <button
      type="button"
      on:click={() => (mode = "edit")}
      class="text-sm px-3 py-1.5 rounded-full border transition-colors {mode === 'edit' ? 'bg-ink text-bg border-ink' : 'border-stroke-strong text-muted hover:text-ink'}"
    >
      Edit
    </button>
    <button
      type="button"
      on:click={() => (mode = "preview")}
      class="text-sm px-3 py-1.5 rounded-full border transition-colors {mode === 'preview' ? 'bg-ink text-bg border-ink' : 'border-stroke-strong text-muted hover:text-ink'}"
    >
      Preview
    </button>
  </div>

  <form
    method="POST"
    action="?/createInvoice"
    use:enhance={() => {
      submitting = true;
      return async ({ update }) => {
        await update();
        submitting = false;
      };
    }}
    class="max-w-3xl space-y-8"
  >
    <!-- Fields stay mounted (just visually hidden) in Preview mode so every
         value keeps submitting regardless of which tab is active. -->
    <div class={mode === "edit" ? "space-y-8" : "hidden"}>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="flex flex-col gap-1.5">
          <label for="issue_date" class="text-sm font-medium text-ink">Issue date</label>
          <input
            id="issue_date"
            name="issue_date"
            type="date"
            bind:value={issueDate}
            class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="due_date" class="text-sm font-medium text-ink">Due date</label>
          <input
            id="due_date"
            name="due_date"
            type="date"
            bind:value={dueDate}
            class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="invoice_number" class="text-sm font-medium text-ink">Invoice number</label>
          <div class="flex items-center gap-2">
            <input
              id="invoice_number"
              name="invoice_number"
              type="text"
              inputmode="numeric"
              bind:value={invoiceNumberInput}
              disabled={noInvoiceNumber}
              placeholder={String(data.nextInvoiceNumber)}
              class="w-full bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
            />
          </div>
          <label class="flex items-center gap-1.5 text-xs text-muted mt-0.5">
            <input type="checkbox" name="no_invoice_number" bind:checked={noInvoiceNumber} class="accent-accent" />
            No number
          </label>
        </div>
      </div>

      <label class="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" name="show_rate" bind:checked={showRate} class="accent-accent" />
        Show hourly rate on the invoice
      </label>

      <div class="flex flex-col gap-1.5">
        <label for="bill_to" class="text-sm font-medium text-ink">Bill to</label>
        <textarea
          id="bill_to"
          name="bill_to"
          rows="3"
          bind:value={billTo}
          placeholder={"Client name\nAddress"}
          class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
          required
        ></textarea>
        <p class="text-xs text-muted">Saved to this client for next time.</p>
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="payee_override" class="text-sm font-medium text-ink">Payable to</label>
        <textarea
          id="payee_override"
          name="payee_override"
          rows="2"
          bind:value={payeeOverride}
          placeholder={"Your name\nAddress (optional)"}
          class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
          required
        ></textarea>
        <p class="text-xs text-muted">
          Shown on the invoice instead of your default name/address — clear the address line if this client
          shouldn't see it. Saved to this client for next time.
        </p>
      </div>

      <div>
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-sm font-medium text-ink">Billable work</h2>
          {#if items.length > 0}
            <button type="button" on:click={toggleAll} class="text-xs text-accent hover:text-accent-hover">
              {allChecked ? "Deselect all" : "Select all"}
            </button>
          {/if}
        </div>
        {#if items.length === 0}
          <p class="text-sm text-muted">
            Nothing left to invoice on this project — every logged action item is already fully covered by a prior invoice.
            Add a custom line below if you need one anyway.
          </p>
        {:else}
          <div class="border border-stroke rounded-xl divide-y divide-stroke overflow-hidden">
            {#each items as item (item.id)}
              <label class="flex items-center gap-3 px-4 py-3 hover:bg-surface cursor-pointer">
                <input type="checkbox" name="entry_id" value={item.id} bind:checked={item.checked} class="accent-accent shrink-0" />
                <span class="min-w-0 flex-1">
                  <span class="block text-sm text-ink truncate">{item.title}</span>
                  <span class="block text-xs text-muted">
                    {#if item.is_period}
                      {formatDate(item.entry_date)} &rarr; {item.period_end ? formatDate(item.period_end) : "ongoing"}
                    {:else}
                      {formatDate(item.entry_date)}
                    {/if}
                    {#if item.alreadyBilled > 0}&middot; {formatCurrency(item.alreadyBilled)} already invoiced, {formatCurrency(item.remaining)} left{/if}
                  </span>
                </span>
                <span class="shrink-0 flex items-center gap-1 text-sm">
                  <span class="text-muted">₹</span>
                  <input
                    type="number"
                    name={`amount_${item.id}`}
                    bind:value={item.amount}
                    min="0"
                    step="0.01"
                    disabled={!item.checked}
                    class="w-28 bg-bg border border-stroke rounded-lg px-2.5 py-1.5 text-sm text-ink text-right focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                  />
                </span>
              </label>
            {/each}
          </div>
        {/if}
      </div>

      <div>
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-sm font-medium text-ink">Custom lines <span class="text-muted font-normal">(optional)</span></h2>
          <button type="button" on:click={addCustomLine} class="text-xs text-accent hover:text-accent-hover">+ Add line</button>
        </div>
        {#if customLines.length > 0}
          <p class="text-xs text-muted mb-2">Dates are From / Through — fill in Through to make a line span a period instead of one day.</p>
          <div class="space-y-2">
            {#each customLines as line, i}
              <div class="flex items-center gap-2 flex-wrap">
                <input
                  type="text"
                  name="custom_description"
                  bind:value={line.description}
                  placeholder="Description"
                  class="flex-1 min-w-[10rem] bg-bg border border-stroke rounded-lg px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                />
                <input
                  type="date"
                  name="custom_date"
                  bind:value={line.date}
                  title="From"
                  class="w-36 bg-bg border border-stroke rounded-lg px-2.5 py-2 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
                />
                <input
                  type="date"
                  name="custom_date_to"
                  bind:value={line.dateTo}
                  title="Through (optional — fill in to make this a period line)"
                  class="w-36 bg-bg border border-stroke rounded-lg px-2.5 py-2 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
                />
                <span class="text-muted text-sm">₹</span>
                <input
                  type="number"
                  name="custom_amount"
                  bind:value={line.amount}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  class="w-28 bg-bg border border-stroke rounded-lg px-2.5 py-2 text-sm text-ink text-right placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                />
                <button type="button" on:click={() => removeCustomLine(i)} class="text-muted hover:text-accent text-sm px-1">&times;</button>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      {#if hasPeriodItems}
        <div class="flex flex-col gap-1.5">
          <label for="misc_section_label" class="text-sm font-medium text-ink">
            Section heading for period lines <span class="text-muted font-normal">(shown on the invoice)</span>
          </label>
          <input
            id="misc_section_label"
            name="misc_section_label"
            type="text"
            bind:value={miscSectionLabel}
            placeholder="Miscellaneous"
            class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      {/if}

      <div class="flex flex-col gap-1.5">
        <label for="notes" class="text-sm font-medium text-ink">Notes <span class="text-muted font-normal">(optional, internal)</span></label>
        <textarea
          id="notes"
          name="notes"
          rows="2"
          bind:value={notes}
          class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors resize-none"
        ></textarea>
      </div>
    </div>

    {#if mode === "preview"}
      <div class="-mx-4 md:-mx-6">
        <InvoiceSheet
          invoiceNumber={previewInvoiceNumber}
          {issueDate}
          {dueDate}
          {billTo}
          items={previewItems}
          {subtotal}
          total={subtotal}
          notes={notes || null}
          {showRate}
          miscSectionLabel={miscSectionLabel || null}
          {payeeOverride}
          payee={data.payee}
        />
      </div>
    {/if}

    <div class="flex items-center justify-between pt-2 border-t border-stroke">
      <span class="text-sm text-muted">Subtotal</span>
      <span class="font-display text-xl font-semibold text-ink tabular-nums">{formatCurrency(subtotal)}</span>
    </div>

    <button
      type="submit"
      disabled={submitting}
      class="bg-ink text-bg px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {#if submitting}<Spinner class="w-4 h-4" />{/if}
      Create invoice
    </button>
  </form>
</main>
