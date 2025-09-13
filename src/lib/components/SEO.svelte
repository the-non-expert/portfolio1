<script lang="ts">
  import { page } from '$app/stores';
  import { mergeSeoConfig, generateMetaTags } from '$lib/utils/seo.js';
  import type { SEOConfig } from '$lib/types.js';
  
  // Props for dynamic SEO configuration
  export let pageKey: string = 'home';
  export let overrides: Partial<SEOConfig> = {};
  export let structuredData: string | null = null;
  
  // Generate the SEO configuration
  $: seoConfig = mergeSeoConfig(pageKey, {
    ...overrides,
    // Use current page URL if available
    canonical: overrides.canonical || $page.url.pathname
  });
  
  // Generate meta tags
  $: metaTags = generateMetaTags(seoConfig);
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{metaTags.title}</title>
  <meta name="description" content={metaTags.description} />
  <meta name="keywords" content={metaTags.keywords} />
  <link rel="canonical" href={seoConfig.canonical} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={metaTags.openGraph.type} />
  <meta property="og:title" content={metaTags.openGraph.title} />
  <meta property="og:description" content={metaTags.openGraph.description} />
  <meta property="og:image" content={metaTags.openGraph.image} />
  <meta property="og:url" content={metaTags.openGraph.url} />
  <meta property="og:site_name" content={metaTags.openGraph.siteName} />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content={metaTags.twitter.card} />
  <meta name="twitter:title" content={metaTags.twitter.title} />
  <meta name="twitter:description" content={metaTags.twitter.description} />
  <meta name="twitter:image" content={metaTags.twitter.image} />
  <meta name="twitter:creator" content={metaTags.twitter.creator} />
  
  <!-- Structured Data -->
  {#if structuredData}
    {@html `<script type="application/ld+json">${structuredData}</script>`}
  {/if}
</svelte:head>