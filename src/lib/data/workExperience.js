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
// import addyIcon from "$lib/Images/AddyFitnessLogo2.png";
import omtxIcon from "$lib/Images/omLogo.png";
import svelteIcon from "$lib/Images/SvelteLogo.png";
import sikhaidIcon from "$lib/Images/sikhaidLogo.png";
import humanaisssanceIcon from "$lib/Images/Humanaisance.png";
import toondemyIcon from "$lib/Images/ToondemyLogo.png";
import aartiIcon from "$lib/Images/AartiJewellersLogo.png";
const roxfordIcon = svelteIcon; // TODO: Replace with actual Roxford Healthcare logo

export const workExperience = [
  {
    id: 13,
    role: "Full Stack Developer & Context Engineer",
    company: "Humanaissance (Contract)",
    duration: "September 2025 - April 2026",
    location: "Remote",
    countryFlag: "🇸🇬",
    logo: humanaisssanceIcon,
    technologies: ["SvelteKit", "TypeScript", "Tailwind CSS", "Canvas API", "CSS Animations", "Claude API", "SEO", "GEO"],
    achievements: [
      "Custom CMS with full admin control over all customer-facing content",
      "Complex animations built entirely through code, Canvas, and CSS",
      "Custom appointment booking flow with 100% admin control",
      "Multiple Claude agents and skills for animations and web design",
      "Full SEO and Generative Engine Optimisation package implemented"
    ],
    description:
      "Delivered a complete, bespoke web platform for a Singapore-based client — from a custom Content Management System to intricate code-driven animations using Canvas and CSS. Built a custom appointment booking flow with full admin control, a proper admin portal with handover documentation, and multiple Claude AI agents and knowledge graphs for long-term context management. Implemented a full SEO and Generative Engine Optimisation strategy for organic and targeted discovery.",
    url: "https://www.humanaissance.com"
  },
  {
    id: 14,
    role: "Full Stack Developer & Web Designer",
    company: "Toondemy Preschool (Contract)",
    duration: "April 2026 - April 2026",
    location: "India",
    countryFlag: "🇮🇳",
    logo: toondemyIcon,
    technologies: ["SvelteKit", "Tailwind CSS", "TypeScript", "SEO", "GEO", "Web Design"],
    achievements: [
      "Complete website delivered end-to-end",
      "Full SEO package for organic discovery",
      "Generative Engine Optimisation strategies implemented",
      "Minimalistic design to maximise user dwell time"
    ],
    description:
      "Designed and developed a complete website for Toondemy Preschool with a focus on minimalistic, engagement-driven design to maximise time-on-site. Implemented a full SEO package alongside Generative Engine Optimisation strategies to drive organic discovery and support business growth.",
    url: "https://www.toondemypreschool.com"
  },
  {
    id: 15,
    role: "Frontend Developer",
    company: "Aarti Jewellers (Contract)",
    duration: "May 2025 - June 2025",
    location: "India",
    countryFlag: "🇮🇳",
    logo: aartiIcon,
    darkBg: true,
    technologies: ["SvelteKit", "Tailwind CSS", "TypeScript", "REST APIs", "Web Design"],
    achievements: [
      "Custom API integration for live gold and silver prices",
      "Bilingual design in Hindi and English for local reach",
      "Informative, trust-building design for local customers"
    ],
    description:
      "Built a frontend for Aarti Jewellers featuring a custom API integration to display live gold and silver prices in the Cuttack market. Designed the interface bilingually in Hindi and English to connect with local customers, with an informative layout focused on building trust and driving footfall.",
    url: "https://www.sriaartijewellers.com/"
  },
  {
    id: 16,
    role: "Full Stack Developer",
    company: "SikhAid NGO (Contract)",
    duration: "February 2025 - May 2025",
    location: "India",
    countryFlag: "🇮🇳",
    logo: sikhaidIcon,
    technologies: ["SvelteKit", "TypeScript", "Tailwind CSS", "Firebase", "Razorpay Webhooks"],
    achievements: [
      "Full-stack SvelteKit application with admin portal",
      "Custom payment source-tracking algorithm for smarter marketing budget allocation",
      "Razorpay webhook integration for real-time payment processing"
    ],
    description:
      "Implemented a full-stack SvelteKit application for SikhAid NGO, including a complete admin portal for content updates. Built a custom payment tracking algorithm using Razorpay webhooks to identify the marketing source of each donation, enabling the team to distribute their marketing budget more intelligently.",
    url: "https://www.sikhaid.ngo"
  },
  // {
  //   id: 1,
  //   role: "Full-Stack Developer & Interim COO",
  //   company: "Addy Fitness",
  //   duration: "January 2025 - Present",
  //   location: "India",
  //   countryFlag: "🇮🇳",
  //   logo: addyIcon,
  //   technologies: ["Python FastAPI", "PostgreSQL", "SvelteKit", "AWS EC2", "GitHub Actions"],
  //   achievements: [
  //     "Led entire backend system development",
  //     "Implemented CI/CD pipeline with 99.9% uptime",
  //     "Managing cross-functional team of 12+"
  //   ],
  //   description:
  //     "Leading technical strategy and full-stack development for a comprehensive fitness platform. Built scalable Python FastAPI backend with PostgreSQL database, responsive SvelteKit frontend, and AWS deployment infrastructure. Currently serving as Interim COO while maintaining hands-on development responsibilities.",
  //   url: "https://www.addyfitness.com"
  // },
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
    url: "https://www.omtx.ai"
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
    url: "https://www.roxfordhealthcare.com"
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
    url: "https://www.querent.xyz"
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