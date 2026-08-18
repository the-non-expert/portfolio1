<script lang="ts">
  import CrmHeader from "$lib/crm/CrmHeader.svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<svelte:head>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="crm-theme min-h-screen bg-bg flex flex-col">
  {#if data.session}
    <CrmHeader isAdmin={data.isAdmin} email={data.email} projects={data.switcherProjects} />
  {/if}

  <div class="flex-1">
    <slot />
  </div>
</div>
