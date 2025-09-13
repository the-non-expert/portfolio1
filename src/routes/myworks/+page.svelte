<script lang="ts">
  import myImage from "$lib/Images/MyImage.jpeg";
  import MySocialMediaDetails from "$lib/CommonComponents/MySocialMediaDetails.svelte";
  import ToolsUsed from "$lib/ToolsUsed.svelte";
  import WorkExperience from "$lib/WorkExperience.svelte";
  import CallToActionHome from "$lib/CallToActionHome.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { generatePortfolioSchema } from "$lib/utils/seo.js";
  
  interface Project {
    name: string;
    description: string;
    websiteLink: string;
    image: string;
    technologies: string[];
  }
  
  // Projects data with updated descriptions highlighting full-stack expertise
  const projects: Project[] = [
    {
      name: "Addy Fitness Platform",
      description: "Full-stack fitness platform built with Python FastAPI backend, PostgreSQL database, and SvelteKit frontend. Deployed using CI/CD pipelines via GitHub Actions to AWS EC2 with Nginx configuration.",
      websiteLink: "https://www.addyfitness.com/",
      image: "/project-images/addy-fitness.png",
      technologies: ["Python FastAPI", "PostgreSQL", "SvelteKit", "AWS EC2", "GitHub Actions", "Nginx"]
    },
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
  <section class="md:w-full md:flex md:justify-center md:gap-32 md:p-10 p-5">
    <div class="">
      <img
        src={myImage}
        alt="Ayush Jhunjhunwala - Professional headshot"
        class="md:w-64 md:h-64 w-44 h-44 object-cover rounded-full"
      />
    </div>
    <div class="md:flex md:flex-col md:m-0 justify-evenly mt-5">
      <h1 class="md:text-5xl text-4xl font-light">Ayush Jhunjhunwala</h1>
      <div>
        <p class="text-xl mt-3">
          Full-Stack Developer & Tech Leader based out of Cuttack, India
        </p>
        <p class="mt-2 text-gray-500">Building scalable systems with Python FastAPI, SvelteKit & AWS</p>
      </div>
      <div class="mt-5">
        <MySocialMediaDetails />
      </div>
    </div>
  </section>

  <ToolsUsed />
  <WorkExperience />
  <CallToActionHome />
</main>
