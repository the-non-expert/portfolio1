<script lang="ts">
  import { formatCurrency, formatDate } from "$lib/utils/crmDisplay";

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

  export let invoiceNumber: number | null;
  export let issueDate: string;
  export let dueDate: string | null;
  export let billTo: string;
  export let items: Item[];
  export let subtotal: number;
  export let total: number;
  export let notes: string | null = null;
  export let showRate = true;
  export let payee: Payee;
  export let miscSectionLabel: string | null = null;
  export let payeeOverride: string | null = null;

  // The per-row Rate column reads as noise once every line shares one
  // number — it's mentioned once below the table instead, and only when
  // every item actually agrees on it (a mixed-rate invoice just omits it,
  // rather than showing something misleading).
  $: billToLines = billTo.split("\n").filter(Boolean);
  // Older invoices predate the editable "Payable to" field — fall back to
  // the env-var default rather than requiring a backfill.
  $: payeeLines = (payeeOverride?.trim() || `${payee.name}\n${payee.address}`).split("\n").filter(Boolean);
  $: ratedItems = items.filter((i) => i.rate != null);
  $: showRateSummary =
    showRate &&
    ratedItems.length > 0 &&
    ratedItems.length === items.length &&
    ratedItems.every((i) => i.rate === ratedItems[0].rate);
  $: totalHours = items.reduce((sum, i) => sum + (i.hours ?? 0), 0);

  // A single formatter, called with different Intl options, on purpose —
  // this dev build silently drops the return value of whichever of two
  // sibling function declarations is declared *first* (order-dependent,
  // not name- or body-dependent; reproduced by swapping both). One function
  // sidesteps it entirely instead of chasing the tooling bug further.
  function formatWithOpts(dateStr: string, opts: Intl.DateTimeFormatOptions): string {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", opts);
  }

  // Work that spans a period (e.g. "Miscellaneous" small fixes across the
  // whole engagement) doesn't belong to any single calendar month — forcing
  // it into one misrepresents when the work happened. It gets pulled out
  // into its own trailing section instead of joining the month groups below.
  $: dateItems = items.filter((i) => !i.isPeriod);
  $: rangeItems = items.filter((i) => i.isPeriod);

  // A bill spanning several months reads as one undifferentiated pile of
  // work unless it's broken up — group by calendar month (in item order,
  // which already arrives chronological) with its own subtotal, and surface
  // the overall span next to the issue date so the period is obvious at a
  // glance, not something the reader has to reconstruct from 20 rows.
  type DisplayItem = Item & { displayDate: string };

  $: groupedItems = (() => {
    const groups: Array<{ key: string; label: string; items: DisplayItem[]; subtotal: number }> = [];
    for (const item of dateItems) {
      const key = item.date ? item.date.slice(0, 7) : "undated";
      let group = groups.find((g) => g.key === key);
      if (!group) {
        group = {
          key,
          label: item.date ? formatWithOpts(item.date, { month: "long", year: "numeric" }) : "Other items",
          items: [],
          subtotal: 0
        };
        groups.push(group);
      }
      // Formatted here rather than in the template — a function called from
      // inside a nested {#each} in this build silently returns undefined,
      // so every per-item display value gets computed up front instead.
      const displayDate = item.date ? formatWithOpts(item.date, { day: "numeric", month: "short" }) : "";
      group.items.push({ ...item, displayDate });
      group.subtotal += item.amount;
    }
    return groups;
  })();

  $: rangeDisplayItems = rangeItems.map((item) => {
    const from = item.date ? formatWithOpts(item.date, { day: "numeric", month: "short", year: "numeric" }) : "";
    const to = item.periodEnd
      ? formatWithOpts(item.periodEnd, { day: "numeric", month: "short", year: "numeric" })
      : "ongoing";
    return { ...item, rangeLabel: `${from} – ${to}` };
  });
  $: rangeSubtotal = rangeItems.reduce((sum, i) => sum + i.amount, 0);
  $: hasOpenEndedRange = rangeItems.some((i) => !i.periodEnd);

  // The header's "Billing period" spans every line item, dated or ranged —
  // an open-ended range still contributes its start date even with no end.
  $: allStarts = items.map((i) => i.date).filter((d): d is string => Boolean(d)).sort();
  $: allEnds = items
    .map((i) => (i.isPeriod ? (i.periodEnd ?? null) : i.date))
    .filter((d): d is string => Boolean(d))
    .sort();
  $: billingPeriodStart = allStarts[0] ?? null;
  $: billingPeriodEnd = allEnds[allEnds.length - 1] ?? billingPeriodStart;
