<script lang="ts">
  import { loadWritings } from "$lib/utils/content";
  import SEO from "$lib/components/SEO.svelte";
  import type { WritingsByYear, WritingCollection } from "$lib/types";
  import { onMount } from 'svelte';

  let writingsByYear: WritingsByYear = {};
  let sortedYearEntries: [string, any[]][] = [];
  let totalWritings = 0;

  // Load content on component mount
  onMount(async () => {
    const writings = await loadWritings();
    totalWritings = writings.length;

    // Group writings by year
    writings.forEach(writing => {
      const year = new Date(writing.date).getFullYear();
      if (!writingsByYear[year]) {
        writingsByYear[year] = [];
      }
      writingsByYear[year].push(writing);
    });

    // Create sorted array of [year, writings] entries
    sortedYearEntries = Object.keys(writingsByYear)
      .sort((a, b) => parseInt(b) - parseInt(a)) // Sort years descending
      .map(year => [
        year,
        writingsByYear[parseInt(year)]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort writings within year
      ]);
  });

  // Format date for display
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }).toUpperCase();
  }
</script>

<SEO 
  pageKey="writing" 
  overrides={{
    title: "Writings - Ayush Jhunjhunwala",
    description: "My thoughts on technology, leadership, and building things. Notes, observations, and lessons from the trenches."
  }}
/>

<main class="container mx-auto px-4 py-8 max-w-4xl">
  <header class="mb-16 text-center">
    <h1 class="text-4xl md:text-5xl font-light mb-4">Writing</h1>
    <p class="text-gray-600 text-lg max-w-2xl mx-auto">
      Thoughts, lessons, and observations from building software and leading teams. 
      Everything from technical deep-dives to leadership reflections.
    </p>
  </header>

  <div class="space-y-12">
    {#each sortedYearEntries as [year, writings]}
      <section>
        <!-- Year Header -->
        <div class="mb-8">
          <h2 class="text-3xl md:text-4xl font-light">{year}</h2>
          <div class="w-16 h-0.5 bg-red-500 mt-2"></div>
        </div>
        
        <!-- Writings for this year -->
        <div class="space-y-6 ml-0 md:ml-8">
          {#each writings as writing}
            <article class="group">
              <a 
                href="/writing/{writing.slug}" 
                class="block hover:bg-gray-50 -mx-4 px-4 py-3 rounded-lg transition-colors"
              >
                <div class="flex flex-col md:flex-row md:items-center justify-between">
                  <div class="flex-1">
                    <h3 class="text-lg md:text-xl font-medium group-hover:text-black transition-colors mb-1">
                      {writing.title}
                    </h3>
                    <p class="text-gray-600 text-sm md:text-base leading-relaxed">
                      {writing.excerpt}
                    </p>
                  </div>
                  <div class="flex-shrink-0 mt-2 md:mt-0 md:ml-6">
                    <time class="text-sm text-gray-500 font-mono">
                      {formatDate(writing.date)}
                    </time>
                  </div>
                </div>
              </a>
            </article>
          {/each}
        </div>
      </section>
    {/each}
  </div>

  <!-- Footer -->
  <footer class="mt-16 text-center border-t border-gray-200 pt-8">
    <p class="text-gray-600">
      <strong>{totalWritings}</strong> pieces written.
      More thoughts brewing...
    </p>
  </footer>
</main>