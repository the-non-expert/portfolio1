<script>
  // @ts-nocheck

  import querentIcon from "$lib/Images/querentIconNew.png";
  import zicopsIcon from "$lib/Images/zicopsLogo.png";
  import aiesecIcon from "$lib/Images/aiesecIcon.png";
  import digizillaIcon from "$lib/Images/digizillaIcon.png";
  import reactIcon from "$lib/Images/reactIcon.png";

  /**
   * @type {null}
   */
  let selectedId = null;

  /**
   * @param {null} id
   */
  function toggleDescription(id) {
    selectedId = selectedId === id ? null : id;
  }

  const myworkExperience = [
    {
      id: 1,
      title: "Svelte-Kit Developer at",
      companyName: "Querent AI",
      duration: "August 2023 - January 2024",
      logo: querentIcon,
      description:
        "As Project Manager for Querent's offline desktop product using SvelteKit, I established development standards for the team, introduced KPIs, and conducted weekly code reviews. I also implemented a multi-layered MVC backend with NestJS and TypeScript, including user authentication and registration using OAuth, and ensured quality through Jest testing.",
    },
    {
      id: 2,
      title: "React & Next Developer at ",
      companyName: "Zicops",
      duration: "December 2022 - June 2023",
      logo: zicopsIcon,
      description:
        "As a Front-End Engineer, I developed key features for our product website using ReactJS, contributing over 30% of the code for the MVP. I also worked with Golang, Cassandra, and GraphQL to maintain and test APIs. Additionally, I learned and implemented Atomic State Management to create lightweight features for the main product.",
    },

    {
      id: 3,
      title: "MERN Freelancer,",
      companyName: "Self-Employed",
      duration: "December 2021 - December 2022",
      logo: reactIcon,
      description:
        "I developed an e-commerce website for a local business with an integrated payment portal and Redux State Management, leading to a 35% increase in turnover within a year. Additionally, I created landing pages using Spring in Java and JDBC with PostgreSQL for various industries, supporting the local economy post-COVID-19. I also worked with Spring Boot and JVC in the Spring framework to create and deploy server-side applications.",
    },
    {
      id: 4,
      title: "Local Committee President at",
      companyName: "AIESEC in Bhubaneswar",
      duration: "February 2021 - January 2023",
      logo: aiesecIcon,
      description:
        "As a leader at AIESEC in Bhubaneswar, a voluntary organization aligned with the Sustainable Development Goals, I manage a local committee of 80+ members. My role includes overseeing virtual event delivery, fostering a productive work environment, and leading a team of 7 Vice Presidents across departments such as Sales, Business Development, Marketing, and HR.",
    },
    {
      id: 5,
      title: "Front-End Intern at",
      companyName: "Digizilla,Cairo",
      duration: "May 2019 - August 2019",
      logo: digizillaIcon,
      description:
        "At Digizilla, one of Egypt's fastest-growing startups and an official Odoo ERP partner, my role involved debugging and redesigning a website from scratch. Key achievement: Successfully launched a fully functional website for a different project.",
    },
  ];
</script>

<div class="w-full bg-[#F5F5F1] md:p-20 md:px-32 p-4 pt-20">
  <p class="text-3xl">Working Experience</p>
  <p class="text-xs">(Please Click on it)</p>

  <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each myworkExperience as experience (experience.id)}
      <div class="flex flex-col gap-4 items-start">
        <div class="flex gap-4 items-center">
          <img
            src={experience.logo}
            alt=""
            class="w-10 h-10 object-contain p-2 bg-white rounded-xl"
          />
          <div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <p
              class="text-lg cursor-pointer hover:text-xl"
              on:click={() => toggleDescription(experience.id)}
            >
              {experience.title}<span class="font-bold pl-1"
                >{experience.companyName}</span
              >
            </p>
            <p class="text-gray-400 text-sm">{experience.duration}</p>
          </div>
        </div>
        {#if selectedId === experience.id}
          <div class="p-2 mt-2 border rounded-lg">
            <p class="text-sm text-gray-600">{experience.description}</p>
          </div>
        {/if}
        <div class="border w-full md:w-10/12" />
      </div>
    {/each}
  </div>
</div>