</script>

<div
  class="invoice-sheet max-w-3xl mx-auto bg-white text-[#1a1a1a] px-10 py-10 sm:px-12 sm:py-12 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)] print:shadow-none print:max-w-none print:px-0 print:py-0"
>
  <div class="print:break-inside-avoid flex items-start justify-between gap-6">
    <h1 class="text-3xl font-bold tracking-tight">{invoiceNumber ? `INVOICE #${invoiceNumber}` : "INVOICE"}</h1>
    <img src="/images/crm-invoice/logo.png" alt="Ayush Jhunjhunwala" class="h-10 w-auto" />
  </div>

  <div class="print:break-inside-avoid grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-sm">
    <div>
      <p class="font-semibold uppercase text-xs tracking-wide text-[#666]">Invoice to:</p>
      {#each billToLines as line, i}
        <p class="{i === 0 ? 'font-semibold' : ''} leading-snug">{line}</p>
      {/each}
    </div>
    <div>
      <p class="font-semibold uppercase text-xs tracking-wide text-[#666]">Payable to:</p>
      {#each payeeLines as line, i}
        <p class="{i === 0 ? 'font-semibold' : ''} leading-snug">{line}</p>
      {/each}
    </div>
    <div class="sm:text-right">
      <p class="font-semibold uppercase text-xs tracking-wide text-[#666]">Date</p>
      <p>{issueDate ? formatDate(issueDate) : ""}</p>
      {#if billingPeriodStart}
        <p class="text-xs text-[#777] mt-2">
          Billing period<br />
          {billingPeriodStart === billingPeriodEnd
            ? formatDate(billingPeriodStart)
            : `${formatDate(billingPeriodStart)} – ${formatDate(billingPeriodEnd ?? billingPeriodStart)}`}
          {hasOpenEndedRange ? " (+ ongoing)" : ""}
        </p>
      {/if}
    </div>
  </div>

  <table class="w-full mt-8 text-sm border-collapse">
    <thead>
      <tr class="border-b border-[#ddd] text-xs uppercase tracking-wide text-[#777]">
        <th class="text-left font-medium py-2">Description</th>
        <th class="text-center font-medium py-2 w-16">Date</th>
        <th class="text-center font-medium py-2 w-14">Hours</th>
        <th class="text-right font-medium py-2 w-24">Total</th>
      </tr>
    </thead>
    {#each groupedItems as group (group.key)}
      <tbody class="print:break-inside-avoid">
        {#if groupedItems.length > 1}
          <tr>
            <td colspan="4" class="pt-4 pb-1 text-xs font-semibold uppercase tracking-wide text-[#666]">{group.label}</td>
          </tr>
        {/if}
        {#each group.items as item}
          <tr class="border-b border-[#eee]">
            <td class="py-2.5 pr-2">{item.description}</td>
            <td class="py-2.5 text-center tabular-nums text-[#777] text-xs">{item.displayDate}</td>
            <td class="py-2.5 text-center tabular-nums">{item.hours ?? ""}</td>
            <td class="py-2.5 text-right tabular-nums">{formatCurrency(item.amount)}</td>
          </tr>
        {/each}
        {#if groupedItems.length > 1}
          <tr>
            <td colspan="3" class="pt-1.5 pb-3 text-right text-xs text-[#777]">Subtotal</td>
            <td class="pt-1.5 pb-3 text-right text-xs text-[#777] tabular-nums">{formatCurrency(group.subtotal)}</td>
          </tr>
        {/if}
      </tbody>
    {/each}
    {#if rangeDisplayItems.length > 0}
      <tbody class="print:break-inside-avoid">
        <tr>
          <td colspan="4" class="pt-4 pb-1 text-xs font-semibold uppercase tracking-wide text-[#666]">
            {miscSectionLabel || "Miscellaneous"}
          </td>
        </tr>
        {#each rangeDisplayItems as item}
          <tr class="border-b border-[#eee]">
            <td class="py-2.5 pr-2">
              {item.description}
              <span class="block text-[11px] text-[#999] mt-0.5">{item.rangeLabel}</span>
            </td>
            <td class="py-2.5 text-center tabular-nums text-[#777] text-xs">—</td>
            <td class="py-2.5 text-center tabular-nums">{item.hours ?? ""}</td>
            <td class="py-2.5 text-right tabular-nums">{formatCurrency(item.amount)}</td>
          </tr>
        {/each}
        {#if groupedItems.length > 0}
          <tr>
            <td colspan="3" class="pt-1.5 pb-3 text-right text-xs text-[#777]">Subtotal</td>
            <td class="pt-1.5 pb-3 text-right text-xs text-[#777] tabular-nums">{formatCurrency(rangeSubtotal)}</td>
          </tr>
        {/if}
      </tbody>
    {/if}
  </table>

  {#if showRateSummary}
    <p class="text-right text-xs text-[#777] mt-2">
      Hourly rate {formatCurrency(ratedItems[0].rate ?? 0)} &middot; Total hours {totalHours}
    </p>
  {/if}

  <div class="print:break-inside-avoid mt-4 flex justify-end">
    <div class="w-48 text-sm">
      <div class="flex justify-between py-1 border-t border-[#ddd]">
        <span class="text-[#555]">Subtotal</span>
        <span class="tabular-nums">{formatCurrency(subtotal)}</span>
      </div>
      <div class="flex justify-between py-2 border-t-2 border-[#1a1a1a] mt-1">
        <span class="font-bold text-lg">Total</span>
        <span class="font-bold text-lg tabular-nums">{formatCurrency(total)}</span>
      </div>
      <p class="text-right text-xs text-[#777]">Inclusive of all taxes</p>
    </div>
  </div>

  <div class="print:break-inside-avoid grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 text-sm">
    <div>
      <p class="font-semibold uppercase text-xs tracking-wide mb-1">Payment terms</p>
      <p class="text-[#333] leading-relaxed">
        Payment due within 7 days of invoice date.<br />
        Please reference the invoice number with your transfer.
        {#if dueDate}<br />Due {formatDate(dueDate)}.{/if}
      </p>

      <p class="font-semibold uppercase text-xs tracking-wide mb-1 mt-6">Payment method</p>
      <p class="text-[#333] leading-relaxed">
        {payee.bankName}<br />
        <span class="font-medium">Account Name:</span> {payee.accountName}<br />
        <span class="font-medium">Account No.:</span> {payee.accountNumber}<br />
        <span class="font-medium">IFSC Code:</span> {payee.ifsc}<br />
        <span class="font-medium">UPI:</span> {payee.upi}
      </p>

      {#if notes}
        <p class="font-semibold uppercase text-xs tracking-wide mb-1 mt-6">Notes</p>
        <p class="text-[#333] leading-relaxed whitespace-pre-wrap">{notes}</p>
      {/if}

      <p class="font-semibold mt-6">Thank you for your business!</p>
    </div>

    <div class="flex sm:justify-end sm:items-start">
      <div class="text-center">
        <img src="/images/crm-invoice/payment-qr.png" alt="Payment QR code" class="w-32 h-32 object-contain mx-auto" />
        <p class="text-[10px] uppercase tracking-wide text-[#555] mt-1">{payee.accountName}</p>
      </div>
    </div>
  </div>

  <p class="text-center text-xs text-[#777] mt-10 pt-4 border-t border-[#eee]">
    {payee.phone} &middot; {payee.website}
  </p>
</div>
