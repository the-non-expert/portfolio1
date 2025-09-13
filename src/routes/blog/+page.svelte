<script lang="ts">
  import { blogs, getBlogsByCategory } from "$lib/content/blogs.js";
  import SEO from "$lib/components/SEO.svelte";
  import type { Blog, BlogCollection, BlogsByCategory } from "$lib/types.js";
  
  // Sort blogs by date (newest first)
  $: sortedBlogs = blogs.sort((a: Blog, b: Blog) => new Date(b.date).getTime() - new Date(a.date).getTime());
  $: blogsByCategory = getBlogsByCategory();
  $: categories = Object.keys(blogsByCategory);
  
  let selectedCategory: string = 'All';
  
  // Filter blogs based on selected category
  $: filteredBlogs = selectedCategory === 'All' 
    ? sortedBlogs 
    : sortedBlogs.filter((blog: Blog) => blog.category === selectedCategory);
  
  // Format date for display
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
</script>

<SEO 
  pageKey="blog" 
  overrides={{
    title: "Blog - Ayush Jhunjhunwala",
    description: "In-depth articles on software engineering, technical leadership, and building scalable systems. Learn from real-world experiences and practical insights."
  }}
/>

<main class="container mx-auto px-4 py-8 max-w-6xl">
  <header class="mb-12 text-center">
    <h1 class="text-4xl md:text-5xl font-light mb-4">Blog</h1>
    <p class="text-gray-600 text-lg max-w-2xl mx-auto">
      In-depth articles on software engineering, technical leadership, and lessons learned from building production systems.
    </p>
  </header>

  <!-- Category Filter -->
  <div class="mb-8 flex flex-wrap justify-center gap-2">
    <button 
      class="px-4 py-2 rounded-full text-sm font-medium transition-colors {selectedCategory === 'All' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
      on:click={() => selectedCategory = 'All'}
    >
      All ({blogs.length})
    </button>
    {#each categories as category}
      <button 
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors {selectedCategory === category ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
        on:click={() => selectedCategory = category}
      >
        {category} ({blogsByCategory[category].length})
      </button>
    {/each}
  </div>

  <!-- Blog Posts Grid -->
  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {#each filteredBlogs as blog}
      <article class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
        <a href="/blog/{blog.slug}" class="block">
          <!-- Featured Image -->
          <div class="aspect-video bg-gray-200 flex items-center justify-center">
            <div class="text-gray-400 text-center">
              <div class="text-3xl mb-2">📝</div>
              <div class="text-xs">Featured Image</div>
            </div>
          </div>
          
          <!-- Content -->
          <div class="p-6">
            <!-- Category and Reading Time -->
            <div class="flex items-center justify-between mb-3">
              <span class="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                {blog.category}
              </span>
              <span class="text-xs text-gray-500">{blog.readingTime}</span>
            </div>
            
            <!-- Title -->
            <h2 class="font-semibold text-xl mb-3 group-hover:text-gray-700 transition-colors line-clamp-2">
              {blog.title}
            </h2>
            
            <!-- Excerpt -->
            <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {blog.excerpt}
            </p>
            
            <!-- Date -->
            <time class="text-xs text-gray-500">
              {formatDate(blog.date)}
            </time>
          </div>
        </a>
      </article>
    {/each}
  </div>

  <!-- Empty State -->
  {#if filteredBlogs.length === 0}
    <div class="text-center py-16">
      <p class="text-gray-500 text-lg">No blog posts found in this category.</p>
      <button 
        class="mt-4 text-blue-600 hover:text-blue-800 transition-colors"
        on:click={() => selectedCategory = 'All'}
      >
        View all posts
      </button>
    </div>
  {/if}

  <!-- Newsletter Signup Section -->
  <section class="mt-16 bg-gray-50 rounded-lg p-8 text-center">
    <h3 class="text-2xl font-semibold mb-4">Stay Updated</h3>
    <p class="text-gray-600 mb-6 max-w-md mx-auto">
      Get notified when I publish new articles about technology, leadership, and building great software.
    </p>
    <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input 
        type="email" 
        placeholder="your@email.com" 
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      >
      <button class="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
        Subscribe
      </button>
    </div>
  </section>

  <!-- Footer Stats -->
  <footer class="mt-16 text-center border-t border-gray-200 pt-8">
    <p class="text-gray-600">
      <strong>{blogs.length}</strong> articles published across <strong>{categories.length}</strong> categories
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
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>