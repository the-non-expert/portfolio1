<script lang="ts">
  import { page } from '$app/stores';
  import { blogs, getBlogBySlug } from "$lib/content/blogs.js";
  import SEO from "$lib/components/SEO.svelte";
  import type { Blog, BlogCollection, DateFormatter, ContentParser } from "$lib/types.js";
  
  // Find the blog post by slug
  $: blog = getBlogBySlug($page.params.slug || '');
  
  // Get other recent posts for "More Articles" section
  $: otherPosts = blogs
    .filter((b: Blog) => b.slug !== $page.params.slug)
    .sort((a: Blog, b: Blog) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  
  // Format date for display
  const formatDate: DateFormatter = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Convert content to HTML (enhanced markdown-like parsing for blog posts)
  const parseContent: ContentParser = (content: string): string => {
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl md:text-4xl font-bold mb-6 mt-8">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl md:text-3xl font-semibold mb-4 mt-8">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl md:text-2xl font-semibold mb-3 mt-6">$1</h3>')
      .replace(/^\- (.*$)/gm, '<li class="mb-2">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
      .replace(/\n\n/g, '</p><p class="mb-6">')
      .replace(/^(?!<[h|l])/gm, '<p class="mb-6">')
      .replace(/<p class="mb-6">(<[h|l])/g, '$1')
      .replace(/(<\/[h|l][^>]*>)<\/p>/g, '$1');
  }
</script>

{#if blog}
  <SEO 
    pageKey="blog" 
    overrides={{
      title: `${blog.title} - Ayush Jhunjhunwala`,
      description: blog.excerpt
    }}
  />

  <main class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- Header -->
    <header class="mb-12">
      <nav class="mb-8">
        <a 
          href="/blog" 
          class="text-gray-600 hover:text-black transition-colors text-sm font-medium"
        >
          ← Back to Blog
        </a>
      </nav>
      
      <!-- Category Badge -->
      <div class="mb-4">
        <span class="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
          {blog.category}
        </span>
      </div>
      
      <h1 class="text-3xl md:text-5xl font-bold mb-6 leading-tight">
        {blog.title}
      </h1>
      
      <div class="flex items-center gap-4 text-gray-600 text-sm mb-8">
        <time>{formatDate(blog.date)}</time>
        <span>•</span>
        <span>{blog.readingTime}</span>
      </div>
      
      <!-- Featured Image Placeholder -->
      <div class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-8">
        <div class="text-gray-400 text-center">
          <div class="text-4xl mb-2">📝</div>
          <div class="text-sm">Featured Image</div>
        </div>
      </div>
    </header>

    <!-- Content -->
    <article class="prose prose-lg max-w-none">
      <div class="text-gray-800 leading-relaxed text-lg">
        {@html parseContent(blog.content)}
      </div>
    </article>

    <!-- Article Footer -->
    <footer class="mt-16 pt-8 border-t border-gray-200">
      <!-- Share Buttons -->
      <div class="mb-8">
        <h3 class="font-semibold mb-4">Share this article</h3>
        <div class="flex gap-3">
          <a 
            href="https://twitter.com/intent/tweet?text={encodeURIComponent(blog.title)}&url={encodeURIComponent(window?.location?.href || '')}" 
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            Share on Twitter
          </a>
          <a 
            href="https://www.linkedin.com/sharing/share-offsite/?url={encodeURIComponent(window?.location?.href || '')}" 
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium"
          >
            Share on LinkedIn
          </a>
        </div>
      </div>
      
      <!-- Navigation -->
      <div class="flex justify-between items-center">
        <a 
          href="/blog" 
          class="text-gray-600 hover:text-black transition-colors text-sm font-medium"
        >
          ← All Articles
        </a>
        
        <div class="text-right">
          <p class="text-sm text-gray-600 mb-1">Questions about this post?</p>
          <a 
            href="/contact" 
            class="text-sm font-medium text-black hover:underline"
          >
            Let's discuss it →
          </a>
        </div>
      </div>
    </footer>

    <!-- More Articles Section -->
    {#if otherPosts.length > 0}
      <section class="mt-16 pt-16 border-t border-gray-200">
        <h3 class="text-2xl font-semibold mb-8">More Articles</h3>
        <div class="grid gap-6 md:grid-cols-3">
          {#each otherPosts as post}
            <article class="group">
              <a href="/blog/{post.slug}" class="block">
                <div class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <div class="text-gray-400 text-center">
                    <div class="text-2xl mb-1">📝</div>
                    <div class="text-xs">Featured Image</div>
                  </div>
                </div>
                <span class="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded mb-2">
                  {post.category}
                </span>
                <h4 class="font-semibold mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p class="text-gray-600 text-sm mb-2 line-clamp-2">
                  {post.excerpt}
                </p>
                <time class="text-xs text-gray-500">
                  {formatDate(post.date)}
                </time>
              </a>
            </article>
          {/each}
        </div>
      </section>
    {/if}
  </main>
{:else}
  <SEO 
    pageKey="blog" 
    overrides={{
      title: "Article Not Found - Ayush Jhunjhunwala",
      description: "The blog post you're looking for doesn't exist."
    }}
  />
  
  <main class="container mx-auto px-4 py-8 max-w-4xl text-center">
    <h1 class="text-4xl font-light mb-4">Article Not Found</h1>
    <p class="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
    <a 
      href="/blog" 
      class="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
    >
      Browse All Articles
    </a>
  </main>
{/if}

<style>
  :global(.prose h1) {
    @apply text-3xl md:text-4xl font-bold mb-6 mt-8;
  }
  
  :global(.prose h2) {
    @apply text-2xl md:text-3xl font-semibold mb-4 mt-8;
  }
  
  :global(.prose h3) {
    @apply text-xl md:text-2xl font-semibold mb-3 mt-6;
  }
  
  :global(.prose p) {
    @apply mb-6 leading-relaxed text-lg;
  }
  
  :global(.prose ul) {
    @apply mb-6 ml-6;
  }
  
  :global(.prose li) {
    @apply mb-2 list-disc;
  }
  
  :global(.prose strong) {
    @apply font-semibold;
  }
  
  :global(.prose code) {
    @apply bg-gray-100 px-2 py-1 rounded text-sm font-mono;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>