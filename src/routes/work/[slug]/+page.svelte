<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import { generateCaseStudySchema, generateFAQSchema, generateBreadcrumbSchema, siteConfig } from '$lib/utils/seo';
  import { testimonials } from '$lib/data/testimonials';
  import type { PageData } from './$types';

  export let data: PageData;

  $: entry = data.entry as any;
  $: cs = entry.caseStudy;
  $: related = (data.related ?? []) as any[];
  $: testimonial = cs.testimonialId
    ? testimonials.find((t) => t.id === cs.testimonialId)
    : null;

  $: caseStudySchema = generateCaseStudySchema(entry);
  $: faqSchema = cs.faq?.length ? generateFAQSchema(cs.faq) : null;
  $: breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Works', url: `${siteConfig.url}/myworks` },
    { name: entry.company, url: `${siteConfig.url}/work/${cs.slug}` }
  ]);
  $: schemas = [caseStudySchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])];
  $: combinedSchema = JSON.stringify(schemas);
  $: ogImage = entry.logo?.startsWith('http') ? entry.logo : `${siteConfig.url}${entry.logo}`;
</script>

<SEO
  pageKey="work/{cs.slug}"
  structuredData={combinedSchema}
  overrides={{ ogImage }}
/>

<main class="max-w-5xl mx-auto px-4 md:px-6 py-12">

  <nav class="mb-10">
    <a href="/myworks" class="text-sm text-muted hover:text-ink transition-colors font-sans">← Works</a>
  </nav>

  <header class="border-b border-stroke pb-8 mb-10">
    <div class="flex items-start justify-between gap-4 mb-5">
      <div class="flex items-start gap-4">
        <img
          src={entry.logo}
          alt="{entry.company} logo"
          class="w-14 h-14 object-contain p-2 rounded-xl shrink-0 border border-stroke {entry.darkBg ? 'bg-zinc-900' : 'bg-surface'}"
        />
        <div>
          <p class="text-xs font-sans font-semibold text-muted uppercase tracking-widest mb-1">
            {entry.company} · {entry.countryFlag} · {entry.duration}
          </p>
          <h1 class="font-display text-3xl md:text-4xl font-bold text-ink leading-tight mb-2">
            {entry.company}: {cs.technicalHighlight.title}
          </h1>
          <span class="inline-flex items-center gap-1.5 text-xs font-sans text-accent border border-accent px-3 py-1 rounded-full">
            <span class="w-1.5 h-1.5 bg-accent rounded-full shrink-0"></span>
            {cs.myRole}
          </span>
        </div>
      </div>
      {#if entry.url}
        <a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          class="shrink-0 px-3 py-1.5 border border-stroke text-accent text-xs font-sans rounded hover:border-accent transition-colors"
        >
          View live site ↗
        </a>
      {/if}
    </div>

    <div class="flex flex-wrap gap-6 mb-4">
      <div>
        <p class="text-xs font-sans text-muted uppercase tracking-widest mb-0.5">Type</p>
        <p class="text-sm font-sans font-medium text-ink">Contract</p>
      </div>
      <div>
        <p class="text-xs font-sans text-muted uppercase tracking-widest mb-0.5">Location</p>
        <p class="text-sm font-sans font-medium text-ink">{entry.location}</p>
      </div>
      <div>
        <p class="text-xs font-sans text-muted uppercase tracking-widest mb-0.5">Duration</p>
        <p class="text-sm font-sans font-medium text-ink">{entry.duration}</p>
      </div>
    </div>

    <div class="flex flex-wrap gap-1.5">
      {#each entry.technologies as tech}
        <span class="px-2 py-0.5 text-xs font-sans bg-surface text-muted border border-stroke rounded">{tech}</span>
      {/each}
    </div>
  </header>

  <section class="mb-10" aria-labelledby="brief-heading">
    <h2 id="brief-heading" class="text-xs font-sans font-medium text-muted uppercase tracking-widest mb-3">The Brief</h2>
    <p class="text-base leading-relaxed text-ink">{cs.brief}</p>
  </section>

  <section class="mb-10" aria-labelledby="built-heading">
    <h2 id="built-heading" class="text-xs font-sans font-medium text-muted uppercase tracking-widest mb-4">What I Built</h2>
    <ul class="grid sm:grid-cols-2 gap-3">
      {#each cs.features as feature}
        <li class="flex items-start gap-2 text-sm text-ink font-sans leading-relaxed">
          <span class="text-accent shrink-0 mt-0.5">→</span>
          {feature}
        </li>
      {/each}
    </ul>
  </section>

  <section class="mb-10" aria-labelledby="tech-heading">
    <h2 id="tech-heading" class="text-xs font-sans font-medium text-muted uppercase tracking-widest mb-3">Technical Highlight</h2>
    <div class="bg-surface border border-stroke border-l-4 border-l-accent rounded-lg p-5">
      <p class="text-xs font-sans font-semibold text-accent uppercase tracking-widest mb-2">{cs.technicalHighlight.title}</p>
      <p class="text-sm font-sans leading-relaxed text-ink">{cs.technicalHighlight.body}</p>
    </div>
  </section>

  {#if cs.outcome}
    <section class="mb-10" aria-labelledby="outcome-heading">
      <h2 id="outcome-heading" class="text-xs font-sans font-medium text-muted uppercase tracking-widest mb-3">Outcome</h2>
      <p class="text-base leading-relaxed text-ink">{cs.outcome}</p>
    </section>
  {/if}

  {#if testimonial}
    <section class="mb-10" aria-labelledby="testimonial-heading">
      <h2 id="testimonial-heading" class="text-xs font-sans font-medium text-muted uppercase tracking-widest mb-3">From the client</h2>
      <blockquote class="bg-surface border border-stroke rounded-xl p-7">
        <p class="font-display text-4xl text-accent leading-none mb-3" aria-hidden="true">"</p>
        <p class="text-base leading-relaxed text-ink italic mb-5">{testimonial.testimonial}</p>
        <footer class="flex items-center gap-3">
          {#if testimonial.isLogo}
            <img
              src={testimonial.image}
              alt="{testimonial.company} logo"
              class="w-9 h-9 object-contain rounded-full border border-stroke shrink-0 {testimonial.darkBg ? 'bg-zinc-900' : 'bg-bg'}"
            />
          {:else}
            <div class="w-9 h-9 bg-ink text-bg rounded-full flex items-center justify-center text-xs font-sans font-semibold shrink-0">
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </div>
          {/if}
          <div>
            <p class="text-sm font-sans font-semibold text-ink">{testimonial.name}</p>
            <p class="text-xs font-sans text-muted">{testimonial.title}, {testimonial.company}</p>
          </div>
        </footer>
      </blockquote>
    </section>
  {/if}

  {#if cs.faq?.length}
    <section class="mb-10" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="text-xs font-sans font-medium text-muted uppercase tracking-widest mb-4">FAQ</h2>
      <div class="space-y-2">
        {#each cs.faq as item}
          <details class="faq-item border border-stroke rounded-lg overflow-hidden">
            <summary class="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer font-sans text-sm font-semibold text-ink">
              {item.question}
              <span class="faq-arrow shrink-0 text-muted" aria-hidden="true">↓</span>
            </summary>
            <div class="px-5 pb-4 pt-2 text-sm font-sans text-muted leading-relaxed border-t border-stroke bg-surface">
              {item.answer}
            </div>
          </details>
        {/each}
      </div>
    </section>
  {/if}

  <div class="bg-ink rounded-xl p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
    <div>
      <p class="text-xs font-sans text-muted uppercase tracking-widest mb-1">Working on something similar?</p>
      <p class="font-display text-2xl font-bold text-bg leading-tight">Let's build it together.</p>
      <p class="text-sm font-sans text-muted mt-1">I'm available for contracts — local businesses, startups, and everything in between.</p>
    </div>
    <a
      href="/contact"
      class="shrink-0 px-6 py-3 bg-accent text-bg text-sm font-sans font-semibold rounded-lg hover:bg-accent-hover transition-colors"
    >
      Get in touch →
    </a>
  </div>

  {#if related.length >= 2}
    <section class="mb-10" aria-labelledby="related-heading">
      <h2 id="related-heading" class="text-xs font-sans font-medium text-muted uppercase tracking-widest mb-4">Other SvelteKit projects</h2>
      <div class="grid sm:grid-cols-3 gap-3">
        {#each related as rel}
          <a
            href="/work/{rel.caseStudy.slug}"
            class="bg-surface border border-stroke rounded-lg p-4 hover:border-ink/20 transition-colors block"
          >
            <p class="text-xs font-sans text-accent uppercase tracking-wider mb-1">{rel.technologies[0]}</p>
            <p class="text-sm font-sans font-semibold text-ink">{rel.company}</p>
            <p class="text-xs font-sans text-muted">{rel.role}</p>
          </a>
        {/each}
      </div>
    </section>
  {/if}

  <footer class="border-t border-stroke pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div class="flex gap-3 flex-wrap">
      <a
        href="https://www.linkedin.com/sharing/share-offsite/?url={encodeURIComponent(`https://ayushjhunjhunwala.com/work/${cs.slug}`)}"
        target="_blank"
        rel="noopener noreferrer"
        class="px-4 py-2 border border-stroke text-muted text-sm font-sans rounded-full hover:border-accent hover:text-accent transition-colors"
      >
        Share on LinkedIn
      </a>
      <a
        href="https://twitter.com/intent/tweet?url={encodeURIComponent(`https://ayushjhunjhunwala.com/work/${cs.slug}`)}"
        target="_blank"
        rel="noopener noreferrer"
        class="px-4 py-2 border border-stroke text-muted text-sm font-sans rounded-full hover:border-accent hover:text-accent transition-colors"
      >
        Share on X
      </a>
    </div>
    <a href="/myworks" class="text-sm font-sans text-muted hover:text-ink transition-colors">← All works</a>
  </footer>

</main>

<style>
  .faq-item summary { list-style: none; transition: background-color 0.15s; }
  .faq-item summary::-webkit-details-marker { display: none; }
  .faq-item summary:hover { background-color: var(--color-surface); }
  .faq-arrow { transition: transform 0.2s ease; }
  .faq-item[open] .faq-arrow { transform: rotate(180deg); }
</style>
