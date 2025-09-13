<script>
  import { books } from "$lib/content/books.js";
  import SEO from "$lib/components/SEO.svelte";
  
  // Display rating as is (already formatted as "4/5", "4.5/5", etc.)
  function displayRating(rating) {
    return rating;
  }
  
  // Format date for display (already in dd.mm.yyyy format)
  function formatDate(dateString) {
    return dateString;
  }
</script>

<SEO 
  pageKey="reading" 
  overrides={{
    title: "Reading List - Ayush Jhunjhunwala",
    description: "Books I've read and recommend. Technical books, leadership guides, and personal development resources with ratings and reviews."
  }}
/>

<main class="container mx-auto px-4 py-8 max-w-4xl">
  <header class="mb-12">
    <h1 class="text-4xl md:text-5xl font-light mb-8">Reading</h1>
    
    <div class="prose prose-lg max-w-none mb-12">
      <p class="text-gray-700 leading-relaxed">
        My reading journey started as an escape from digital brain rot. Growing up watching Harry Potter movies, 
        I was curious about what I was missing in the books. That curiosity opened a door I didn't know I needed. 
        Reading became my refuge from endless scrolling and notifications – a way to engage my mind with something 
        deeper than the constant stream of online content.
      </p>
      
      <p class="text-gray-700 leading-relaxed">
        What began with wizarding adventures evolved into a love for mystery thrillers and biographies. 
        There's something compelling about unraveling a complex plot or diving into the mind of someone 
        who built something extraordinary. These genres feed different parts of my curiosity – the puzzle-solver 
        in me and the part that's always asking "how did they do that?"
      </p>
    </div>
  </header>

  <!-- Books Table -->
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="border-b border-gray-300">
          <th class="text-left py-2 pr-8 font-medium">Title</th>
          <th class="text-left py-2 pr-8 font-medium">Author</th>
          <th class="text-left py-2 pr-8 font-medium">Finished</th>
          <th class="text-left py-2 pr-4 font-medium">Rating</th>
        </tr>
      </thead>
      <tbody>
        {#each books as book}
          <tr class="border-b border-gray-200 hover:bg-gray-50">
            <td class="py-3 pr-8">
              <span class="font-medium text-gray-900">{book.title}</span>
            </td>
            <td class="py-3 pr-8 text-gray-700">{book.author}</td>
            <td class="py-3 pr-8 text-gray-600 text-sm">{formatDate(book.finishedOn)}</td>
            <td class="py-3 pr-4 text-gray-700">
              {displayRating(book.rating)}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- Stats Section -->
  <footer class="mt-12 pt-8 border-t border-gray-200">
    <p class="text-gray-600 text-sm">
      <strong>{books.length}</strong> books read and counting...
    </p>
  </footer>
</main>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>