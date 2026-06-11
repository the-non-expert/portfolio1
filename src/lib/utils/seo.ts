/**
 * SEO Configuration and Utilities
 * Central place for all SEO-related data and helper functions
 */

import type { SiteConfig, PageConfig, SEOConfig } from '../types';

// Site-wide SEO configuration
export const siteConfig: SiteConfig = {
  name: "Ayush Jhunjhunwala Portfolio",
  title: "Ayush Jhunjhunwala — Custom Websites, Apps & Software | One-Time Payment, No Subscriptions",
  description: "Custom websites, Android apps, and software for small businesses. Upfront pricing, one-time payment, no subscriptions or hidden charges — you own the code.",
  url: "https://ayushjhunjhunwala.com",
  author: "Ayush Jhunjhunwala",
  image: "/images/Ayushjhunjhunwala.png",
  twitterHandle: "@ayush_jhunjhunwala",
  keywords: [
    "custom website development for small business",
    "custom software development for small businesses",
    "one time payment website",
    "website without monthly fee",
    "custom android app developers india",
    "freelance web developer india",
    "Ayush Jhunjhunwala"
  ]
};

// Page-specific SEO configurations
export const pageConfigs: Record<string, PageConfig> = {
  home: {
    title: "Custom Websites & Apps — One-Time Payment, No Subscriptions | Ayush Jhunjhunwala",
    description: "Custom website and app development for small businesses. Pricing discussed upfront before any work begins, no monthly fees or hidden charges — you own 100% of the code.",
    keywords: [
      "custom website development for small business",
      "one time payment website",
      "website without monthly fee",
      "custom software development for small businesses",
      "freelance web developer india",
      "custom android app developers india",
      "Ayush Jhunjhunwala"
    ],
    ogType: "website",
    canonical: "/"
  },
  works: {
    title: "Works — Custom Websites, Apps & Software for Small Businesses | Ayush Jhunjhunwala",
    description: "Real client projects: custom websites, Android apps, QR loyalty systems, and donation platforms — each delivered as a one-time build the client fully owns.",
    keywords: [
      "custom software development for small businesses",
      "custom website development for small business",
      "qr code loyalty system",
      "custom android app developers india",
      "ngo website development",
      "jewellery website design",
      "preschool website design"
    ],
    ogType: "website",
    canonical: "/myworks"
  },
  contact: {
    title: "Hire Me — Upfront Pricing, No Hidden Charges | Ayush Jhunjhunwala",
    description: "Get a clear, upfront price for your custom website or app before any work begins. One-time payment, no subscriptions, no hidden charges — typical reply within 24 hours.",
    keywords: [
      "custom website development cost in india",
      "website without monthly fee",
      "one time payment website",
      "android app development cost in india",
      "hire freelance web developer india",
      "custom software development for small businesses"
    ],
    ogType: "website",
    canonical: "/contact"
  },
  reading: {
    title: "Reading List - Books by Ayush Jhunjhunwala",
    description: "Books I've read on technology, leadership, and personal development — with ratings and honest reviews.",
    keywords: [
      "Tech Books Recommendations",
      "Leadership Books Developer",
      "Software Engineering Book Reviews",
      "Technical Leadership Reading List",
      "Full Stack Developer Book Recommendations",
      "System Design Books",
      "Management Books for Engineers",
      "Ayush Jhunjhunwala Reading List"
    ],
    ogType: "website",
    canonical: "/reading"
  },
  writing: {
    title: "Writing - Technical Notes by Ayush Jhunjhunwala", 
    description: "Thoughts and lessons from building software and leading teams. Notes on development practices, leadership insights, and industry reflections.",
    keywords: [
      "Technical Writing Full Stack Developer",
      "Software Engineering Insights",
      "Tech Leadership Articles",
      "Python FastAPI Development Notes",
      "SvelteKit Technical Writing",
      "Engineering Management Insights",
      "Full Stack Developer Blog",
      "Technical Leadership Thoughts"
    ],
    ogType: "website",
    canonical: "/writing"
  },
  'work/toondemy-preschool': {
    title: 'Preschool Website Design with SEO & GEO — Toondemy Case Study | Ayush Jhunjhunwala',
    description: 'A preschool website design case study: how Ayush Jhunjhunwala built a trust-first site with a full SEO and Generative Engine Optimisation strategy for Toondemy Preschool, India.',
    keywords: [
      'preschool website developer India',
      'local business website SEO GEO',
      'SvelteKit web designer India',
      'Generative Engine Optimisation local business',
      'Ayush Jhunjhunwala case study'
    ],
    ogType: 'article',
    canonical: '/work/toondemy-preschool'
  },
  'work/om-therapeutics': {
    title: 'SvelteKit Development for OM Therapeutics — Contract Developer Case Study | Ayush Jhunjhunwala',
    description: 'How Ayush Jhunjhunwala contributed 40% of the codebase on a full-stack SvelteKit platform for a US-based therapeutics company as a contract developer.',
    keywords: [
      'SvelteKit contract developer USA',
      'SvelteKit FastAPI developer',
      'contract frontend developer SvelteKit',
      'SvelteKit TypeScript developer',
      'Ayush Jhunjhunwala case study'
    ],
    ogType: 'article',
    canonical: '/work/om-therapeutics'
  },
  'work/aarti-jewellers': {
    title: 'Jewellery Website Design with Live Gold Price — Aarti Jewellers Case Study | Ayush Jhunjhunwala',
    description: 'A jewellery website design case study: bilingual Hindi-English frontend with a live gold and silver price API for a shop in Cuttack — a 2-month SvelteKit contract by Ayush Jhunjhunwala.',
    keywords: [
      'jewellery website developer India',
      'bilingual website developer Hindi English',
      'live gold price API SvelteKit',
      'SvelteKit frontend developer Cuttack',
      'Ayush Jhunjhunwala case study'
    ],
    ogType: 'article',
    canonical: '/work/aarti-jewellers'
  },
  'work/sikhaid-ngo': {
    title: 'NGO Website Development in India with Donation Tracking — SikhAid Case Study | Ayush Jhunjhunwala',
    description: 'An NGO website development case study from India: full-stack SvelteKit platform with a custom Razorpay webhook payment-tracking algorithm, built by Ayush Jhunjhunwala on a 3-month contract.',
    keywords: [
      'NGO website developer India',
      'Razorpay webhook integration developer',
      'SvelteKit Firebase full-stack developer',
      'donation tracking system developer',
      'Ayush Jhunjhunwala case study'
    ],
    ogType: 'article',
    canonical: '/work/sikhaid-ngo'
  },
  'work/roxford-healthcare': {
    title: 'Pharmaceutical Web Platform for Roxford Healthcare — SvelteKit Case Study | Ayush Jhunjhunwala',
    description: 'How Ayush Jhunjhunwala designed and developed a complete pharmaceutical web platform as sole developer on a 6-month remote contract for a UK client.',
    keywords: [
      'freelance SvelteKit developer UK',
      'pharmaceutical website developer',
      'sole developer web contract',
      'SvelteKit Firestore developer',
      'Ayush Jhunjhunwala case study'
    ],
    ogType: 'article',
    canonical: '/work/roxford-healthcare'
  },
  'work/humanaissance': {
    title: 'Bespoke Web Platform for Humanaissance — SvelteKit + Claude AI Case Study | Ayush Jhunjhunwala',
    description: 'How Ayush Jhunjhunwala built a custom CMS, Canvas API animations, Claude AI agents, and a full GEO strategy for a Singapore-based client over a 7-month contract.',
    keywords: [
      'SvelteKit developer for hire Singapore',
      'Claude API developer web platform',
      'custom CMS SvelteKit developer',
      'Generative Engine Optimisation developer',
      'Canvas API animation developer',
      'Ayush Jhunjhunwala case study'
    ],
    ogType: 'article',
    canonical: '/work/humanaissance'
  },
  'work/piipharma-loyalty': {
    title: 'QR Code Loyalty Program for Pharma Retailers — PiiPharma Case Study | Ayush Jhunjhunwala',
    description: 'How Ayush Jhunjhunwala is building a QR code loyalty system for PiiPharma — in-browser coupon scanning, WhatsApp OTP login, and bulk UPI cashback payouts replacing a manual workflow.',
    keywords: [
      'qr code loyalty program',
      'qr code loyalty system',
      'loyalty program app for small business',
      'loyalty program for retail store',
      'custom loyalty program developer India',
      'Ayush Jhunjhunwala case study'
    ],
    ogType: 'article',
    canonical: '/work/piipharma-loyalty'
  },
  'work/kiraya-app': {
    title: 'Kiraya — Android Rental Management App with QR Showcases — Flutter Case Study | Ayush Jhunjhunwala',
    description: 'How Ayush Jhunjhunwala designed and built Kiraya, an Android-first Flutter app where landlords manage rentals and print QR code showcases that renters scan at the property gate.',
    keywords: [
      'custom android app developers india',
      'android app development cost in india',
      'flutter app developer india',
      'rental property management app',
      'qr code property showcase',
      'Ayush Jhunjhunwala case study'
    ],
    ogType: 'article',
    canonical: '/work/kiraya-app'
  },
  'work/badasha-ticketing': {
    title: 'Online Ticket Booking System with Seat Selection — Badasha Case Study | Ayush Jhunjhunwala',
    description: 'How Ayush Jhunjhunwala is building a custom event ticketing website for a touring magic show — interactive seat map, timed checkout, and multi-city tour scheduling with no per-ticket commission.',
    keywords: [
      'online ticket booking system',
      'ticket booking app development',
      'event ticketing website design',
      'seat booking system',
      'ticketing system development',
      'Ayush Jhunjhunwala case study'
    ],
    ogType: 'article',
    canonical: '/work/badasha-ticketing'
  },
  blog: {
    title: "Blog - In-depth Articles by Ayush Jhunjhunwala",
    description: "In-depth articles on software engineering, technical leadership, and scalable systems. Real-world experiences, practical insights, and production lessons.",
    keywords: [
      "Software Engineering Blog",
      "Technical Leadership Articles", 
      "Full Stack Development Blog",
      "System Architecture Articles",
      "Python FastAPI Tutorials",
      "SvelteKit Development Guide",
      "Engineering Management Blog",
      "Production Systems Articles",
      "Tech Lead Insights"
    ],
    ogType: "website",
    canonical: "/blog"
  }
};

