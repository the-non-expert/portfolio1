/**
 * Work Experience Data
 * Centralized data source for all professional experiences
 * Based on LinkedIn profile chronology (latest first)
 */

// Company logo imports
import querentIcon from "$lib/Images/querentIconNew.png";
import zicopsIcon from "$lib/Images/zicopsLogo.png";
import aiesecIcon from "$lib/Images/aiesecIcon.png";
import digizillaIcon from "$lib/Images/digizillaIcon.png";
import reactIcon from "$lib/Images/reactIcon.png";
import addyIcon from "$lib/Images/AddyFitnessLogo2.png";
import omtxIcon from "$lib/Images/omLogo.png";
import svelteIcon from "$lib/Images/SvelteLogo.png";
const roxfordIcon = svelteIcon; // TODO: Replace with actual Roxford Healthcare logo

export const workExperience = [
  {
    id: 1,
    role: "Full-Stack Developer & Interim COO",
    company: "Addy Fitness",
    duration: "January 2025 - Present",
    location: "India",
    countryFlag: "🇮🇳",
    logo: addyIcon,
    technologies: ["Python FastAPI", "PostgreSQL", "SvelteKit", "AWS EC2", "GitHub Actions"],
    achievements: [
      "Led entire backend system development",
      "Implemented CI/CD pipeline with 99.9% uptime",
      "Managing cross-functional team of 12+"
    ],
    description:
      "Leading technical strategy and full-stack development for a comprehensive fitness platform. Built scalable Python FastAPI backend with PostgreSQL database, responsive SvelteKit frontend, and AWS deployment infrastructure. Currently serving as Interim COO while maintaining hands-on development responsibilities.",
  },
  {
    id: 2,
    role: "SvelteKit Developer",
    company: "OM Therapeutics (Contract)",
    duration: "October 2024 - January 2025",
    location: "Remote",
    countryFlag: "🇺🇸",
    logo: omtxIcon,
    technologies: ["SvelteKit", "TypeScript", "Tailwind CSS", "JavaScript", "FastAPI", "PostgreSQL"],
    achievements: [
      "40% codebase contribution",
      "Complex UI structures delivery",
      "Cross-functional team collaboration",
      "FastAPI integration experience"
    ],
    description:
      "Developed dynamic functionalities for a full-fledged web platform, ensuring seamless user experiences and JavaScript integrations. Tackled complex UI structures while delivering scalable, maintainable solutions. Participated in code reviews and gained valuable insights into UX design and cross-functional workflows.",
  },
  {
    id: 3,
    role: "Full-stack Developer",
    company: "Roxford Healthcare Ltd.",
    duration: "March 2024 - August 2024",
    location: "Remote",
    countryFlag: "🇬🇧",
    logo: roxfordIcon,
    technologies: ["SvelteKit", "Tailwind CSS", "TypeScript", "Cloud Firestore", "Web Design"],
    achievements: [
      "Sole developer on project",
      "6-month contract delivered on time",
      "Enhanced digital presence for pharmaceutical company"
    ],
    description:
      "Designed and developed a comprehensive web platform for showcasing pharmaceutical products online. Served as the sole developer managing end-to-end development from frontend UI/UX to backend integration and database management with Firestore.",
  },
  {
    id: 4,
    role: "Svelte-Kit Developer",
    company: "Querent AI",
    duration: "August 2023 - December 2023",
    location: "India",
    countryFlag: "🇮🇳",
    logo: querentIcon,
    technologies: ["SvelteKit", "Tailwind CSS", "TypeScript", "NestJS"],
    achievements: [
      "Company's first-ever Svelte project",
      "Frontend foundation development",
      "Scalable architecture implementation"
    ],
    description:
      "Part-time role developing the frontend foundation for the company's UI platform using SvelteKit. Led the company's first-ever Svelte project, delivering a seamless and intuitive user experience with robust and scalable architecture.",
  },
  {
    id: 5,
    role: "React Developer",
    company: "Zicops",
    duration: "December 2022 - June 2023",
    location: "India",
    countryFlag: "🇮🇳",
    logo: zicopsIcon,
    technologies: ["ReactJS", "GraphQL", "CSS", "State Management", "Cassandra"],
    achievements: [
      "Led front-end development of marketplace platform",
      "30% MVP codebase contribution",
      "Cross-functional team collaboration"
    ],
    description:
      "Designed and implemented new user interfaces for web applications, focusing on performance and user experience. Led front-end development of a marketplace-like platform with seamless design-functionality integration using React, GraphQL, and Cassandra.",
  },
  {
    id: 6,
    role: "Full-Stack Freelance Developer",
    company: "Self-Employed",
    duration: "December 2021 - December 2022",
    location: "India",
    countryFlag: "🇮🇳",
    logo: reactIcon,
    technologies: ["MERN Stack", "Redux", "Spring Boot", "PostgreSQL", "Payment APIs"],
    achievements: [
      "35% business growth for e-commerce client",
      "Built multiple industry landing pages",
      "Deployed server-side applications"
    ],
    description:
      "Developed an e-commerce website for a local business with integrated payment portal and Redux State Management, leading to a 35% increase in turnover within a year. Created landing pages using Spring in Java and JDBC with PostgreSQL for various industries, supporting the local economy post-COVID-19.",
  },
  {
    id: 7,
    role: "Local Committee President",
    company: "AIESEC in Bhubaneswar",
    duration: "February 2021 - January 2022",
    location: "India",
    countryFlag: "🇮🇳",
    logo: aiesecIcon,
    technologies: ["Leadership", "Project Management", "Event Delivery", "Team Management"],
    achievements: [
      "Managed 80+ member organization",
      "Led 7 Vice Presidents across departments",
      "Virtual event delivery success"
    ],
    description:
      "Led AIESEC in Bhubaneswar, managing a local committee of 80+ members. Oversaw virtual event delivery, fostered productive work environment, and managed a team of 7 Vice Presidents across departments such as Sales, Business Development, Marketing, and HR.",
  },
  {
    id: 8,
    role: "National Support Team, B2C",
    company: "AIESEC in India",
    duration: "January 2020 - December 2020",
    location: "India",
    countryFlag: "🇮🇳",
    logo: aiesecIcon,
    technologies: ["Digital Marketing", "Social Media Strategy", "Campaign Planning", "Lead Generation"],
    achievements: [
      "Managed 32 local offices nationally",
      "3000+ professional internships annually",
      "2500+ members management"
    ],
    description:
      "Worked in national office managing 32 local offices across India. Created strategies for social media, generated leads through digital campaigns, designed content for social platforms, and planned campaigns for events supporting 3000+ annual internships across 120+ countries.",
  },
  {
    id: 9,
    role: "Team Leader, Sales Department",
    company: "AIESEC in Bhubaneswar",
    duration: "January 2020 - July 2020",
    location: "India",
    countryFlag: "🇮🇳",
    logo: aiesecIcon,
    technologies: ["Sales", "Team Leadership", "Client Relations", "Presentations"],
    achievements: [
      "Led 2-person team",
      "Product reputation management",
      "Client pitching success"
    ],
    description:
      "Led sales team of 2 members, pitching AIESEC products to clients and creating presentable reputation for AIESEC India's offerings. Managed team operations and maintained brand voice consistency.",
  },
  {
    id: 10,
    role: "Sales Team Member",
    company: "AIESEC in Bhubaneswar",
    duration: "July 2019 - January 2020",
    location: "India",
    countryFlag: "🇮🇳",
    logo: aiesecIcon,
    technologies: ["Sales", "Client Relations", "Brand Management"],
    achievements: [
      "Product pitching success",
      "Brand voice maintenance",
      "Client relationship building"
    ],
    description:
      "Pitched AIESEC products to clients while maintaining brand reputation and ensuring no de-branding occurred. Focused on creating positive client experiences and upholding AIESEC India's professional standards.",
  },
  {
    id: 11,
    role: "Frontend Developer Intern",
    company: "Digizilla, Cairo",
    duration: "May 2019 - August 2019",
    location: "Egypt",
    countryFlag: "🇪🇬",
    logo: digizillaIcon,
    technologies: ["HTML", "CSS", "JavaScript", "Website Redesign", "Debugging"],
    achievements: [
      "Redesigned website from scratch",
      "Successfully launched functional website",
      "Worked at Egypt's fastest-growing startup"
    ],
    description:
      "At Digizilla, one of Egypt's fastest-growing startups and official Odoo ERP partner, debugged and redesigned websites from scratch. Key achievement: Successfully launched a fully functional website for a different project.",
  },
  {
    id: 12,
    role: "Content Writer",
    company: "Freelance",
    duration: "July 2017 - August 2020",
    location: "India",
    countryFlag: "🇮🇳",
    logo: reactIcon, // Using generic icon for freelance content writing
    technologies: ["SEO Writing", "Content Strategy", "Editorial Leadership", "Article Writing"],
    achievements: [
      "3+ years experience",
      "Multiple client management",
      "Chief Editor role"
    ],
    description:
      "Worked with multiple clients providing SEO-based article writing and serving as Chief Editor. Developed content strategies and maintained editorial standards across various projects over 3+ years.",
  }
];

// Export count for component reference
export const experienceCount = workExperience.length;