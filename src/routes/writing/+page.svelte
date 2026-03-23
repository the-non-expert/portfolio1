<script lang="ts">
  import { loadWritings } from "$lib/utils/content";
  import SEO from "$lib/components/SEO.svelte";
  import type { WritingsByYear } from "$lib/types";
  import { onMount } from 'svelte';

  let writingsByYear: WritingsByYear = {};
  let sortedYearEntries: [string, any[]][] = [];
  let totalWritings = 0;

  onMount(async () => {
    const writings = await loadWritings();
    totalWritings = writings.length;

    writings.forEach(writing => {
      const year = new Date(writing.date).getFullYear();
      if (!writingsByYear[year]) writingsByYear[year] = [];
      writingsByYear[year].push(writing);
    });

    sortedYearEntries = Object.keys(writingsByYear)
      .sort((a, b) => parseInt(b) - parseInt(a))
      .map(year => [
        year,
        writingsByYear[parseInt(year)]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      ]);
  });

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  }
</script>

<SEO
  pageKey="writing"
  overrides={{
    title: "Writings - Ayush Jhunjhunwala",
    description: "My thoughts on technology, leadership, and building things. Notes, observations, and lessons from the trenches."
  }}
/>

<main class="max-w-5xl mx-auto px-4 md:px-6 py-12">

  <header class="mb-14 border-b border-stroke pb-10">
    <h1 class="font-display text-4xl font-bold text-ink mb-3">Writing</h1>
    <p class="text-base text-muted max-w-xl">
      Thoughts, lessons, and observations from building software and leading teams.
    </p>
  </header>

  <div class="space-y-14">
    {#each sortedYearEntries as [year, writings]}
      <section>
        <div class="mb-6 flex items-center gap-4">
          <h2 class="font-display text-2xl font-bold text-ink">{year}</h2>
          <div class="w-10 h-0.5 bg-accent"></div>
        </div>

        <div class="space-y-1">
          {#each writings as writing}
            <article>
              <a
                href="/writing/{writing.slug}"
                class="flex flex-col md:flex-row md:items-center justify-between -mx-4 px-4 py-3 rounded-lg hover:bg-surface transition-colors group"
              >
                <div class="flex-1">
                  <h3 class="text-base font-medium text-ink group-hover:text-accent transition-colors">
                    {writing.title}
                  </h3>
                  <p class="text-sm text-muted mt-0.5 leading-relaxed">{writing.excerpt}</p>
                </div>
                <time class="text-xs text-muted mt-1 md:mt-0 md:ml-8 shrink-0">
                  {formatDate(writing.date)}
                </time>
              </a>
            </article>
          {/each}
        </div>
      </section>
    {/each}
  </div>

  <footer class="mt-16 pt-8 border-t border-stroke">
    <p class="text-sm text-muted">
      <strong class="text-ink">{totalWritings}</strong> pieces written. More thoughts brewing.
    </p>
  </footer>

</main>