/**
 * Generate structured data for different content types
 */
export function generatePersonSchema(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ayush Jhunjhunwala",
    "jobTitle": "Full-Stack Developer & Tech Enthusiast",
    "description": "Full-stack developer and interim COO specializing in Python FastAPI backends, SvelteKit frontends, and AWS deployments with proven leadership experience",
    "url": siteConfig.url,
    "image": `${siteConfig.url}/images/Ayushjhunjhunwala.png`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cuttack",
      "addressRegion": "Odisha",
      "addressCountry": "India"
    },
    "sameAs": [
      "https://github.com/the-non-expert",
      "https://www.npmjs.com/~ayushjhunjhunwala",
      "https://www.instagram.com/ayush_jhunjhunwala/",
      "https://www.linkedin.com/in/ayush-jhunjhunwala"
    ],
    "knowsAbout": [
      "Python FastAPI",
      "SvelteKit",
      "PostgreSQL",
      "AWS EC2",
      "GitHub Actions",
      "CI/CD",
      "Nginx",
      "TypeScript",
      "Full Stack Development",
      "Technical Leadership",
      "System Architecture",
      "Team Management",
      "Uvicorn",
      "Cassandra",
      "MongoDB",
      "GraphQL",
      "SvelteKit Contract Development",
      "Razorpay Webhook Integration",
      "Claude API Development",
      "Generative Engine Optimisation",
      "Bilingual Website Development",
      "NGO Website Development"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full-Stack Developer & Interim COO",
      "skills": ["Python FastAPI", "SvelteKit", "AWS", "PostgreSQL", "CI/CD", "Technical Leadership"],
      "experienceRequirements": "5+ years full-stack development, Leadership experience",
      "occupationLocation": {
        "@type": "City",
        "name": "Cuttack, India"
      }
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Self-employed"
    },
    "seeks": {
      "@type": "Demand",
      "name": "Full-Stack Development Contracts & Technical Leadership Roles"
    }
  };
}

