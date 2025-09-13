<script lang="ts">
  import MySocialMediaDetails from "$lib/CommonComponents/MySocialMediaDetails.svelte";
  import SEO from "$lib/components/SEO.svelte";
  
  // Contact-specific structured data
  const contactSchema: string = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Hire Ayush Jhunjhunwala - Full-Stack Tech Leader",
    "description": "Contact Ayush Jhunjhunwala for technical leadership and full-stack development. Expert in Python FastAPI backends, SvelteKit frontends, AWS deployments, and team management.",
    "mainEntity": {
      "@type": "Person",
      "name": "Ayush Jhunjhunwala",
      "jobTitle": "Full-Stack Developer & Tech Leader",
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
  <section class="w-full md:p-20 py-10 md:px-40 p-4">
    <h1 class="text-6xl">
      Ready for technical leadership or full-stack development? Let's build something amazing together
    </h1>
    <p class="text-gray-400 mt-5">
      Available for technical leadership roles, full-stack development projects, or consulting. 
      Expert in Python FastAPI, SvelteKit, AWS deployments & team management.
    </p>

    <div class="mt-5">
      <MySocialMediaDetails />
    </div>
  </section>

  <section
    class="bg-[#F4F5F1] md:p-20 p-4 w-full flex md:flex-row flex-col justify-center gap-10"
  >
    <article class="bg-white p-5 md:w-4/12 md:h-fit w-full rounded-xl">
      <h2 class="text-3xl font-semibold">Technical Leadership & Development</h2>
      <p class="mt-5">
        Looking for a tech leader or full-stack developer? I specialize in building scalable 
        Python FastAPI backends, responsive SvelteKit frontends, and managing technical teams. 
        Currently serving as Interim COO while leading development at Addy Fitness.
      </p>
    </article>
    <form class="bg-white p-5 md:w-4/12 w-full rounded-xl">
      <div class="flex flex-col gap-2">
        <label for="fullname" class="font-semibold">Full Name</label>
        <input
          id="fullname"
          name="fullname"
          type="text"
          placeholder="ayush jhunjhunwala"
          class="bg-[#F4F5F1] p-2 w-full rounded-xl"
          required
        />
      </div>
      <div class="flex flex-col gap-2 mt-5">
        <label for="email" class="font-semibold">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="ayushjhun13@gmail.com"
          class="bg-[#F4F5F1] p-2 w-full rounded-xl"
          required
        />
      </div>
      <div class="flex flex-col gap-2 mt-5">
        <label for="project-type" class="font-semibold">Project Type</label>
        <select id="project-type" name="project-type" class="bg-[#F4F5F1] p-2 w-full rounded-xl">
          <option value="technical-leadership">Technical Leadership Role</option>
          <option value="full-stack-development">Full-Stack Development Project</option>
          <option value="backend-development">Python FastAPI Backend</option>
          <option value="frontend-development">SvelteKit Frontend</option>
          <option value="system-architecture">System Architecture Consulting</option>
          <option value="team-management">Team Management & Mentoring</option>
        </select>
      </div>
      <div class="flex flex-col gap-2 mt-5">
        <label for="description" class="font-semibold">Project Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe your technical requirements, team size, timeline, or leadership needs..."
          class="bg-[#F4F5F1] p-2 w-full rounded-xl"
          rows="4"
          required
        />
      </div>
      <button type="submit" class="bg-black text-white px-4 py-2 rounded-xl mt-10"
        >Get In Touch</button
      >
    </form>
  </section>
</main>
