<script lang="ts">
  import { navigating } from "$app/stores";
  import CrmHeader from "$lib/crm/CrmHeader.svelte";
  import NavProgress from "$lib/crm/NavProgress.svelte";
  import RouteSkeleton from "$lib/crm/RouteSkeleton.svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  $: showSkeleton = $navigating && $navigating.type !== "form";
</script>

<svelte:head>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<NavProgress />

<div class="crm-theme min-h-screen bg-bg flex flex-col">
  {#if data.session}
    <CrmHeader isAdmin={data.isAdmin} email={data.email} projects={data.switcherProjects} />
  {/if}

  <div class="flex-1 relative">
    <slot />
    {#if showSkeleton}
      <RouteSkeleton routeId={$navigating?.to?.route.id ?? null} />
    {/if}
  </div>
</div>
