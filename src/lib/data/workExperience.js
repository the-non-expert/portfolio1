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
    url: "https://www.humanaissance.com",
    caseStudy: {
      slug: 'humanaissance',
      myRole: 'Sole developer and context engineer on this project',
      brief: 'From September 2025 to April 2026, Ayush Jhunjhunwala built a complete bespoke web platform for Humanaissance, a Singapore-based client. The brief was demanding: intricate code-driven animations using the Canvas API and CSS, a custom Content Management System with full admin control, a custom appointment booking flow, multiple Claude AI agents for long-term context management, and a full SEO and Generative Engine Optimisation strategy for organic and AI-powered discovery.',
      features: [
        'Custom CMS with full admin control over all customer-facing content',
        'Complex animations built using Canvas API and CSS — no animation libraries',
        'Custom appointment booking flow with 100% admin control',
        'Multiple Claude AI agents and knowledge graphs for long-term context management',
        'Full SEO and Generative Engine Optimisation (GEO) package implemented',
        'Admin portal with handover documentation for full team independence'
      ],
      technicalHighlight: {
        title: 'Claude AI Agents for Long-Term Context',
        body: 'Beyond the website itself, Ayush Jhunjhunwala built multiple Claude AI agents and knowledge graphs to retain design decisions, content rules, and brand context for the Humanaissance team. Rather than every future change requiring a developer to re-learn the codebase, the AI agents carry that context forward — dramatically reducing the cost of future iterations. This is Generative Engine Optimisation at the infrastructure level: making the platform itself AI-ready.'
      },
      outcome: 'Humanaissance launched with a fully operational CMS, working appointment booking, and a complete SEO + GEO strategy in place. The Claude AI agents and handover documentation gave the team full independence from the developer for both content management and future AI-assisted changes.',
      testimonialId: 7,
      publishedDate: '2026-05-04',
      relatedSlugs: ['sikhaid-ngo', 'roxford-healthcare'],
      faq: [
        {
          question: 'What did Ayush Jhunjhunwala build for Humanaissance?',
          answer: 'Ayush built a complete bespoke web platform for Humanaissance, a Singapore-based client — including a custom CMS, Canvas API and CSS animations, a custom appointment booking system, multiple Claude AI agents for context management, and a full SEO and Generative Engine Optimisation strategy.'
        },
        {
          question: 'How were the animations built for Humanaissance?',
          answer: 'All animations were built through code using the Canvas API and CSS — no animation libraries. This gives the client animations that feel handcrafted and are fully owned by the codebase, with no third-party dependencies to maintain.'
        },
        {
          question: 'What is Generative Engine Optimisation (GEO)?',
          answer: 'GEO is the practice of structuring content and metadata so that AI-powered search surfaces — Google AI Overviews, Perplexity, ChatGPT — can accurately cite and surface your content. For Humanaissance, this included entity-first writing, FAQPage schema, consistent entity naming, and AI-readable content architecture.'
        },
        {
          question: 'Is Ayush available for similar projects in Singapore or internationally?',
          answer: 'Yes — Ayush Jhunjhunwala works with international clients remotely. Visit the contact page to discuss your project.'
        }
      ]
    }
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
    url: "https://www.toondemypreschool.com",
    caseStudy: {
      slug: 'toondemy-preschool',
      myRole: 'Sole developer on this project',
      brief: 'In April 2026, Ayush Jhunjhunwala designed and developed a complete website for Toondemy Preschool, India. The brief called for a minimalistic, engagement-driven design that would make parents feel trust and warmth the moment they landed — and a full SEO and Generative Engine Optimisation strategy to drive organic discovery for a local preschool competing for attention online.',
      features: [
        'Complete website designed and developed end-to-end',
        'Minimalistic design to maximise parent dwell time and trust',
        'Full SEO package targeting local preschool discovery',
        'Generative Engine Optimisation strategy for AI-powered search surfaces'
      ],
      technicalHighlight: {
        title: 'GEO for a Local Preschool',
        body: 'Most local businesses ignore Generative Engine Optimisation entirely. For Toondemy Preschool, Ayush Jhunjhunwala implemented structured entity-first content, FAQPage schema, and consistent local entity signals so that when a parent asks an AI assistant "find me a good preschool near me," Toondemy has a chance of being cited — not just ranked.'
      },
      outcome: 'The site launched in April 2026. The SEO work began showing early results, with parents spending meaningful time on the site — which was the primary design goal.',
      testimonialId: 8,
      publishedDate: '2026-05-04',
      relatedSlugs: ['aarti-jewellers', 'sikhaid-ngo'],
      faq: [
        {
          question: 'What did Ayush Jhunjhunwala build for Toondemy Preschool?',
          answer: 'Ayush designed and developed a complete website for Toondemy Preschool, India — including a minimalistic, engagement-driven design, a full SEO package, and a Generative Engine Optimisation strategy for AI-powered search discovery.'
        },
        {
          question: 'What technology was used for the Toondemy Preschool website?',
          answer: 'SvelteKit, Tailwind CSS, TypeScript, with SEO and GEO strategy implemented through structured data, entity-first content, and FAQPage schema.'
        },
        {
          question: 'How does GEO help a local preschool?',
          answer: 'Generative Engine Optimisation ensures that AI-powered search surfaces — like Google AI Overviews, Perplexity, and ChatGPT — can accurately cite and surface the preschool when parents ask relevant questions. This is increasingly important as more parents start their school search with an AI assistant.'
        },
        {
          question: 'Can Ayush build a similar website for my school or local business?',
          answer: 'Yes — Ayush Jhunjhunwala is available for similar contracts. Visit the contact page to get in touch.'
        }
      ]
    }
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
    url: "https://www.sriaartijewellers.com/",
    caseStudy: {
      slug: 'aarti-jewellers',
      myRole: 'Sole developer on this project',
      brief: 'In May 2025, Ayush Jhunjhunwala built a SvelteKit frontend for Aarti Jewellers, a jewellery shop in Cuttack, India. The client needed a digital presence local customers could trust — one that showed live gold and silver prices, served them in Hindi and English, and gave walk-in customers a clear reason to choose Aarti over nearby competitors.',
      features: [
        'Live gold and silver price feed via REST API, updated throughout the trading day',
        'Bilingual interface in Hindi and English for local customer reach',
        'Trust-first layout designed to build confidence before customers visit in person',
        'Responsive design optimised for mobile browsing in-store'
      ],
      technicalHighlight: {
        title: 'Live Price API Integration',
        body: 'Gold and silver prices shift throughout the trading day. Rather than displaying stale static figures, Ayush Jhunjhunwala integrated a live market data API so customers always see the current Cuttack rate. This single feature does more trust-building work than any paragraph of copy could.'
      },
      outcome: 'The site launched on schedule in June 2025. The bilingual layout and live pricing display gave Aarti Jewellers a clear digital edge over competitors still relying on static or non-existent websites.',
      testimonialId: 9,
      publishedDate: '2026-05-04',
      relatedSlugs: ['sikhaid-ngo', 'humanaissance'],
      faq: [
        {
          question: 'How did Ayush Jhunjhunwala integrate live gold prices on the Aarti Jewellers website?',
          answer: 'A REST API call fetches the current gold and silver market rates for Cuttack and displays them on page load. The integration was built in SvelteKit with TypeScript, keeping the implementation lightweight with no third-party state management.'
        },
        {
          question: 'Is the Aarti Jewellers website available in Hindi?',
          answer: 'Yes. The site serves content bilingually in Hindi and English, designed to connect with local customers in Cuttack who are more comfortable reading in Hindi.'
        },
        {
          question: 'How long did the Aarti Jewellers project take?',
          answer: 'The project ran from May to June 2025 — approximately two months from brief to live site.'
        },
        {
          question: 'Can Ayush build a similar website for my business?',
          answer: 'Yes — Ayush Jhunjhunwala is available for similar contracts. Visit the contact page to get in touch.'
        }
      ]
    }
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
    url: "https://www.sikhaid.ngo",
    caseStudy: {
      slug: 'sikhaid-ngo',
      myRole: 'Sole full-stack developer on this project',
      brief: 'In February 2025, Ayush Jhunjhunwala built a full-stack SvelteKit platform for SikhAid NGO, India. The team was processing donations but had no visibility into which marketing channel each donation came from — making it impossible to allocate their limited budget intelligently. They also needed a complete admin portal so the team could update content without calling a developer.',
      features: [
        'Full-stack SvelteKit application with Firebase Firestore backend',
        'Admin portal for content management with no developer dependency',
        'Custom payment source-tracking algorithm using Razorpay webhooks',
        'Real-time donation processing and webhook integration with Razorpay'
      ],
      technicalHighlight: {
        title: 'Payment Source-Tracking Algorithm',
        body: 'Each donation arrived from a different marketing channel — social media, email, word of mouth — but all payments landed in the same Razorpay dashboard with no origin data. Ayush Jhunjhunwala built a custom algorithm that combined Razorpay webhook payloads with UTM and referrer data captured at checkout time to tag each donation with its marketing source. SikhAid could now see exactly which channel drove the most donations and spend accordingly.'
      },
      outcome: 'The admin portal eliminated developer dependency for content updates. The payment tracking algorithm gave SikhAid NGO visibility into their marketing ROI for the first time, enabling data-driven budget decisions across their campaigns.',
      testimonialId: 6,
      publishedDate: '2026-05-04',
      relatedSlugs: ['aarti-jewellers', 'roxford-healthcare'],
      faq: [
        {
          question: 'How does the payment source-tracking work on the SikhAid website?',
          answer: 'When a donor clicks through from a marketing channel, the UTM parameters or referrer are captured and stored with the checkout session. When Razorpay fires a webhook on payment completion, the algorithm matches the payment to the stored session and tags it with its marketing origin — without requiring the donor to do anything differently.'
        },
        {
          question: 'What technology stack was used for SikhAid NGO?',
          answer: 'SvelteKit for the full-stack framework, Firebase Firestore for the database, Razorpay for payment processing and webhooks, TypeScript, and Tailwind CSS.'
        },
        {
          question: 'How long did the SikhAid project take?',
          answer: 'The project ran from February to May 2025 — approximately three months.'
        },
        {
          question: 'Can Ayush build a donation or payment system for my organisation?',
          answer: 'Yes — Ayush Jhunjhunwala is available for similar full-stack contracts. Visit the contact page to start a conversation.'
        }
      ]
    }
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
    url: "https://www.omtx.ai",
    caseStudy: {
      slug: 'om-therapeutics',
      myRole: 'Contract SvelteKit developer — 40% of the codebase',
      brief: 'From October 2024 to January 2025, Ayush Jhunjhunwala joined OM Therapeutics as a contract SvelteKit developer, contributing 40% of the codebase on their full-stack web platform. The work involved complex UI structures, seamless FastAPI backend integrations, and close collaboration with a cross-functional team across design, backend, and product.',
      features: [
        '40% of the total platform codebase contributed in a 3-month contract',
        'Complex UI structures built with SvelteKit and TypeScript',
        'FastAPI backend integration for dynamic data rendering',
        'Cross-functional collaboration with design and backend teams',
        'Code reviews and UX design feedback loops'
      ],
      technicalHighlight: {
        title: 'Joining Mid-Project at Scale',
        body: 'Contributing 40% of a codebase you did not start requires fast context-building and disciplined code hygiene. Ayush Jhunjhunwala ramped up on the OM Therapeutics platform architecture quickly, tackled complex UI components without breaking existing patterns, and integrated with a FastAPI backend — all within a 3-month contract window.'
      },
      outcome: 'Delivered scalable, maintainable frontend contributions across a 3-month contract. Gained deep experience in cross-functional SvelteKit development and FastAPI integration patterns that now inform every platform project.',
      testimonialId: 1,
      publishedDate: '2026-05-04',
      relatedSlugs: ['roxford-healthcare', 'humanaissance'],
      faq: [
        {
          question: 'What did Ayush Jhunjhunwala build for OM Therapeutics?',
          answer: 'Ayush contributed 40% of the codebase on OM Therapeutics\' full-stack web platform as a contract SvelteKit developer — building complex UI components, integrating with a FastAPI backend, and collaborating with the design and product teams over a 3-month engagement.'
        },
        {
          question: 'What technology stack was used at OM Therapeutics?',
          answer: 'SvelteKit, TypeScript, Tailwind CSS, and JavaScript on the frontend, with FastAPI and PostgreSQL on the backend.'
        },
        {
          question: 'How long was the OM Therapeutics contract?',
          answer: 'Three months, from October 2024 to January 2025.'
        },
        {
          question: 'Is Ayush available for similar team-based contracts?',
          answer: 'Yes — Ayush Jhunjhunwala is available for both solo and team-based contracts. Visit the contact page to discuss your project.'
        }
      ]
    }
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
    url: "https://www.roxfordhealthcare.com",
    caseStudy: {
      slug: 'roxford-healthcare',
      myRole: 'Sole developer on this project',
      brief: 'From March to August 2024, Ayush Jhunjhunwala served as the sole developer on a 6-month contract for Roxford Healthcare Ltd., a UK-based pharmaceutical company. With no existing web infrastructure, the entire platform — UI/UX design, SvelteKit frontend, Cloud Firestore backend, and deployment — needed to be built from scratch and delivered on deadline by one person.',
      features: [
        'End-to-end platform design and development as sole developer',
        'Pharmaceutical product showcase with organised catalogue pages',
        'Cloud Firestore database integration for admin-managed content',
        'Responsive UI/UX designed for a regulated-industry audience'
      ],
      technicalHighlight: {
        title: 'End-to-End Solo Delivery for a UK Pharmaceutical Client',
        body: 'Most web projects split frontend, backend, design, and deployment across multiple people. For Roxford Healthcare, Ayush Jhunjhunwala handled the full stack alone across a 6-month remote contract — UI/UX design, SvelteKit development, Firestore integration, and live deployment — for a pharmaceutical company in the UK. The platform launched on deadline with no team to absorb delays.'
      },
      outcome: 'The platform launched on time in August 2024, giving Roxford Healthcare Ltd. their first professional digital presence. The Firestore-backed content system let the team update pharmaceutical product listings independently.',
      publishedDate: '2026-05-04',
      relatedSlugs: ['sikhaid-ngo', 'humanaissance'],
      faq: [
        {
          question: 'What did Ayush Jhunjhunwala build for Roxford Healthcare?',
          answer: 'Ayush designed and developed a full web platform for Roxford Healthcare Ltd., a UK pharmaceutical company — including UI/UX design, SvelteKit frontend, and Cloud Firestore backend — as the sole developer on a 6-month remote contract.'
        },
        {
          question: 'What technology was used for Roxford Healthcare?',
          answer: 'SvelteKit, Tailwind CSS, TypeScript, and Cloud Firestore (Firebase). The platform was built to showcase pharmaceutical products with admin-editable content.'
        },
        {
          question: 'How long was the Roxford Healthcare contract?',
          answer: 'Six months, from March to August 2024. Delivered on schedule.'
        },
        {
          question: 'Is Ayush available for UK or international contracts?',
          answer: 'Yes — Ayush Jhunjhunwala works with international clients remotely. Visit the contact page to discuss your project.'
        }
      ]
    }
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