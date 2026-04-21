<script lang="ts">
  import CallToActionHome from "$lib/CallToActionHome.svelte";
  import Testimonials from "$lib/Testimonials.svelte";
  import WhatIBring from "$lib/WhatIBring.svelte";
  import HomePageHero from "$lib/HomePageHero.svelte";
  import FAQ from "$lib/FAQ.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { generatePersonSchema, generateWebsiteSchema, generateProfessionalServiceSchema, generateFAQSchema } from "$lib/utils/seo";
  import { homeFAQItems } from "$lib/data/faq";

  const personSchema: Record<string, any> = generatePersonSchema();
  const websiteSchema: Record<string, any> = generateWebsiteSchema();
  const serviceSchema: Record<string, any> = generateProfessionalServiceSchema();
  const faqSchema: Record<string, any> = generateFAQSchema(homeFAQItems);
  const combinedSchema: string = JSON.stringify([personSchema, websiteSchema, serviceSchema, faqSchema]);
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
    <FAQ
      items={homeFAQItems}
      heading="Common questions"
      label="FAQ"
      id="faq"
    />
  </section>
  <section>
    <CallToActionHome />
  </section>
</main>
