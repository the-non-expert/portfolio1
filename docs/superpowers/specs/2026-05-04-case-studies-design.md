# Case Studies Feature — Design Spec

**Date:** 2026-05-04  
**Status:** Approved  
**Goal:** Add case study pages to increase inbound client inquiries, Google rankings, and LinkedIn shareability — ultimately earning more work.

---

## Context

The portfolio at `ayushjhunjhunwala.com` is a SvelteKit + TypeScript + Tailwind CSS site with a "Typesetter's Proof" design system (editorial palette, token-based colours). Work experience is currently displayed as expandable cards on `/myworks`. There are no dedicated per-project pages, meaning no shareable URLs and no SEO value per project.

---

## Audience

Mixed — potential clients, recruiters, and the tech community. Every design decision prioritises conversion (contact inquiry) first, credibility second.

---

## Approach: Hybrid

Dedicated case study pages (`/work/[slug]`) for the 4–5 strongest projects. Existing expandable cards on `/myworks` remain and gain a "View case study →" link when a full page exists.

**Why hybrid over full pages for all:** Avoids having to write 12 case studies before shipping anything. Thin/older projects (AIESEC, Digizilla) don't need a full page — they serve as timeline context, not conversion drivers.

---

## Shipping Order

| Priority | Project | Rationale |
|---|---|---|
| 1 | Aarti Jewellers | Small scope — good to nail the template first |
| 2 | SikhAid NGO | Strong technical story, real client |
| 3 | Roxford Healthcare | UK client, sole developer — strong credibility signal |
| 4 | Humanaissance | Most content-rich — write last when template is proven |

---

## Route Structure

```
/work/[slug]               — case study detail page
/work/aarti-jewellers
/work/sikhaid-ngo
/work/roxford-healthcare
/work/humanaissance
```

Case study data lives in `src/lib/data/workExperience.js`, extended with an optional `caseStudy` object per entry. This keeps all project data in one place and matches the existing pattern. No separate markdown files or second content system.

The existing `/myworks` route is unchanged. Cards with a case study get a "View case study →" link.

---

## Page Template

### Always-shown sections

