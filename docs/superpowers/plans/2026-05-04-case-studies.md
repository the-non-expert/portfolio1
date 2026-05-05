# Case Studies Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/work/[slug]` case study pages for Aarti Jewellers, SikhAid NGO, Roxford Healthcare, and Humanaissance — with full SEO metadata, GEO/AEO-optimised content, structured data, and conversion CTAs.

**Architecture:** Case study content is stored as an optional `caseStudy` object on each entry in `workExperience.js`. A SvelteKit dynamic route at `/work/[slug]` loads the matching entry and renders a consistent template. The existing `/myworks` work cards gain a "Case study →" link where a page exists. No new content system — everything lives in the existing data file.

**Tech Stack:** SvelteKit, TypeScript, Tailwind CSS, existing `seo.ts` utilities (`generateFAQSchema`, `mergeSeoConfig`, `pageConfigs`), existing `testimonials.ts`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/lib/data/workExperience.js` | Modify | Add `caseStudy` object to 4 entries |
| `src/lib/utils/seo.ts` | Modify | Add `generateCaseStudySchema()` + 4 `pageConfigs` entries |
| `src/routes/work/[slug]/+page.ts` | Create | Load case study by slug, 404 if not found, prerender entries |
| `src/routes/work/[slug]/+page.svelte` | Create | Full case study page template |
| `src/lib/WorkExperience.svelte` | Modify | Add "Case study →" link to grid and list views |
| `src/routes/sitemap.xml/+server.js` | Modify | Add 4 `/work/*` static routes |
| `.gitignore` | Modify | Add `.superpowers/` |

---

## Task 1: Add caseStudy data to workExperience.js (all 4 entries)

**Files:**
- Modify: `src/lib/data/workExperience.js`

Add a `caseStudy` property to each of the 4 target entries. No routing yet — this is pure data.

- [ ] **Step 1.1: Add caseStudy to Aarti Jewellers (id: 15)**

Find the entry with `id: 15`. Add `caseStudy` after the existing `url` field:

```js
    url: "https://www.sriaartijewellers.com/",
    caseStudy: {
      slug: 'aarti-jewellers',
      myRole: 'Sole developer on this project',
      brief: 'In May 2025, Ayush Jhunjhunwala built a SvelteKit frontend for Aarti Jewellers, a jewellery shop in Cuttack, India. The client needed a digital presence local customers could trust — one that showed live gold and silver prices, served them in Hindi and English, and gave walk-in customers a clear reason to choose Aarti over nearby competitors.',
      features: [
        'Live gold and silver price feed via REST API, updated throughout the trading day',
        'Bilingual interface in Hindi and English for local customer reach',
        'Trust-first layout designed to build confidence before customers visit in person',
        'Responsive design optimised for mobile browsing in-store'
      ],
      technicalHighlight: {
        title: 'Live Price API Integration',
        body: 'Gold and silver prices shift throughout the trading day. Rather than displaying stale static figures, Ayush Jhunjhunwala integrated a live market data API so customers always see the current Cuttack rate. This single feature does more trust-building work than any paragraph of copy could.'
      },
      outcome: 'The site launched on schedule in June 2025. The bilingual layout and live pricing display gave Aarti Jewellers a clear digital edge over competitors still relying on static or non-existent websites.',
      testimonialId: 9,
      relatedSlugs: ['sikhaid-ngo', 'humanaissance'],
      faq: [
        {
          question: 'How did Ayush Jhunjhunwala integrate live gold prices on the Aarti Jewellers website?',
          answer: 'A REST API call fetches the current gold and silver market rates for Cuttack and displays them on page load. The integration was built in SvelteKit with TypeScript, keeping the implementation lightweight with no third-party state management.'
        },
        {
          question: 'Is the Aarti Jewellers website available in Hindi?',
          answer: 'Yes. The site serves content bilingually in Hindi and English, designed to connect with local customers in Cuttack who are more comfortable reading in Hindi.'
        },
        {
          question: 'How long did the Aarti Jewellers project take?',
          answer: 'The project ran from May to June 2025 — approximately two months from brief to live site.'
        },
        {
          question: 'Can Ayush build a similar website for my business?',
          answer: 'Yes — Ayush Jhunjhunwala is available for similar contracts. Visit the contact page to get in touch.'
        }
      ]
    }
```

- [ ] **Step 1.2: Add caseStudy to SikhAid NGO (id: 16)**

Find the entry with `id: 16`. Add `caseStudy` after the existing `url` field:

```js
    url: "https://www.sikhaid.ngo",
    caseStudy: {
      slug: 'sikhaid-ngo',
      myRole: 'Sole full-stack developer on this project',
      brief: 'In February 2025, Ayush Jhunjhunwala built a full-stack SvelteKit platform for SikhAid NGO, India. The team was processing donations but had no visibility into which marketing channel each donation came from — making it impossible to allocate their limited budget intelligently. They also needed a complete admin portal so the team could update content without calling a developer.',
      features: [
        'Full-stack SvelteKit application with Firebase Firestore backend',
        'Admin portal for content management with no developer dependency',
        'Custom payment source-tracking algorithm using Razorpay webhooks',
        'Real-time donation processing and webhook integration with Razorpay'
      ],
      technicalHighlight: {
        title: 'Payment Source-Tracking Algorithm',
        body: 'Each donation arrived from a different marketing channel — social media, email, word of mouth — but all payments landed in the same Razorpay dashboard with no origin data. Ayush Jhunjhunwala built a custom algorithm that combined Razorpay webhook payloads with UTM and referrer data captured at checkout time to tag each donation with its marketing source. SikhAid could now see exactly which channel drove the most donations and spend accordingly.'
      },
      outcome: 'The admin portal eliminated developer dependency for content updates. The payment tracking algorithm gave SikhAid NGO visibility into their marketing ROI for the first time, enabling data-driven budget decisions across their campaigns.',
      testimonialId: 6,
      relatedSlugs: ['aarti-jewellers', 'roxford-healthcare'],
      faq: [
        {
          question: 'How does the payment source-tracking work on the SikhAid website?',
          answer: 'When a donor clicks through from a marketing channel, the UTM parameters or referrer are captured and stored with the checkout session. When Razorpay fires a webhook on payment completion, the algorithm matches the payment to the stored session and tags it with its marketing origin — without requiring the donor to do anything differently.'
        },
        {
          question: 'What technology stack was used for SikhAid NGO?',
          answer: 'SvelteKit for the full-stack framework, Firebase Firestore for the database, Razorpay for payment processing and webhooks, TypeScript, and Tailwind CSS.'
        },
        {
          question: 'How long did the SikhAid project take?',
          answer: 'The project ran from February to May 2025 — approximately three months.'
        },
        {
          question: 'Can Ayush build a donation or payment system for my organisation?',
          answer: 'Yes — Ayush Jhunjhunwala is available for similar full-stack contracts. Visit the contact page to start a conversation.'
        }
      ]
    }
```

- [ ] **Step 1.3: Add caseStudy to Roxford Healthcare (id: 3)**

Find the entry with `id: 3`. Add `caseStudy` after the existing `url` field:

```js
    url: "https://www.roxfordhealthcare.com",
    caseStudy: {
      slug: 'roxford-healthcare',
      myRole: 'Sole developer on this project',
      brief: 'From March to August 2024, Ayush Jhunjhunwala served as the sole developer on a 6-month contract for Roxford Healthcare Ltd., a UK-based pharmaceutical company. With no existing web infrastructure, the entire platform — UI/UX design, SvelteKit frontend, Cloud Firestore backend, and deployment — needed to be built from scratch and delivered on deadline by one person.',
      features: [
        'End-to-end platform design and development as sole developer',
        'Pharmaceutical product showcase with organised catalogue pages',
        'Cloud Firestore database integration for admin-managed content',
        'Responsive UI/UX designed for a regulated-industry audience'
      ],
      technicalHighlight: {
        title: 'End-to-End Solo Delivery for a UK Pharmaceutical Client',
        body: 'Most web projects split frontend, backend, design, and deployment across multiple people. For Roxford Healthcare, Ayush Jhunjhunwala handled the full stack alone across a 6-month remote contract — UI/UX design, SvelteKit development, Firestore integration, and live deployment — for a pharmaceutical company in the UK. The platform launched on deadline with no team to absorb delays.'
      },
      outcome: 'The platform launched on time in August 2024, giving Roxford Healthcare Ltd. their first professional digital presence. The Firestore-backed content system let the team update pharmaceutical product listings independently.',
      relatedSlugs: ['sikhaid-ngo', 'humanaissance'],
      faq: [
        {
          question: 'What did Ayush Jhunjhunwala build for Roxford Healthcare?',
          answer: 'Ayush designed and developed a full web platform for Roxford Healthcare Ltd., a UK pharmaceutical company — including UI/UX design, SvelteKit frontend, and Cloud Firestore backend — as the sole developer on a 6-month remote contract.'
        },
        {
          question: 'What technology was used for Roxford Healthcare?',
          answer: 'SvelteKit, Tailwind CSS, TypeScript, and Cloud Firestore (Firebase). The platform was built to showcase pharmaceutical products with admin-editable content.'
        },
        {
          question: 'How long was the Roxford Healthcare contract?',
          answer: 'Six months, from March to August 2024. Delivered on schedule.'
        },
        {
          question: 'Is Ayush available for UK or international contracts?',
          answer: 'Yes — Ayush Jhunjhunwala works with international clients remotely. Visit the contact page to discuss your project.'
        }
      ]
    }
```

- [ ] **Step 1.4: Add caseStudy to Humanaissance (id: 13)**

Find the entry with `id: 13`. Add `caseStudy` after the existing `url` field:

```js
    url: "https://www.humanaissance.com",
    caseStudy: {
      slug: 'humanaissance',
      myRole: 'Sole developer and context engineer on this project',
      brief: 'From September 2025 to April 2026, Ayush Jhunjhunwala built a complete bespoke web platform for Humanaissance, a Singapore-based client. The brief was demanding: intricate code-driven animations using the Canvas API and CSS, a custom Content Management System with full admin control, a custom appointment booking flow, multiple Claude AI agents for long-term context management, and a full SEO and Generative Engine Optimisation strategy for organic and AI-powered discovery.',
      features: [
        'Custom CMS with full admin control over all customer-facing content',
        'Complex animations built using Canvas API and CSS — no animation libraries',
        'Custom appointment booking flow with 100% admin control',
        'Multiple Claude AI agents and knowledge graphs for long-term context management',
        'Full SEO and Generative Engine Optimisation (GEO) package implemented',
        'Admin portal with handover documentation for full team independence'
      ],
      technicalHighlight: {
        title: 'Claude AI Agents for Long-Term Context',
        body: 'Beyond the website itself, Ayush Jhunjhunwala built multiple Claude AI agents and knowledge graphs to retain design decisions, content rules, and brand context for the Humanaissance team. Rather than every future change requiring a developer to re-learn the codebase, the AI agents carry that context forward — dramatically reducing the cost of future iterations. This is Generative Engine Optimisation at the infrastructure level: making the platform itself AI-ready.'
      },
      outcome: 'Humanaissance launched with a fully operational CMS, working appointment booking, and a complete SEO + GEO strategy in place. The Claude AI agents and handover documentation gave the team full independence from the developer for both content management and future AI-assisted changes.',
      testimonialId: 7,
      relatedSlugs: ['sikhaid-ngo', 'roxford-healthcare'],
      faq: [
        {
          question: 'What did Ayush Jhunjhunwala build for Humanaissance?',
          answer: 'Ayush built a complete bespoke web platform for Humanaissance, a Singapore-based client — including a custom CMS, Canvas API and CSS animations, a custom appointment booking system, multiple Claude AI agents for context management, and a full SEO and Generative Engine Optimisation strategy.'
        },
        {
          question: 'How were the animations built for Humanaissance?',
          answer: 'All animations were built through code using the Canvas API and CSS — no animation libraries. This gives the client animations that feel handcrafted and are fully owned by the codebase, with no third-party dependencies to maintain.'
        },
        {
          question: 'What is Generative Engine Optimisation (GEO)?',
          answer: 'GEO is the practice of structuring content and metadata so that AI-powered search surfaces — Google AI Overviews, Perplexity, ChatGPT — can accurately cite and surface your content. For Humanaissance, this included entity-first writing, FAQPage schema, consistent entity naming, and AI-readable content architecture.'
        },
        {
          question: 'Is Ayush available for similar projects in Singapore or internationally?',
          answer: 'Yes — Ayush Jhunjhunwala works with international clients remotely. Visit the contact page to discuss your project.'
        }
      ]
    }
```

- [ ] **Step 1.5: Start dev server and confirm no import errors**

```bash
npm run dev
```

Expected: dev server starts cleanly, no console errors. No routing verification yet.

- [ ] **Step 1.6: Commit**

```bash
git add src/lib/data/workExperience.js
git commit -m "feat: add caseStudy data to 4 workExperience entries"
```

---

## Task 2: Extend seo.ts with generateCaseStudySchema and 4 pageConfigs

**Files:**
- Modify: `src/lib/utils/seo.ts`

- [ ] **Step 2.1: Add generateCaseStudySchema() after generateBlogPostingSchema**

Open `src/lib/utils/seo.ts`. Add this function after the closing brace of `generateBlogPostingSchema`:

```ts
export function generateCaseStudySchema(entry: any): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": `${entry.company} — ${entry.role} Case Study`,
    "description": entry.caseStudy.brief,
    "url": `${siteConfig.url}/work/${entry.caseStudy.slug}`,
    "creator": {
      "@type": "Person",
      "name": "Ayush Jhunjhunwala",
      "url": siteConfig.url
    },
    "about": {
      "@type": "Thing",
      "name": `${entry.role} for ${entry.company}`
    },
    "keywords": entry.technologies.join(', ')
  };
}
```

- [ ] **Step 2.2: Add 4 pageConfigs entries**

In `pageConfigs`, add these four entries after the existing `blog` entry:

```ts
  'work/aarti-jewellers': {
    title: 'Live Gold Price Website for Aarti Jewellers — SvelteKit Case Study | Ayush Jhunjhunwala',
    description: 'How Ayush Jhunjhunwala built a bilingual Hindi-English frontend with a live gold and silver price API for a jewellery shop in Cuttack — a 2-month SvelteKit contract.',
    keywords: [
      'jewellery website developer India',
      'bilingual website developer Hindi English',
      'live gold price API SvelteKit',
      'SvelteKit frontend developer Cuttack',
      'Ayush Jhunjhunwala case study'
    ],
    ogType: 'article',
    canonical: '/work/aarti-jewellers'
  },
  'work/sikhaid-ngo': {
    title: 'Donation Tracking Platform for SikhAid NGO — SvelteKit + Razorpay Case Study | Ayush Jhunjhunwala',
    description: 'How Ayush Jhunjhunwala built a full-stack SvelteKit platform with a custom Razorpay webhook payment-tracking algorithm for an Indian NGO — a 3-month contract.',
    keywords: [
      'NGO website developer India',
      'Razorpay webhook integration developer',
      'SvelteKit Firebase full-stack developer',
      'donation tracking system developer',
      'Ayush Jhunjhunwala case study'
    ],
    ogType: 'article',
    canonical: '/work/sikhaid-ngo'
  },
  'work/roxford-healthcare': {
    title: 'Pharmaceutical Web Platform for Roxford Healthcare — SvelteKit Case Study | Ayush Jhunjhunwala',
    description: 'How Ayush Jhunjhunwala designed and developed a complete pharmaceutical web platform as sole developer on a 6-month remote contract for a UK client.',
    keywords: [
      'freelance SvelteKit developer UK',
      'pharmaceutical website developer',
      'sole developer web contract',
      'SvelteKit Firestore developer',
      'Ayush Jhunjhunwala case study'
    ],
    ogType: 'article',
    canonical: '/work/roxford-healthcare'
  },
  'work/humanaissance': {
    title: 'Bespoke Web Platform for Humanaissance — SvelteKit + Claude AI Case Study | Ayush Jhunjhunwala',
    description: 'How Ayush Jhunjhunwala built a custom CMS, Canvas API animations, Claude AI agents, and a full GEO strategy for a Singapore-based client over a 7-month contract.',
    keywords: [
      'SvelteKit developer for hire Singapore',
      'Claude API developer web platform',
      'custom CMS SvelteKit developer',
      'Generative Engine Optimisation developer',
      'Canvas API animation developer',
      'Ayush Jhunjhunwala case study'
    ],
    ogType: 'article',
    canonical: '/work/humanaissance'
  },
```

- [ ] **Step 2.3: Commit**

```bash
git add src/lib/utils/seo.ts
git commit -m "feat: add generateCaseStudySchema and 4 work/ pageConfigs to seo.ts"
```

---

## Task 3: Create src/routes/work/[slug]/+page.ts

**Files:**
- Create: `src/routes/work/[slug]/+page.ts`

- [ ] **Step 3.1: Create the directory**

```bash
mkdir -p "src/routes/work/[slug]"
```

- [ ] **Step 3.2: Create the loader file**

Create `src/routes/work/[slug]/+page.ts` with this content:

```ts
import { error } from '@sveltejs/kit';
import { workExperience } from '$lib/data/workExperience.js';

export const prerender = true;

export function entries() {
  return (workExperience as any[])
    .filter((e) => e.caseStudy?.slug)
    .map((e) => ({ slug: e.caseStudy.slug as string }));
}

export function load({ params }: { params: { slug: string } }) {
  const entry = (workExperience as any[]).find(
    (e) => e.caseStudy?.slug === params.slug
  );

  if (!entry || !entry.caseStudy) {
    throw error(404, 'Case study not found');
  }

  const related = ((entry.caseStudy.relatedSlugs ?? []) as string[])
    .map((slug) => (workExperience as any[]).find((e) => e.caseStudy?.slug === slug))
    .filter((e) => e != null);

  return { entry, related };
}
```

- [ ] **Step 3.3: Verify loader — check terminal for TypeScript errors**

The dev server (already running from Task 1) will pick up the new file. Check the terminal for any TypeScript errors. Expected: no errors.

- [ ] **Step 3.4: Commit**

```bash
git add "src/routes/work/[slug]/+page.ts"
git commit -m "feat: add /work/[slug] route loader with prerender entries"
```

---

## Task 4: Create src/routes/work/[slug]/+page.svelte

**Files:**
- Create: `src/routes/work/[slug]/+page.svelte`

- [ ] **Step 4.1: Create the case study page component**

Create `src/routes/work/[slug]/+page.svelte`:

```svelte
<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import { generateCaseStudySchema, generateFAQSchema } from '$lib/utils/seo';
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
  $: combinedSchema = faqSchema
    ? JSON.stringify([caseStudySchema, faqSchema])
    : JSON.stringify(caseStudySchema);
</script>

<SEO
  pageKey="work/{cs.slug}"
  structuredData={combinedSchema}
/>

<main class="max-w-5xl mx-auto px-4 md:px-6 py-12">

  <!-- Back nav -->
  <nav class="mb-10">
    <a href="/myworks" class="text-sm text-muted hover:text-ink transition-colors font-sans">← Works</a>
  </nav>

  <!-- Header -->
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
            {entry.role}
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

  <!-- The Brief -->
  <section class="mb-10" aria-labelledby="brief-heading">
    <h2 id="brief-heading" class="text-xs font-sans font-medium text-muted uppercase tracking-widest mb-3">The Brief</h2>
    <p class="text-base leading-relaxed text-ink">{cs.brief}</p>
  </section>

  <!-- What I Built -->
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

  <!-- Technical Highlight -->
  <section class="mb-10" aria-labelledby="tech-heading">
    <h2 id="tech-heading" class="text-xs font-sans font-medium text-muted uppercase tracking-widest mb-3">Technical Highlight</h2>
    <div class="bg-surface border border-stroke border-l-4 border-l-accent rounded-lg p-5">
      <p class="text-xs font-sans font-semibold text-accent uppercase tracking-widest mb-2">{cs.technicalHighlight.title}</p>
      <p class="text-sm font-sans leading-relaxed text-ink">{cs.technicalHighlight.body}</p>
    </div>
  </section>

  <!-- Outcome (optional) -->
  {#if cs.outcome}
    <section class="mb-10" aria-labelledby="outcome-heading">
      <h2 id="outcome-heading" class="text-xs font-sans font-medium text-muted uppercase tracking-widest mb-3">Outcome</h2>
      <p class="text-base leading-relaxed text-ink">{cs.outcome}</p>
    </section>
  {/if}

  <!-- Testimonial (optional) -->
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
              {testimonial.name.split(' ').map((n: string) => n[0]).join('')}
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

  <!-- FAQ (optional) -->
  {#if cs.faq?.length}
    <section class="mb-10" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="text-xs font-sans font-medium text-muted uppercase tracking-widest mb-4">FAQ</h2>
      <dl class="space-y-5">
        {#each cs.faq as item}
          <div class="border-b border-stroke pb-5">
            <dt class="text-sm font-sans font-semibold text-ink mb-1">{item.question}</dt>
            <dd class="text-sm font-sans text-muted leading-relaxed">{item.answer}</dd>
          </div>
        {/each}
      </dl>
    </section>
  {/if}

  <!-- CTA (always shown) -->
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

  <!-- Related projects (optional — only when 2+ related entries exist) -->
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

  <!-- Footer -->
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
```

- [ ] **Step 4.2: Verify all 4 case study pages render**

With dev server running, open each URL and confirm it renders correctly:
- `http://localhost:5173/work/aarti-jewellers` — logo with dark bg, testimonial from Praveen Yadav, FAQ visible
- `http://localhost:5173/work/sikhaid-ngo` — payment tracking highlight, testimonial from Raunak Singh, FAQ visible
- `http://localhost:5173/work/roxford-healthcare` — no testimonial block (no testimonialId), FAQ visible
- `http://localhost:5173/work/humanaissance` — testimonial from Neal Jha, FAQ visible

Check on each:
- [ ] Logo renders (no broken image)
- [ ] Role badge (red pill) shows under the h1
- [ ] Technical Highlight box has left accent border
- [ ] FAQ section visible with correct Q&As
- [ ] CTA block dark background renders
- [ ] Related projects grid shows (3 cards)
- [ ] No console errors

- [ ] **Step 4.3: Commit**

```bash
git add "src/routes/work/[slug]/+page.svelte"
git commit -m "feat: add /work/[slug] case study page template"
```

---

## Task 5: Add "Case study →" links to WorkExperience.svelte

**Files:**
- Modify: `src/lib/WorkExperience.svelte`

- [ ] **Step 5.1: Update grid view — add case study link after external link**

In `src/lib/WorkExperience.svelte`, find this block inside the grid view (`{#if viewMode === 'grid'}`):

```svelte
{#if experience.url}
  <a href={experience.url} target="_blank" rel="noopener noreferrer"
    class="px-2 py-1 bg-bg text-accent border border-stroke rounded text-xs hover:border-accent transition-colors shrink-0 ml-2"
    on:click|stopPropagation>
    View ↗
  </a>
{/if}
```

Add immediately after that `{/if}`:

```svelte
{#if experience.caseStudy?.slug}
  <a
    href="/work/{experience.caseStudy.slug}"
    class="px-2 py-1 bg-accent text-bg rounded text-xs hover:bg-accent-hover transition-colors shrink-0 ml-1 font-sans"
    on:click|stopPropagation
  >
    Case study →
  </a>
{/if}
```

- [ ] **Step 5.2: Update list view — add case study link after external link**

Find this block inside the list view (`{:else}`):

```svelte
{#if experience.url}
  <a href={experience.url} target="_blank" rel="noopener noreferrer"
    class="text-xs text-accent hover:text-accent-hover transition-colors hidden md:block"
    on:click|stopPropagation>
    View ↗
  </a>
{/if}
```

Add immediately after that `{/if}`:

```svelte
{#if experience.caseStudy?.slug}
  <a
    href="/work/{experience.caseStudy.slug}"
    class="text-xs font-sans font-semibold text-accent hover:text-accent-hover transition-colors hidden md:block"
    on:click|stopPropagation
  >
    Case study →
  </a>
{/if}
```

- [ ] **Step 5.3: Verify on /myworks**

Open `http://localhost:5173/myworks`. Confirm:
- Aarti Jewellers, SikhAid NGO, Roxford Healthcare, Humanaissance cards each show a filled "Case study →" button
- All other cards (AIESEC, Zicops, Querent, OM Therapeutics, etc.) show no "Case study →" button
- Clicking "Case study →" navigates to the correct `/work/[slug]` page
- Both grid and list views show the link correctly

- [ ] **Step 5.4: Commit**

```bash
git add src/lib/WorkExperience.svelte
git commit -m "feat: add Case study links to work experience cards"
```

---

## Task 6: Update sitemap to include /work/* routes

**Files:**
- Modify: `src/routes/sitemap.xml/+server.js`

- [ ] **Step 6.1: Add 4 case study routes to staticRoutes**

In `src/routes/sitemap.xml/+server.js`, replace the `staticRoutes` array with:

```js
const staticRoutes = [
  { path: '/',                        priority: '1.0', changefreq: 'monthly', lastmod: '2026-04-21' },
  { path: '/myworks',                 priority: '0.9', changefreq: 'monthly', lastmod: '2026-04-21' },
  { path: '/work/aarti-jewellers',    priority: '0.9', changefreq: 'yearly',  lastmod: '2026-05-04' },
  { path: '/work/sikhaid-ngo',        priority: '0.9', changefreq: 'yearly',  lastmod: '2026-05-04' },
  { path: '/work/roxford-healthcare', priority: '0.9', changefreq: 'yearly',  lastmod: '2026-05-04' },
  { path: '/work/humanaissance',      priority: '0.9', changefreq: 'yearly',  lastmod: '2026-05-04' },
  { path: '/contact',                 priority: '0.8', changefreq: 'monthly', lastmod: '2026-04-21' },
  { path: '/blog',                    priority: '0.8', changefreq: 'weekly',  lastmod: '2025-09-13' },
  { path: '/writing',                 priority: '0.7', changefreq: 'weekly',  lastmod: '2025-09-25' },
  { path: '/reading',                 priority: '0.5', changefreq: 'monthly', lastmod: '2026-01-01' },
];
```

- [ ] **Step 6.2: Verify sitemap output**

Open `http://localhost:5173/sitemap.xml`. Confirm all 4 `/work/*` URLs appear in the XML output.

- [ ] **Step 6.3: Commit**

```bash
git add src/routes/sitemap.xml/+server.js
git commit -m "feat: add /work/* case study routes to sitemap"
```

---

## Task 7: Add .superpowers/ to .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 7.1: Add entry**

Open `.gitignore` and add at the end:

```
# Superpowers brainstorming session files
.superpowers/
```

- [ ] **Step 7.2: Commit**

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers/ brainstorm files"
```

---

## Task 8: Final verification

- [ ] **Step 8.1: Check all 4 case study pages**

Visit each URL and verify the full checklist:

| Check | /work/aarti-jewellers | /work/sikhaid-ngo | /work/roxford-healthcare | /work/humanaissance |
|---|---|---|---|---|
| Logo renders | ✓ | ✓ | ✓ | ✓ |
| Role badge (red pill) shows | ✓ | ✓ | ✓ | ✓ |
| Brief section visible | ✓ | ✓ | ✓ | ✓ |
| Features grid (2 cols) | ✓ | ✓ | ✓ | ✓ |
| Technical Highlight (left border) | ✓ | ✓ | ✓ | ✓ |
| Outcome section visible | ✓ | ✓ | ✓ | ✓ |
| Testimonial block | ✓ | ✓ | ✗ (none) | ✓ |
| FAQ section (4 Q&As) | ✓ | ✓ | ✓ | ✓ |
| CTA dark block | ✓ | ✓ | ✓ | ✓ |
| Related projects (3 cards) | ✓ | ✓ | ✓ | ✓ |
| Share buttons | ✓ | ✓ | ✓ | ✓ |

- [ ] **Step 8.2: Toggle dark mode on each page**

Press `T` on each case study page. Confirm:
- All text remains readable
- CTA block (`bg-ink`) stays legible in both modes
- Technical Highlight border remains visible
- No layout breakage

- [ ] **Step 8.3: Check /myworks in both view modes**

- Grid view: "Case study →" filled buttons appear on 4 cards
- List view: "Case study →" links appear on 4 cards (desktop only — `hidden md:block`)
- Clicking each navigates correctly

- [ ] **Step 8.4: Check sitemap**

`http://localhost:5173/sitemap.xml` — confirm 4 `/work/*` entries present.

- [ ] **Step 8.5: Update Person schema knowsAbout in seo.ts**

In `generatePersonSchema()` in `src/lib/utils/seo.ts`, add these to the `knowsAbout` array:

```ts
"knowsAbout": [
  // ... existing entries ...
  "SvelteKit Contract Development",
  "Razorpay Webhook Integration",
  "Claude API Development",
  "Generative Engine Optimisation",
  "Bilingual Website Development",
  "NGO Website Development"
]
```

- [ ] **Step 8.6: Final commit**

```bash
git add src/lib/utils/seo.ts
git commit -m "feat: update Person schema knowsAbout with case study skills"
```
