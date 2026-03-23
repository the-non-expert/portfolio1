<script lang="ts">
  import CallToActionHome from "$lib/CallToActionHome.svelte";
  import Testimonials from "$lib/Testimonials.svelte";
  import WhatIBring from "$lib/WhatIBring.svelte";
  import HomePageHero from "$lib/HomePageHero.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { generatePersonSchema, generateWebsiteSchema, generateProfessionalServiceSchema } from "$lib/utils/seo";
  
  // Generate structured data for homepage
  const personSchema: Record<string, any> = generatePersonSchema();
  const websiteSchema: Record<string, any> = generateWebsiteSchema();
  const serviceSchema: Record<string, any> = generateProfessionalServiceSchema();
  const combinedSchema: string = JSON.stringify([personSchema, websiteSchema, serviceSchema]);
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
    <WhatIBring />
  </section>
  <section>
    <Testimonials />
  </section>
  <section>
    <CallToActionHome />
  </section>
</main>