**1. Header**
- Back navigation: `← Works`
- Client logo + name + role title
- **"My Role" badge** — e.g. "Sole developer on this project" (red pill, signals to clients what they're hiring)
- Duration, location, contract type (attribute row)
- Technology tags
- "View live site ↗" button (when URL exists)

**2. The Brief**
- 1–3 paragraphs. What the client needed and why. Written in first person from Ayush's perspective.

**3. What I Built**
- 2-column feature grid with `→` bullets. Scannable. Covers the concrete deliverables.

**4. Technical Highlight**
- A left-accent box. One interesting engineering decision per project — the "why" behind a specific choice. Signals craft to technical readers.

### Optional sections (hidden when no content)

**5. Screenshots**
- Image(s) with caption. Skip if no good screenshots available.

**6. Outcome**
- What changed after launch. If no hard metrics, a qualitative outcome is fine.

**7. Testimonial**
- Pull quote with author avatar/initials. Only shown when a real quote exists. Never fabricated.

**7b. FAQ** (optional — strongly recommended for GEO/AEO)
- 3–5 Q&As answering what a potential client or AI engine would naturally ask about this project
- Feeds `FAQPage` schema via existing `generateFAQSchema()` utility
- Questions live in `workExperience.js` as part of the `caseStudy` object: `faq: { question: string; answer: string; }[]`

### Conversion + navigation

**8. CTA block** (always shown)
- Dark background (`ink` colour)
- Eyebrow: "Working on something similar?"
- Heading: "Let's build it together."
- Subtext: "I'm available for contracts — local businesses, startups, and everything in between."
- Button: "Get in touch →" → `/contact`

**9. Related projects** (optional — shown when ≥2 other case studies exist)
- 3-card grid linking to other case studies by shared technology (e.g. "Other SvelteKit projects")
- Drives internal linking for SEO

**10. Footer**
- Share on LinkedIn / Share on X buttons
- "Next case study →" link

---

## Data Model Extension

Each case study entry needs:

```ts
caseStudy?: {
  slug: string;
  myRole: string;               // e.g. "Sole developer on this project"
  brief: string;                // markdown or prose
  features: string[];           // bullet points for "What I Built"
  technicalHighlight: {
    title: string;
    body: string;
  };
  screenshots?: string[];       // image paths
  outcome?: string;             // prose, optional
  testimonialId?: number;       // links to testimonials.ts
  relatedSlugs?: string[];      // for related projects grid
  faq?: { question: string; answer: string; }[];  // feeds FAQPage schema + GEO/AEO
}
```

---

## SEO Strategy

Each case study page is a standalone indexable URL — the primary mechanism for organic discovery. The site already has `seo.ts` with `pageConfigs` and structured data generators; case studies extend this pattern.

### Per-page metadata

Add a `pageConfigs` entry in `seo.ts` for each case study using this format:

```ts
'work/aarti-jewellers': {
  title: "Live Gold Price Website for Aarti Jewellers — SvelteKit Case Study | Ayush Jhunjhunwala",
  description: "How I built a bilingual Hindi-English frontend with a live gold and silver price API for a jewellery shop in Cuttack — a 2-month SvelteKit contract.",
  keywords: ["jewellery website developer India", "bilingual website developer", "live gold price API SvelteKit", "SvelteKit frontend developer Cuttack"],
  ogType: "article",
  canonical: "/work/aarti-jewellers"
}
```

Title format: `[What was built] for [Client] — [Tech] Case Study | Ayush Jhunjhunwala`  
Description format: direct answer to "what did you do and why does it matter" in ≤160 chars.

### Keyword targets per page

| Page | Primary keywords |
|---|---|
| Aarti Jewellers | jewellery website developer India, bilingual website developer, live gold price API SvelteKit |
| SikhAid NGO | NGO website developer India, Razorpay webhook integration, SvelteKit Firebase developer |
| Roxford Healthcare | freelance SvelteKit developer UK, pharmaceutical website developer, sole developer contract |
| Humanaissance | SvelteKit developer for hire, Claude API developer Singapore, custom CMS SvelteKit |

### Structured data

Add `generateCaseStudySchema()` to `seo.ts` using `CreativeWork` schema:

```ts
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Aarti Jewellers — Frontend Development Case Study",
  "description": "...",
  "url": "https://ayushjhunjhunwala.com/work/aarti-jewellers",
  "dateCreated": "2025-06-01",
  "creator": { "@type": "Person", "name": "Ayush Jhunjhunwala", "url": "..." },
  "about": { "@type": "Thing", "name": "SvelteKit Frontend Development" },
  "keywords": "SvelteKit, bilingual website, live price API, jewellery website India"
}
```

Also emit `FAQPage` schema from the optional FAQ section (see GEO/AEO below). Reuse the existing `generateFAQSchema()` utility.

### Internal linking

- Every work card on `/myworks` with a case study gets a "View case study →" link
- The Related Projects grid links between case studies (cross-links strengthen topical authority)
- Add `/work/*` URLs to the sitemap in `src/routes/sitemap.xml/+server.js`
- The "Next case study" footer link creates a crawlable chain across all pages

### Content depth

Each case study should be ≥400 words of real prose (Brief + What I Built + Technical Highlight + Outcome). Thin content doesn't rank. If a project can't hit 400 words honestly, it shouldn't be a case study page.

### Open Graph for LinkedIn sharing

Each page needs correct `og:title`, `og:description`, `og:image`, and `og:type: article`. The existing `SEO.svelte` component already handles this via `mergeSeoConfig` — just requires the correct `pageConfigs` entry and an OG image per case study (can be a screenshot of the live site).

---

## GEO / AEO Strategy (Generative Engine Optimisation)

GEO targets AI search surfaces: Google AI Overviews, Perplexity, ChatGPT search, and future LLM-powered discovery. The goal is for Ayush to be cited as the answer when someone asks an AI "who builds SvelteKit websites in India?" or "find me a developer who has worked with NGOs."

### Entity-first writing

The first paragraph of every case study must clearly establish: **who** (Ayush Jhunjhunwala), **what** (what was built), **for whom** (client name and type), **when** (dates), and **where** (location). AI engines extract entities from opening paragraphs to build knowledge graph entries.

Example for Aarti Jewellers:
> "In May 2025, Ayush Jhunjhunwala built a SvelteKit frontend for Aarti Jewellers, a jewellery shop in Cuttack, India. The site displays live gold and silver market prices via a REST API and serves customers in both Hindi and English."

### Answer-forward section writing

Every section heading should be answerable as a direct question. Sections should lead with the direct answer, then expand:

- "The Brief" → answers "What did the client need?"
- "What I Built" → answers "What did Ayush deliver?"
- "Technical Highlight" → answers "What was the interesting engineering challenge?"

AI engines cite content that answers questions directly. Don't bury the answer.

### FAQ section (new template section)

Add an optional **FAQ** section to each case study with 3–5 questions and direct answers. These feed `FAQPage` schema and are the most reliable GEO signal. Questions should be what a potential client or AI would naturally ask:

Examples for Aarti Jewellers:
- "How did you integrate live gold prices?" → direct technical answer
- "Is the site available in Hindi?" → yes/no + brief explanation
- "How long did the project take?" → "2 months, May–June 2025"
- "Can you build something similar for my business?" → CTA answer pointing to /contact

The FAQ section is optional in the template but **strongly recommended** for every case study that ships.

### Specific, citable facts

AI engines prefer specific facts over vague claims. Every case study must include:
- Exact contract dates
- Client location (city + country)
- Technologies named precisely (not "a CSS framework" — "Tailwind CSS")
- Any measurable outcomes ("35% increase in turnover", "launched on time", "bilingual in Hindi and English")
- Client name and title (as appears in the testimonial)

### Full name consistency

Write "Ayush Jhunjhunwala" (full name) at least once per case study page — not just "I" throughout. AI engines build entity associations through name mentions in context.

### Person schema `knowsAbout` update

Update `generatePersonSchema()` in `seo.ts` to add case-study-relevant skills as each case study ships:
- `"SvelteKit contract developer"`, `"Razorpay webhook integration"`, `"Claude API developer"`, `"bilingual website development"`, `"NGO website developer"`

This reinforces Ayush as a named entity with specific, verifiable expertise.

---

## Design System Constraints

- Use only existing colour tokens: `bg`, `surface`, `stroke`, `ink`, `muted`, `accent`, `accent-hover`
- Typography: `font-display` for headings, `font-sans` for labels/meta, body text in default serif
- No new background levels beyond `bg` and `surface`
- CTA block uses `bg-ink text-bg` (dark inversion — already used in the site)
- All borders use `border-stroke`

---

## Out of Scope

- Editing or redesigning the existing `/myworks` expandable cards beyond adding the "View case study →" link
- Case studies for AIESEC, Digizilla, Zicops, Querent, or freelance entries
- CMS or admin interface for writing case studies (all content is code/markdown)
- Analytics or conversion tracking setup
