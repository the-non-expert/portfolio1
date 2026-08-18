<script lang="ts">
  import { enhance } from "$app/forms";
  import { ENTRY_TYPES, ENTRY_TYPE_LABELS } from "$lib/utils/crmDisplay";
  import Drawer from "./Drawer.svelte";

  export let billingType: "hourly" | "flat" | null = null;
  export let rate: number | null = null;
  export let open = false;

  let entryType = "meeting_note";
  $: showDueDate = entryType === "deadline" || entryType === "action_item";
  $: showStatus = entryType === "action_item";
  $: showHours = entryType === "action_item" && billingType === "hourly";

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
        return async ({ update }) => {
          await update();
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
        <label for="entry_date" class="text-sm font-medium text-ink">Date</label>
        <input
          id="entry_date"
          name="entry_date"
          type="date"
          value={today}
          class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
        />
      </div>

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

      <label class="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" name="visible_to_client" checked class="accent-accent" />
        Visible to client
      </label>

      <button
        type="submit"
        class="bg-ink text-bg px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors duration-300"
      >
        Add entry
      </button>
    </form>
  </Drawer>
{/if}