export function generateWebsiteSchema(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "description": siteConfig.description,
    "url": siteConfig.url,
    "author": {
      "@type": "Person",
      "name": siteConfig.author
    },
    "inLanguage": "en-US"
  };
}

export function generateProfessionalServiceSchema(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Full-Stack Development & Technical Leadership Services",
    "description": "Professional full-stack development and technical leadership services specializing in Python FastAPI, SvelteKit, and AWS deployments",
    "provider": {
      "@type": "Person",
      "name": "Ayush Jhunjhunwala",
      "jobTitle": "Full-Stack Developer & Tech Enthusiast"
    },
    "serviceType": [
      "Full-Stack Web Development",
      "Technical Leadership",
      "Python FastAPI Development",
      "SvelteKit Frontend Development", 
      "AWS Cloud Deployment",
      "CI/CD Implementation",
      "System Architecture",
      "Team Management"
    ],
    "serviceOutput": [
      "Scalable Web Applications",
      "Python FastAPI Backend Systems",
      "Responsive SvelteKit Frontends",
      "AWS CI/CD Deployments",
      "Technical Team Leadership",
      "System Architecture Design"
    ],
    "areaServed": "Worldwide",
    "availableLanguage": ["English", "Hindi"],
    "expertise": ["Python", "FastAPI", "SvelteKit", "PostgreSQL", "AWS", "Technical Leadership"]
  };
}

