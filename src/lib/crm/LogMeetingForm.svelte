<script lang="ts">
  import { enhance } from "$app/forms";
  import Drawer from "./Drawer.svelte";

  export let open = false;

  const today = new Date().toISOString().slice(0, 10);
</script>

<button
  type="button"
  on:click={() => (open = true)}
  class="shrink-0 border border-stroke-strong rounded-full px-4 py-1.5 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
>
  Log a meeting
</button>

{#if open}
  <Drawer title="Log a meeting" on:close={() => (open = false)}>
    <form
      method="POST"
      action="?/logMeeting"
      use:enhance={() => {
        return async ({ update }) => {
          await update();
          open = false;
        };
      }}
      class="space-y-5"
    >
      <div class="flex flex-col gap-1.5">
        <label for="meeting_entry_date" class="text-sm font-medium text-ink">Date</label>
        <input
          id="meeting_entry_date"
          name="entry_date"
          type="date"
          value={today}
          class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="meeting_title" class="text-sm font-medium text-ink">Title <span class="text-muted font-normal">(optional)</span></label>
        <input
          id="meeting_title"
          name="title"
          type="text"
          placeholder="Meeting"
          class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="meeting_body" class="text-sm font-medium text-ink">What was discussed</label>
        <textarea
          id="meeting_body"
          name="body"
          rows="5"
          placeholder="What was requested, and what we agreed on..."
          class="bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        class="bg-ink text-bg px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors duration-300"
      >
        Log meeting
      </button>
    </form>
  </Drawer>
{/if}
