<script lang="ts">
  import ToolsUsed from "$lib/ToolsUsed.svelte";
  import WorkExperience from "$lib/WorkExperience.svelte";
  import CallToActionHome from "$lib/CallToActionHome.svelte";
  import SEO from "$lib/components/SEO.svelte";
</script>

<SEO pageKey="works" />

<main>
  <section class="max-w-5xl mx-auto px-4 md:px-6 py-12 border-b border-stroke">
    <h1 class="font-display text-4xl md:text-5xl font-bold text-ink leading-tight">
      Work & Experience
    </h1>
    <p class="text-sm text-muted mt-4">
      Contracts, full-time roles, and side projects — a full timeline of what I've built and where.
    </p>
  </section>

  <WorkExperience />
  <ToolsUsed />
  <CallToActionHome />
</main>
