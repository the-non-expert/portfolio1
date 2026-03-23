<script>
  const tools = [
    { name: "SvelteKit",  slug: "svelte" },
    { name: "Python",     slug: "python" },
    { name: "Go",         slug: "go" },
    { name: "Node.js",    slug: "nodedotjs" },
    { name: "Tailwind",   slug: "tailwindcss" },
    { name: "TypeScript", slug: "typescript" },
    { name: "Shopify",    slug: "shopify" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "GitHub",     slug: "github" },
    { name: "Netlify",    slug: "netlify" },
    { name: "Claude",     slug: "claude" },
    { name: "Gemini",     slug: "googlegemini" },
    { name: "FastAPI",    slug: "fastapi" },
  ];
</script>

<div class="w-full bg-surface border-t border-stroke py-12">
  <div class="max-w-5xl mx-auto px-4 md:px-6">

    <h2 class="font-display text-2xl font-bold text-ink mb-8 text-center">Dev tools I use</h2>

    <div class="flex flex-wrap gap-3 justify-center">
      {#each tools as tool}
        <div class="flex items-center gap-2 px-3 py-2 bg-bg border border-stroke rounded-lg hover:border-ink/20 transition-colors">
          <img
            src="https://cdn.simpleicons.org/{tool.slug}"
            alt={tool.name}
            class="w-4 h-4 object-contain dark:invert"
            loading="lazy"
          />
          <span class="text-sm text-muted">{tool.name}</span>
        </div>
      {/each}
    </div>

  </div>
</div>
