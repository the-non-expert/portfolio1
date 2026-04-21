<script lang="ts">
  import MySocialMediaDetails from "$lib/CommonComponents/MySocialMediaDetails.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;

  const contactSchema: string = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Hire Ayush Jhunjhunwala - Full-Stack Tech Enthusiast",
    "description": "Contact Ayush Jhunjhunwala for technical leadership and full-stack development. Expert in Python FastAPI backends, SvelteKit frontends, AWS deployments, and team management.",
    "mainEntity": {
      "@type": "Person",
      "name": "Ayush Jhunjhunwala",
      "jobTitle": "Engineer. Leader. Builder.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Cuttack",
        "addressRegion": "Odisha",
        "addressCountry": "India"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "professional",
        "availableLanguage": ["English", "Hindi"],
        "serviceType": ["Technical Leadership", "Full-Stack Development", "System Architecture", "Team Management"]
      },
      "knowsAbout": ["Python FastAPI", "SvelteKit", "AWS", "PostgreSQL", "CI/CD", "Technical Leadership"]
    }
  });
</script>

<SEO
  pageKey="contact"
  structuredData={contactSchema}
/>

<main>
  <!-- Hero -->
  <section class="max-w-5xl mx-auto px-4 md:px-6 py-12 border-b border-stroke">
    <h1 class="font-display text-4xl md:text-5xl font-bold text-ink leading-tight">
      Let's build something that ships.
    </h1>
    <p class="text-sm text-muted mt-4">
      Available for contracts, technical leadership roles, and architecture consulting.
    </p>
    <div class="mt-6">
      <MySocialMediaDetails />
    </div>
  </section>

  <!-- Content -->
  <section class="max-w-5xl mx-auto px-4 md:px-6 py-12 md:flex md:gap-12">

    <!-- Left: what I'm open to -->
    <article class="md:w-5/12 mb-10 md:mb-0">
      <h2 class="font-display text-2xl font-semibold text-ink mb-4">What I'm open to</h2>
      <p class="text-sm text-muted leading-relaxed">
        Looking for a tech leader or full-stack developer? I specialize in building scalable
        Python FastAPI backends, responsive SvelteKit frontends, Shopify systems, and managing technical teams.
      </p>
      <ul class="mt-6 space-y-2">
        {#each ['Technical leadership roles', 'Full-stack contracts', 'Python FastAPI backends', 'SvelteKit frontends', 'Architecture consulting', 'Team management & mentoring'] as item}
          <li class="text-sm text-muted flex items-center gap-2">
            <span class="w-1 h-1 rounded-full bg-accent shrink-0"></span>
            {item}
          </li>
        {/each}
      </ul>
    </article>

    <!-- Right: form -->
    <div class="md:w-7/12">
      {#if form?.success}
        <div class="flex flex-col items-start gap-4 py-12">
          <div class="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="font-display text-2xl font-semibold text-ink">Message received.</h2>
          <p class="text-sm text-muted">I'll get back to you within 24 hours. Talk soon.</p>
        </div>
      {:else}
        {#if form?.error}
          <div class="mb-5 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-sm text-red-700">
            {form.error}
          </div>
        {/if}

        <form method="POST" use:enhance class="space-y-5">
          <div class="flex flex-col gap-1.5">
            <label for="fullname" class="text-sm font-medium text-ink">Full name</label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Your name"
              class="bg-surface border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              required
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="email" class="text-sm font-medium text-ink">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              class="bg-surface border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              required
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="project-type" class="text-sm font-medium text-ink">Project type</label>
            <select
              id="project-type"
              name="project-type"
              class="bg-surface border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
            >
              <option value="technical-leadership">Technical leadership role</option>
              <option value="full-stack-development">Full-stack development</option>
              <option value="backend-development">Python FastAPI backend</option>
              <option value="frontend-development">SvelteKit frontend</option>
              <option value="shopify">Shopify system</option>
              <option value="system-architecture">Architecture consulting</option>
              <option value="team-management">Team management & mentoring</option>
            </select>
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="description" class="text-sm font-medium text-ink">Project description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your requirements, team size, timeline..."
              class="bg-surface border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            class="bg-ink text-bg px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors duration-300"
          >
            Get in touch
          </button>
        </form>
      {/if}
    </div>

  </section>
</main>
