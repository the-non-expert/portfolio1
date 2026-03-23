<script lang="ts">
  import myImage from "$lib/Images/MyImage.jpeg";
  import MySocialMediaDetails from "$lib/CommonComponents/MySocialMediaDetails.svelte";
  import ToolsUsed from "$lib/ToolsUsed.svelte";
  import WorkExperience from "$lib/WorkExperience.svelte";
  import CallToActionHome from "$lib/CallToActionHome.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { generatePortfolioSchema } from "$lib/utils/seo";

  interface Project {
    name: string;
    description: string;
    websiteLink: string;
    image: string;
    technologies: string[];
  }

  const projects: Project[] = [
    {
      name: "OM Therapeutics",
      description: "Production-grade web application with 40% codebase contribution. Built scalable SvelteKit architecture with optimized SSR performance and comprehensive SEO implementation.",
      websiteLink: "https://www.omtx.ai/",
      image: "/project-images/om-therapeutics.png",
      technologies: ["SvelteKit", "TypeScript", "SSR", "SEO Optimization"]
    },
    {
      name: "Zicops MVP",
      description: "Contributed 30% of MVP codebase using ReactJS frontend with Golang and Cassandra backend. Implemented GraphQL APIs and multi-layered MVC architecture with Jest testing.",
      websiteLink: "https://zicops.com/",
      image: "/project-images/zicops.png",
      technologies: ["ReactJS", "Golang", "Cassandra", "GraphQL", "Jest"]
    },
    {
      name: "E-commerce Solution",
      description: "Full-stack e-commerce platform with integrated payment portal and Redux state management. Achieved 35% business growth within one year for local business client.",
      websiteLink: "#",
      image: "/project-images/ecommerce.png",
      technologies: ["MERN Stack", "Redux", "Payment Integration", "PostgreSQL"]
    },
    {
      name: "Alphabet List NPM Package",
      description: "Open-source npm package for filtering and navigating lists by starting letter. Demonstrates modern JavaScript development and package distribution.",
      websiteLink: "https://alphabet-list-svelte-demo.netlify.app/",
      image: "/project-images/alphabet-list.png",
      technologies: ["JavaScript", "NPM", "Svelte", "Package Development"]
    }
  ];

  const portfolioSchema: string = JSON.stringify(generatePortfolioSchema(projects));
</script>

<SEO
  pageKey="works"
  structuredData={portfolioSchema}
/>

<main>
  <section class="max-w-5xl mx-auto px-4 md:px-6 py-10 flex flex-col items-center text-center">
    <div class="shrink-0">
      <img
        src={myImage}
        alt="Ayush Jhunjhunwala"
        class="w-32 h-32 md:w-44 md:h-44 object-cover rounded-full border border-stroke"
      />
    </div>
    <div class="mt-6">
      <h1 class="font-display text-4xl font-bold text-ink">Ayush Jhunjhunwala</h1>
      <p class="text-base text-ink mt-2">Engineer. Leader. Builder.</p>
      <p class="text-sm text-muted mt-1">Cuttack, India — Python FastAPI, SvelteKit, Shopify & AWS</p>
      <div class="mt-5 flex justify-center">
        <MySocialMediaDetails />
      </div>
    </div>
  </section>

  <ToolsUsed />
  <WorkExperience />
  <CallToActionHome />
</main>
