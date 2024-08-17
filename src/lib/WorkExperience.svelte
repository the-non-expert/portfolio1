<script>
  import querentIcon from "$lib/Images/querentIconNew.png";
  import zicopsIcon from "$lib/Images/zicopsLogo.png";
  import aiesecIcon from "$lib/Images/aiesecIcon.png";
  import digizillaIcon from "$lib/Images/digizillaIcon.png";
  import reactIcon from "$lib/Images/reactIcon.png";

  const myworkExperience = [
    {
      id: 1,
      title: "Svelte-Kit Developer at",
      companyName: "Querent AI",
      duration: "August 2023 - January 2024",
      logo: querentIcon,
    },
    {
      id: 2,
      title: "React & Next Developer at ",
      companyName: "Zicops",
      duration: "December 2022 - June 2023",
      logo: zicopsIcon,
    },

    {
      id: 3,
      title: "MERN Freelancer,",
      companyName: "Self-Employed",
      duration: "December 2021 - December 2022",
      logo: reactIcon,
    },
    {
      id: 4,
      title: "Local Committee President at",
      companyName: "AIESEC in Bhubaneswar",
      duration: "February 2021 - January 2023",
      logo: aiesecIcon,
    },
    {
      id: 5,
      title: "Front-End Intern at",
      companyName: "Digizilla,Cairo",
      duration: "May 2019 - August 2019",
      logo: digizillaIcon,
    },
  ];
</script>

<div class="w-full bg-[#F5F5F1] md:p-20 md:px-32 p-4 pt-20">
  <p class="text-3xl">Working Experience</p>

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
            <p class="text-lg">
              {experience.title}<span class="font-bold pl-1"
                >{experience.companyName}</span
              >
            </p>
            <p class="text-gray-400 text-sm">{experience.duration}</p>
          </div>
        </div>
        <div class="border w-full md:w-10/12" />
      </div>
    {/each}
  </div>
</div>
