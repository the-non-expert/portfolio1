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
}
```

---

## SEO Strategy

Each case study page is a standalone indexable URL targeting different keyword clusters:

| Page | Primary keywords |
|---|---|
| Aarti Jewellers | jewellery website developer India, bilingual website developer, live price API |
| SikhAid NGO | NGO website developer, Razorpay webhook integration, SvelteKit full-stack |
| Roxford Healthcare | freelance SvelteKit developer UK, pharmaceutical website developer |
| Humanaissance | SvelteKit developer for hire, Claude API developer, custom CMS developer |

Each page needs: unique `<title>`, `<meta description>`, canonical URL, and Open Graph tags (for LinkedIn sharing). Structured data (`CreativeWork` or `Article` schema) is a stretch goal.

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
