<script lang="ts">
  import { books } from "$lib/content/books";
  import SEO from "$lib/components/SEO.svelte";
  import type { RatingDisplay, DateFormatter } from "$lib/types";

  const displayRating: RatingDisplay = (rating: string): string => rating;
  const formatDate: DateFormatter = (dateString: string): string => dateString;
</script>

<SEO
  pageKey="reading"
  overrides={{
    title: "Reading List - Ayush Jhunjhunwala",
    description: "Books I've read and recommend. Technical books, leadership guides, and personal development resources with ratings and reviews."
  }}
/>

<main class="max-w-5xl mx-auto px-4 md:px-6 py-12">

  <header class="mb-12 border-b border-stroke pb-10 flex flex-col-reverse md:flex-row md:items-center md:gap-12 items-center md:items-start">
    <div class="space-y-4 max-w-xl mt-8 md:mt-0 text-center md:text-left">
      <h1 class="font-display text-4xl font-bold text-ink mb-6">Reading</h1>
      <p class="text-base text-muted leading-relaxed">
        My reading journey started as an escape from digital brain rot. Growing up watching Harry Potter movies,
        I was curious about what I was missing in the books. That curiosity opened a door I didn't know I needed.
        Reading became my refuge from endless scrolling and notifications – a way to engage my mind with something
        deeper than the constant stream of online content.
      </p>
      <p class="text-base text-muted leading-relaxed">
        What began with wizarding adventures evolved into a love for mystery thrillers and biographies.
        There's something compelling about unraveling a complex plot or diving into the mind of someone
        who built something extraordinary.
      </p>
    </div>
    <div class="shrink-0 md:ml-auto">
      <img src="/reading.svg" alt="Reading illustration" class="w-64 md:w-80 h-auto" />
    </div>
  </header>

  <!-- Books Table -->
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="border-b border-stroke">
          <th class="text-left py-2 pr-8 text-xs uppercase tracking-widest text-muted font-medium">Title</th>
          <th class="text-left py-2 pr-8 text-xs uppercase tracking-widest text-muted font-medium">Author</th>
          <th class="text-left py-2 pr-8 text-xs uppercase tracking-widest text-muted font-medium">Finished</th>
          <th class="text-left py-2 pr-4 text-xs uppercase tracking-widest text-muted font-medium">Rating</th>
        </tr>
      </thead>
      <tbody>
        {#each books as book}
          <tr class="border-b border-stroke hover:bg-surface transition-colors">
            <td class="py-3 pr-8">
              <span class="text-sm font-medium text-ink">{book.title}</span>
            </td>
            <td class="py-3 pr-8 text-sm text-muted">{book.author}</td>
            <td class="py-3 pr-8 text-xs text-muted">{formatDate(book.finishedOn)}</td>
            <td class="py-3 pr-4 text-sm text-muted">{displayRating(book.rating)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <footer class="mt-10 pt-8 border-t border-stroke">
    <p class="text-sm text-muted">
      <strong class="text-ink">{books.length}</strong> books read and counting.
    </p>
  </footer>

</main>
