/**
 * Services Data
 * Comprehensive showcase of full-stack development journey
 * From simple websites to production-grade systems
 */

// Import existing icons
import computerIcon from "$lib/Images/computerIcon.svg";
import enterpriseIcon from "$lib/Images/enterprise.svg";
import customIcon from "$lib/Images/custom.svg";

export const serviceAreas = {
  frontend: {
    id: 'frontend',
    title: "Frontend Excellence",
    subtitle: "From simple websites to complex user interfaces",
    description: "Creating responsive, user-centric interfaces that provide seamless experiences across all devices and platforms. Specializing in modern JavaScript frameworks with focus on performance and accessibility.",
    journey: "Started with basic HTML/CSS websites in 2017, evolved to modern SvelteKit applications with TypeScript, advanced state management, and production-grade architecture patterns.",
    skills: [
      "SvelteKit & React Development",
      "TypeScript & JavaScript ES6+", 
      "Responsive Design & Mobile-First",
      "Component Architecture & Reusability",
      "State Management & Performance",
      "SEO Optimization & SSR"
    ],
    technologies: ["SvelteKit", "TypeScript", "Tailwind CSS", "React", "HTML5/CSS3", "JavaScript"],
    projects: [
      { 
        name: "OM Therapeutics Platform", 
        impact: "40% codebase contribution",
        description: "Complex UI structures with seamless user experience",
        technologies: ["SvelteKit", "TypeScript", "Tailwind CSS"],
        emphasis: "primary",
        url: "https://www.omtx.ai"
      },
      { 
        name: "Roxford Healthcare Portal", 
        impact: "Sole frontend developer",
        description: "Complete pharmaceutical product showcase platform",
        technologies: ["SvelteKit", "Firestore", "TypeScript"],
        emphasis: "primary",
        url: "https://www.roxfordhealthcare.com"
      },
      { 
        name: "Querent AI Interface", 
        impact: "Company's first Svelte project",
        description: "Scalable architecture for AI platform frontend",
        technologies: ["SvelteKit", "NestJS", "TypeScript"],
        emphasis: "secondary",
        url: "https://www.querent.xyz"
      }
    ],
    stats: {
      experience: "4+ years",
      projects: "15+",
      frameworks: "5+",
      performance: "90+ Lighthouse scores"
    },
    icon: computerIcon
  },
  
  backend: {
    id: 'backend',
    title: "Backend Systems",
    subtitle: "From basic servers to scalable production APIs",
    description: "Building robust, scalable backend systems that handle real-world traffic and complex business logic with 99.9% uptime reliability. Expert in API design, database optimization, and microservices architecture.",
    journey: "Progressed from simple Spring Boot applications in 2021 to architecting Python FastAPI systems with microservices patterns, handling thousands of concurrent users.",
    skills: [
      "Python FastAPI & RESTful APIs",
      "Database Design & Optimization",
      "Authentication & Security",
      "Microservices Architecture",
      "CI/CD & DevOps Practices",
      "Cloud Deployment & Scaling"
    ],
    technologies: ["Python FastAPI", "PostgreSQL", "MongoDB", "GraphQL", "Docker", "AWS EC2"],
    projects: [
      { 
        name: "Addy Fitness Backend", 
        impact: "Complete system architecture",
        description: "Scalable fitness platform handling user data and workouts",
        technologies: ["Python FastAPI", "PostgreSQL", "AWS"],
        emphasis: "primary",
        url: "https://www.addyfitness.com"
      },
      { 
        name: "E-commerce Platform", 
        impact: "35% business growth achieved",
        description: "Payment integration and inventory management system",
        technologies: ["MERN Stack", "Redux", "PostgreSQL"],
        emphasis: "primary"
      },
      { 
        name: "Zicops Marketplace APIs", 
        impact: "30% MVP contribution",
        description: "Learning platform backend with GraphQL integration",
        technologies: ["Golang", "Cassandra", "GraphQL"],
        emphasis: "secondary"
      }
    ],
    stats: {
      experience: "4+ years",
      uptime: "99.9%",
      apis: "25+",
      databases: "4+ types"
    },
    icon: enterpriseIcon
  },
  
  leadership: {
    id: 'leadership',
    title: "Technical Leadership",
    subtitle: "From individual contributor to team leader & interim COO",
    description: "Leading development teams, making architectural decisions, and driving technical strategy while maintaining hands-on development. Proven track record in scaling teams and delivering complex projects.",
    journey: "Evolved from solo developer to managing 80+ member organizations, leading cross-functional teams, and serving as interim COO while maintaining technical excellence.",
    skills: [
      "Team Leadership & Mentoring",
      "System Architecture Planning", 
      "Code Reviews & Best Practices",
      "Project Delivery Management",
      "Strategic Planning & Execution",
      "Cross-functional Collaboration"
    ],
    technologies: ["Leadership", "Architecture", "DevOps", "Strategy", "Mentoring", "Agile"],
    projects: [
      { 
        name: "Addy Fitness COO Role", 
        impact: "Technical strategy & team leadership",
        description: "Leading 12+ cross-functional team while architecting systems",
        technologies: ["Leadership", "Strategy", "Architecture"],
        emphasis: "primary",
        url: "https://www.addyfitness.com"
      },
      { 
        name: "Querent AI Management", 
        impact: "Established dev standards & KPIs",
        description: "Introduced code reviews and development best practices",
        technologies: ["Team Management", "Code Review", "KPIs"],
        emphasis: "primary",
        url: "https://www.querent.xyz"
      },
      { 
        name: "AIESEC Leadership", 
        impact: "Managed 80+ members across departments",
        description: "Led national and local teams for 3+ years",
        technologies: ["Project Management", "Team Leadership"],
        emphasis: "secondary"
      }
    ],
    stats: {
      experience: "5+ years",
      teamsLed: "6+",
      membersManaged: "80+",
      projectsDelivered: "20+"
    },
    icon: customIcon
  }
};

export const overallStats = {
  totalExperience: "7+",
  companiesWorked: "12+",
  avgCodebaseContribution: "30-40%",
  systemUptime: "99.9%",
  technologiesMastered: "15+",
  projectsCompleted: "25+"
};

export const testimonials = [
  {
    text: "Ayush's technical leadership transformed our development process",
    author: "Team Lead at Querent AI",
    role: "Technical Leadership"
  },
  {
    text: "Delivered exceptional frontend performance with 40% codebase contribution", 
    author: "Project Manager at OM Therapeutics",
    role: "Frontend Development"
  },
  {
    text: "Built robust backend systems that scaled our business by 35%",
    author: "Business Owner",
    role: "Backend Development"
  }
];

// Next steps and future goals
export const futureGoals = {
  shortTerm: [
    "Advanced AWS Solutions Architect certification",
    "Kubernetes & container orchestration expertise",
    "Machine Learning integration in web applications"
  ],
  longTerm: [
    "Technical co-founder of AI-driven startup",
    "Enterprise architecture consulting",
    "Open source contributions to major frameworks"
  ]
};