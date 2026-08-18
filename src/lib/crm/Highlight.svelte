<script lang="ts">
  import { highlightSegments } from "$lib/utils/crmDisplay";

  export let text: string;
  export let query = "";
</script>

{#each highlightSegments(text, query) as seg}
  {#if seg.match}<mark class="bg-accent-soft text-accent-hover rounded-sm">{seg.text}</mark>{:else}{seg.text}{/if}
{/each}
