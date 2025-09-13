<script lang="ts">
  import { page } from '$app/stores';
  import { writings } from "$lib/content/writings.js";
  import SEO from "$lib/components/SEO.svelte";
  import type { Writing, DateFormatter, ContentParser } from "$lib/types.js";
  
  // Find the writing by slug
  $: writing = writings.find((w: Writing) => w.slug === $page.params.slug || '');
  
  // Format date for display
  const formatDate: DateFormatter = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Convert content to HTML (basic markdown-like parsing)
  const parseContent: ContentParser = (content: string): string => {
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl md:text-4xl font-light mb-6 mt-8">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl md:text-3xl font-medium mb-4 mt-8">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl md:text-2xl font-medium mb-3 mt-6">$1</h3>')
      .replace(/^\- (.*$)/gm, '<li class="mb-2">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(?!<[h|l])/gm, '<p class="mb-4">')
      .replace(/<p class="mb-4">(<[h|l])/g, '$1')
      .replace(/(<\/[h|l][^>]*>)<\/p>/g, '$1');
  }
</script>

{#if writing}
  <SEO 
    pageKey="writing" 
    overrides={{
      title: `${writing.title} - Writing by Ayush Jhunjhunwala`,
      description: writing.excerpt
    }}
  />

  <main class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- Header -->
    <header class="mb-12">
      <nav class="mb-8">
        <a 
          href="/writing" 
          class="text-gray-600 hover:text-black transition-colors text-sm font-medium"
        >
          ← Back to Writing
        </a>
      </nav>
      
      <h1 class="text-3xl md:text-5xl font-light mb-4 leading-tight">
        {writing.title}
      </h1>
      
      <div class="flex items-center text-gray-600 text-sm">
        <time>{formatDate(writing.date)}</time>
      </div>
    </header>

    <!-- Content -->
    <article class="prose prose-lg max-w-none">
      <div class="text-gray-700 leading-relaxed">
        {@html parseContent(writing.content)}
      </div>
    </article>

    <!-- Footer Navigation -->
    <footer class="mt-16 pt-8 border-t border-gray-200">
      <div class="flex justify-between items-center">
        <a 
          href="/writing" 
          class="text-gray-600 hover:text-black transition-colors text-sm font-medium"
        >
          ← All Writing
        </a>
        
        <div class="text-right">
          <p class="text-sm text-gray-600 mb-1">Enjoyed this piece?</p>
          <a 
            href="/contact" 
            class="text-sm font-medium text-black hover:underline"
          >
            Let's discuss it →
          </a>
        </div>
      </div>
    </footer>
  </main>
{:else}
  <SEO 
    pageKey="writing" 
    overrides={{
      title: "Writing Not Found - Ayush Jhunjhunwala",
      description: "The writing piece you're looking for doesn't exist."
    }}
  />
  
  <main class="container mx-auto px-4 py-8 max-w-4xl text-center">
    <h1 class="text-4xl font-light mb-4">Writing Not Found</h1>
    <p class="text-gray-600 mb-8">The piece you're looking for doesn't exist.</p>
    <a 
      href="/writing" 
      class="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
    >
      Browse All Writing
    </a>
  </main>
{/if}

<style>
  :global(.prose h1) {
    @apply text-3xl md:text-4xl font-light mb-6 mt-8;
  }
  
  :global(.prose h2) {
    @apply text-2xl md:text-3xl font-medium mb-4 mt-8;
  }
  
  :global(.prose h3) {
    @apply text-xl md:text-2xl font-medium mb-3 mt-6;
  }
  
  :global(.prose p) {
    @apply mb-4 leading-relaxed;
  }
  
  :global(.prose ul) {
    @apply mb-4 ml-6;
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
</style>