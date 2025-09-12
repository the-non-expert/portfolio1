<script>
  import CallToActionHome from "$lib/CallToActionHome.svelte";
  import HelpWith from "$lib/HelpWith.svelte";
  import HomePageHero from "$lib/HomePageHero.svelte";
  import WorkExperience from "$lib/WorkExperience.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { generatePersonSchema, generateWebsiteSchema, generateProfessionalServiceSchema } from "$lib/utils/seo.js";
  
  // Generate structured data for homepage
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebsiteSchema();
  const serviceSchema = generateProfessionalServiceSchema();
  const combinedSchema = JSON.stringify([personSchema, websiteSchema, serviceSchema]);
</script>

<SEO 
  pageKey="home" 
  structuredData={combinedSchema}
/>

<main>
  <section>
    <HomePageHero />
  </section>
  <section>
    <WorkExperience />
  </section>
  <section>
    <HelpWith />
  </section>
  <section>
    <CallToActionHome />
  </section>
</main>
