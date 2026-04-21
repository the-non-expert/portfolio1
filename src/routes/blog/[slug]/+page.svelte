<script lang="ts">
  import SEO from "$lib/components/SEO.svelte";
  import { generateBlogPostingSchema } from "$lib/utils/seo";
  import type { Blog, BlogCollection, DateFormatter } from "$lib/types";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: blog = data.blog as Blog;
  $: otherPosts = (data.otherPosts ?? []) as BlogCollection;
  $: blogSchema = JSON.stringify(generateBlogPostingSchema(blog));

  const formatDate: DateFormatter = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
</script>

<SEO
  pageKey="blog"
  structuredData={blogSchema}
  overrides={{
    title: `${blog.title} - Ayush Jhunjhunwala`,
    description: blog.excerpt
  }}
/>

<main class="max-w-5xl mx-auto px-4 md:px-6 py-12">
    <header class="mb-12">
      <nav class="mb-8">
        <a href="/blog" class="text-sm text-muted hover:text-ink transition-colors">← Back to blog</a>
      </nav>

      <span class="px-2 py-0.5 bg-surface text-muted border border-stroke text-xs rounded mb-4 inline-block">
        {blog.category}
      </span>

      <h1 class="font-display text-3xl md:text-5xl font-bold text-ink mb-4 leading-tight">
        {blog.title}
      </h1>

      <div class="flex items-center gap-3 text-xs text-muted mb-8">
        <time>{formatDate(blog.date)}</time>
        <span>·</span>
        <span>{blog.readingTime}</span>
      </div>

      {#if blog.featuredImage}
        <div class="aspect-video rounded-xl overflow-hidden border border-stroke mb-8">
          <img src={blog.featuredImage} alt={blog.title} class="w-full h-full object-cover" />
        </div>
      {/if}
    </header>

    <article class="prose prose-lg max-w-none text-ink leading-relaxed">
      {#if typeof blog.content === 'string'}
        {@html blog.content}
      {:else}
        <svelte:component this={blog.content} />
      {/if}
    </article>

    <footer class="mt-16 pt-8 border-t border-stroke">
      <div class="flex items-center gap-3 mb-8">
        <a
          href="https://twitter.com/intent/tweet?text={encodeURIComponent(blog.title)}&url={encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 border border-stroke text-muted text-sm rounded-full hover:border-accent hover:text-accent transition-colors"
        >
          Share on X
        </a>
        <a
          href="https://www.linkedin.com/sharing/share-offsite/?url={encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 border border-stroke text-muted text-sm rounded-full hover:border-accent hover:text-accent transition-colors"
        >
          Share on LinkedIn
        </a>
      </div>

      <div class="flex justify-between items-center">
        <a href="/blog" class="text-sm text-muted hover:text-ink transition-colors">← All articles</a>
        <div class="text-right">
          <p class="text-xs text-muted mb-1">Questions about this post?</p>
          <a href="/contact" class="text-sm font-medium text-ink hover:text-accent transition-colors">
            Let's discuss it →
          </a>
        </div>
      </div>
    </footer>

    {#if otherPosts.length > 0}
      <section class="mt-16 pt-12 border-t border-stroke">
        <h3 class="font-display text-xl font-semibold text-ink mb-8">More articles</h3>
        <div class="grid gap-6 md:grid-cols-3">
          {#each otherPosts as post}
            <article class="group">
              <a href="/blog/{post.slug}" class="block">
                <div class="aspect-video bg-surface rounded-xl flex items-center justify-center border border-stroke mb-3">
                  <span class="text-xs text-muted uppercase tracking-widest">Image</span>
                </div>
                <span class="px-2 py-0.5 bg-bg text-muted border border-stroke text-xs rounded mb-2 inline-block">
                  {post.category}
                </span>
                <h4 class="text-sm font-medium text-ink mb-1 group-hover:text-accent transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p class="text-xs text-muted mb-2 line-clamp-2">{post.excerpt}</p>
                <time class="text-xs text-muted">{formatDate(post.date)}</time>
              </a>
            </article>
          {/each}
        </div>
      </section>
    {/if}
  </main>

<style>
  :global(.prose h1) { @apply font-display text-3xl md:text-4xl font-bold text-ink mb-6 mt-8; }
  :global(.prose h2) { @apply font-display text-2xl md:text-3xl font-semibold text-ink mb-4 mt-8; }
  :global(.prose h3) { @apply font-display text-xl md:text-2xl font-semibold text-ink mb-3 mt-6; }
  :global(.prose p)  { @apply mb-6 leading-relaxed text-base text-ink; }
  :global(.prose ul) { @apply mb-6 ml-6; }
  :global(.prose li) { @apply mb-2 list-disc text-ink; }
  :global(.prose strong) { @apply font-semibold text-ink; }
  :global(.prose code) { @apply bg-surface px-2 py-0.5 rounded text-sm text-ink; }
  .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>