interface Project {
  name: string;
  description: string;
  websiteLink: string;
  image: string;
}

export function generatePortfolioSchema(projects: Project[]): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Web Development Portfolio",
    "description": "Collection of web development projects and professional work",
    "creator": {
      "@type": "Person",
      "name": "Ayush Jhunjhunwala"
    },
    "workExample": projects.map((project: Project) => ({
      "@type": "CreativeWork",
      "name": project.name,
      "description": project.description,
      "url": project.websiteLink,
      "image": project.image
    }))
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(items: FAQItem[]): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readingTime?: string;
  featuredImage?: string;
}

export function generateBlogPostingSchema(post: BlogPost): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString(),
    "url": `${siteConfig.url}/blog/${post.slug}`,
    "image": post.featuredImage ? `${siteConfig.url}${post.featuredImage}` : `${siteConfig.url}${siteConfig.image}`,
    "author": {
      "@type": "Person",
      "name": siteConfig.author,
      "url": siteConfig.url
    },
    "publisher": {
      "@type": "Person",
      "name": siteConfig.author,
      "url": siteConfig.url
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`
    }
  };
}

export function generateCaseStudySchema(entry: any): Record<string, any> {
  const published = new Date(entry.caseStudy.publishedDate ?? '2026-05-04').toISOString();
  const pageUrl = `${siteConfig.url}/work/${entry.caseStudy.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${entry.company}: ${entry.caseStudy.technicalHighlight.title}`,
    "description": entry.caseStudy.brief,
    "datePublished": published,
    "dateModified": published,
    "url": pageUrl,
    "author": {
      "@type": "Person",
      "name": "Ayush Jhunjhunwala",
      "url": siteConfig.url
    },
    "publisher": {
      "@type": "Person",
      "name": "Ayush Jhunjhunwala",
      "url": siteConfig.url
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    },
    "about": {
      "@type": "Organization",
      "name": entry.company
    },
    "keywords": entry.technologies.join(', ')
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

/**
 * Helper function to merge page-specific config with site defaults
 */
export function mergeSeoConfig(pageKey: string, overrides: Partial<SEOConfig> = {}): SEOConfig {
  const pageConfig = pageConfigs[pageKey] || {};
  const canonicalPath = overrides.canonical || pageConfig.canonical || '';
  const canonical = canonicalPath.startsWith('http')
    ? canonicalPath
    : `${siteConfig.url}${canonicalPath}`;

  return {
    ...siteConfig,
    ...pageConfig,
    ...overrides,
    canonical,
    keywords: [...(pageConfig.keywords || []), ...siteConfig.keywords].join(', '),
    ogImage: overrides.ogImage || `${siteConfig.url}${siteConfig.image}`,
    ogUrl: canonical
  } as SEOConfig;
}

/**
 * Generate meta tags for server-side rendering
 */
function capDescription(text: string): string {
  if (text.length <= 160) return text;
  return text.slice(0, 157).trimEnd() + '…';
}

export function generateMetaTags(config: SEOConfig): Record<string, any> {
  const description = capDescription(config.description);
  return {
    title: config.title,
    description,
    keywords: config.keywords,
    canonical: config.canonical,
    openGraph: {
      type: config.ogType || 'website',
      title: config.title,
      description,
      image: config.ogImage,
      url: config.ogUrl,
      siteName: siteConfig.name
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description,
      image: config.ogImage,
      creator: siteConfig.twitterHandle
    }
  };
}