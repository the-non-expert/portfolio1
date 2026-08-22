<script lang="ts">
  import { enhance } from "$app/forms";
  import { ENTRY_TYPES, ENTRY_TYPE_LABELS } from "$lib/utils/crmDisplay";
  import Drawer from "./Drawer.svelte";
  import Spinner from "./Spinner.svelte";

  export let billingType: "hourly" | "flat" | null = null;
  export let rate: number | null = null;
  export let open = false;

  let submitting = false;
  let entryType = "meeting_note";
  let isPeriod = false;
  $: showDueDate = entryType === "deadline" || entryType === "action_item";
  $: showStatus = entryType === "action_item";
  $: showHours = entryType === "action_item" && billingType === "hourly";
  $: showAmount = entryType === "action_item" && billingType === "flat";
  $: showPeriodToggle = entryType === "action_item";

  const today = new Date().toISOString().slice(0, 10);
</script>

<button
  type="button"
  on:click={() => (open = true)}
  class="shrink-0 border border-stroke-strong rounded-full px-4 py-1.5 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
>
  Add an entry
</button>

{#if open}
  <Drawer title="Add an entry" on:close={() => (open = false)}>
    <form
      method="POST"
      action="?/addEntry"
      use:enhance={() => {
        submitting = true;
        return async ({ update }) => {
          await update();
          submitting = false;
          open = false;
        };
      }}
      class="space-y-5"
    >
      <div class="flex flex-col gap-1.5">
        <label for="entry_type" class="text-sm font-medium text-ink">Type</label>
        <select
          id="entry_type"
          name="entry_type"
          bind:value={entryType}
          class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
        >
          {#each ENTRY_TYPES as type}
            <option value={type}>{ENTRY_TYPE_LABELS[type]}</option>
          {/each}
        </select>
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="title" class="text-sm font-medium text-ink">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="e.g. Kickoff call recap"
          class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
          required
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="entry_date" class="text-sm font-medium text-ink">{isPeriod ? "From" : "Date"}</label>
        <input
          id="entry_date"
          name="entry_date"
          type="date"
          value={today}
          class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {#if showPeriodToggle}
        <label class="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="is_period" bind:checked={isPeriod} class="accent-accent" />
          This covers a period, not a single date
        </label>

        {#if isPeriod}
          <div class="flex flex-col gap-1.5">
            <label for="period_end" class="text-sm font-medium text-ink">
              Through <span class="text-muted font-normal">(optional — leave blank if still ongoing)</span>
            </label>
            <input
              id="period_end"
              name="period_end"
              type="date"
              class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        {/if}
      {/if}

      <div class="flex flex-col gap-1.5">
        <label for="body" class="text-sm font-medium text-ink">Notes <span class="text-muted font-normal">(optional)</span></label>
        <textarea
          id="body"
          name="body"
          rows="4"
          class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
        ></textarea>
      </div>

      {#if showDueDate}
        <div class="flex flex-col gap-1.5">
          <label for="due_date" class="text-sm font-medium text-ink">Due date</label>
          <input
            id="due_date"
            name="due_date"
            type="date"
            class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      {/if}

      {#if showStatus}
        <div class="flex flex-col gap-1.5">
          <label for="status" class="text-sm font-medium text-ink">Status</label>
          <select
            id="status"
            name="status"
            class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
          >
            <option value="open">Open</option>
            <option value="done">Done</option>
          </select>
        </div>
      {/if}

      {#if showHours}
        <div class="flex flex-col gap-1.5">
          <label for="hours" class="text-sm font-medium text-ink">
            Hours {rate ? `(× ₹${rate}/hr)` : ""}
          </label>
          <input
            id="hours"
            name="hours"
            type="number"
            min="0"
            step="0.25"
            class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      {/if}

      {#if showAmount}
        <div class="flex flex-col gap-1.5">
          <label for="amount" class="text-sm font-medium text-ink">Amount (₹) <span class="text-muted font-normal">(for invoicing)</span></label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0"
            step="0.01"
            class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      {/if}

      <label class="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" name="visible_to_client" checked class="accent-accent" />
        Visible to client
      </label>

      <button
        type="submit"
        disabled={submitting}
        class="bg-ink text-bg px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {#if submitting}<Spinner class="w-4 h-4" />{/if}
        Add entry
      </button>
    </form>
  </Drawer>
{/if}
