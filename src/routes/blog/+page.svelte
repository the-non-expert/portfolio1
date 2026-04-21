<script lang="ts">
  import SEO from "$lib/components/SEO.svelte";
  import type { Blog, BlogCollection } from "$lib/types";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: blogs = (data.blogs ?? []) as BlogCollection;
  $: blogsByCategory = (data.blogsByCategory ?? {}) as {[category: string]: Blog[]};
  $: categories = Object.keys(blogsByCategory);
  let selectedCategory: string = 'All';

  $: filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter((blog: Blog) => blog.category === selectedCategory);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
</script>

<SEO
  pageKey="blog"
  overrides={{
    title: "Blog - Ayush Jhunjhunwala",
    description: "In-depth articles on software engineering, technical leadership, and building scalable systems."
  }}
/>

<main class="max-w-5xl mx-auto px-4 md:px-6 py-12">

  <header class="mb-10 border-b border-stroke pb-10">
    <h1 class="font-display text-4xl font-bold text-ink mb-3">Blog</h1>
    <p class="text-base text-muted max-w-xl">
      In-depth articles on software engineering, technical leadership, and lessons learned from building production systems.
    </p>
  </header>

  <!-- Category Filter -->
  <div class="mb-8 flex flex-wrap gap-2">
    <button
      class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors {selectedCategory === 'All' ? 'bg-ink text-bg' : 'bg-surface text-muted border border-stroke hover:border-ink/30'}"
      on:click={() => selectedCategory = 'All'}
    >
      All ({blogs.length})
    </button>
    {#each categories as category}
      <button
        class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors {selectedCategory === category ? 'bg-ink text-bg' : 'bg-surface text-muted border border-stroke hover:border-ink/30'}"
        on:click={() => selectedCategory = category}
      >
        {category} ({blogsByCategory[category].length})
      </button>
    {/each}
  </div>

  <!-- Blog Grid -->
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each filteredBlogs as blog}
      <article class="bg-surface rounded-xl border border-stroke overflow-hidden hover:border-ink/20 transition-colors group">
        <a href="/blog/{blog.slug}" class="block">
          <div class="aspect-video bg-bg border-b border-stroke overflow-hidden">
            {#if blog.featuredImage}
              <img src={blog.featuredImage} alt={blog.title} class="w-full h-full object-cover" loading="lazy" />
            {:else}
              <div class="w-full h-full flex items-center justify-center">
                <span class="text-xs text-muted uppercase tracking-widest">No image</span>
              </div>
            {/if}
          </div>
          <div class="p-5">
            <div class="flex items-center justify-between mb-3">
              <span class="px-2 py-0.5 bg-bg text-muted border border-stroke text-xs rounded">
                {blog.category}
              </span>
              <span class="text-xs text-muted">{blog.readingTime}</span>
            </div>
            <h2 class="font-display text-lg font-semibold text-ink mb-2 group-hover:text-accent transition-colors line-clamp-2">
              {blog.title}
            </h2>
            <p class="text-sm text-muted leading-relaxed mb-4 line-clamp-3">{blog.excerpt}</p>
            <time class="text-xs text-muted">{formatDate(blog.date)}</time>
          </div>
        </a>
      </article>
    {/each}
  </div>

  <!-- Empty State -->
  {#if filteredBlogs.length === 0}
    <div class="text-center py-16">
      <p class="text-muted text-base">No posts in this category.</p>
      <button
        class="mt-4 text-accent hover:text-accent-hover transition-colors text-sm"
        on:click={() => selectedCategory = 'All'}
      >
        View all posts
      </button>
    </div>
  {/if}

  <footer class="mt-12 pt-8 border-t border-stroke">
    <p class="text-sm text-muted">
      <strong class="text-ink">{blogs.length}</strong> articles across <strong class="text-ink">{categories.length}</strong> categories
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
