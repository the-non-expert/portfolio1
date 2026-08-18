<script lang="ts">
  import EntryTimeline from "$lib/crm/EntryTimeline.svelte";
  import LogMeetingForm from "$lib/crm/LogMeetingForm.svelte";
  import AddEntryForm from "$lib/crm/AddEntryForm.svelte";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;
</script>

<main class="max-w-5xl mx-auto px-4 md:px-6 py-12">
  <div class="mb-8">
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <h1 class="font-display text-2xl md:text-3xl font-semibold text-ink">{data.project.name}</h1>
      <div class="flex items-center gap-3 flex-wrap">
        <LogMeetingForm />
        <AddEntryForm billingType={data.project.billing_type} rate={data.project.rate} />
        <span class="text-sm text-muted uppercase tracking-widest">{data.project.status}</span>
      </div>
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

  <!-- Timeline -->
  <EntryTimeline
    entries={data.entries}
    canEdit={true}
    viewerType="admin"
    projectCreatedAt={data.project.created_at}
    emptyMessage="No entries yet."
    billingType={data.project.billing_type}
    rate={data.project.rate}
  />
</main>
