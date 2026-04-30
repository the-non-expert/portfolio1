<script lang="ts">
  import SEO from "$lib/components/SEO.svelte";
  import type { Writing, DateFormatter } from "$lib/types";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: writing = data.writing as Writing;

  const formatDate: DateFormatter = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
</script>

<SEO
  pageKey="writing"
  overrides={{
    title: `${writing.title} - Writing by Ayush Jhunjhunwala`,
    description: writing.excerpt,
    canonical: `/writing/${writing.slug}`
  }}
/>

<main class="max-w-5xl mx-auto px-4 md:px-6 py-12">
  <header class="mb-12">
    <nav class="mb-8">
      <a href="/writing" class="text-sm text-muted hover:text-ink transition-colors">← Back to writing</a>
    </nav>

    <h1 class="font-display text-3xl md:text-5xl font-bold text-ink mb-4 leading-tight">
      {writing.title}
    </h1>

    <time class="text-xs text-muted">{formatDate(writing.date)}</time>
  </header>

  <article class="prose prose-lg max-w-none text-ink leading-relaxed">
    {#if typeof writing.content === 'string'}
      {@html writing.content}
    {:else}
      <svelte:component this={writing.content} />
    {/if}
  </article>

  <footer class="mt-16 pt-8 border-t border-stroke">
    <div class="flex justify-between items-center">
      <a href="/writing" class="text-sm text-muted hover:text-ink transition-colors">← All writing</a>
      <div class="text-right">
        <p class="text-xs text-muted mb-1">Enjoyed this piece?</p>
        <a href="/contact" class="text-sm font-medium text-ink hover:text-accent transition-colors">
          Let's discuss it →
        </a>
      </div>
    </div>
  </footer>
</main>

<style>
  :global(.prose h1) { @apply font-display text-3xl md:text-4xl font-bold text-ink mb-6 mt-8; }
  :global(.prose h2) { @apply font-display text-2xl md:text-3xl font-semibold text-ink mb-4 mt-8; }
  :global(.prose h3) { @apply font-display text-xl md:text-2xl font-semibold text-ink mb-3 mt-6; }
  :global(.prose p)  { @apply mb-4 leading-relaxed text-base text-ink; }
  :global(.prose ul) { @apply mb-4 ml-6; }
  :global(.prose li) { @apply mb-2 list-disc text-ink; }
  :global(.prose strong) { @apply font-semibold text-ink; }
  :global(.prose code) { @apply bg-surface px-2 py-0.5 rounded text-sm text-ink; }
</style>
