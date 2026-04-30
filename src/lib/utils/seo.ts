/**
 * SEO Configuration and Utilities
 * Central place for all SEO-related data and helper functions
 */

import type { SiteConfig, PageConfig, SEOConfig } from '../types';

// Site-wide SEO configuration
export const siteConfig: SiteConfig = {
  name: "Ayush Jhunjhunwala Portfolio",
  title: "Ayush Jhunjhunwala - Full-Stack Developer & Tech Enthusiast | Python, SvelteKit, AWS",
  description: "Full-stack developer and interim COO specializing in Python FastAPI, SvelteKit, and AWS. Building scalable systems with proven team leadership.",
  url: "https://ayushjhunjhunwala.com",
  author: "Ayush Jhunjhunwala",
  image: "/images/Ayushjhunjhunwala.png",
  twitterHandle: "@ayush_jhunjhunwala",
  keywords: [
    "Full Stack Developer Python FastAPI",
    "SvelteKit Python Developer India",
    "Tech Lead Full Stack Developer",
    "AWS CI CD Python Developer",
    "PostgreSQL Python API Developer",
    "Full Stack Developer Leadership Experience",
    "Python FastAPI SvelteKit Expert",
    "Interim COO Developer",
    "Full Stack Tech Enthusiast",
    "Python AWS Developer Cuttack",
    "Ayush Jhunjhunwala"
  ]
};

// Page-specific SEO configurations
export const pageConfigs: Record<string, PageConfig> = {
  home: {
    title: "Ayush Jhunjhunwala — Full-Stack Developer | SvelteKit · FastAPI · AWS",
    description: "Tech leader and full-stack developer building scalable Python FastAPI backends, responsive SvelteKit frontends, and AWS-deployed systems.",
    keywords: [
      "Full Stack Developer Python FastAPI",
      "Tech Lead Full Stack Developer",
      "Python FastAPI SvelteKit Developer",
      "AWS CI CD Python Developer",
      "Interim COO Developer",
      "Full Stack Tech Enthusiast India",
      "Python PostgreSQL Developer Cuttack"
    ],
    ogType: "website",
    canonical: "/"
  },
  works: {
    title: "Works - Ayush Jhunjhunwala",
    description: "Production-grade projects featuring Python FastAPI APIs, SvelteKit frontends, PostgreSQL, and AWS CI/CD deployments with team leadership.",
    keywords: [
      "Python FastAPI Projects",
      "SvelteKit Full Stack Projects", 
      "AWS CI CD Portfolio",
      "PostgreSQL Python Projects",
      "Tech Lead Developer Portfolio",
      "Full Stack System Architecture",
      "Production Grade Web Applications"
    ],
    ogType: "website",
    canonical: "/myworks"
  },
  contact: {
    title: "Hire Me - Ayush Jhunjhunwala",
    description: "Available for full-stack development and technical leadership. Expert in Python FastAPI, SvelteKit, AWS, and team management. Interim COO experience.",
    keywords: [
      "Hire Full Stack Tech Enthusiast",
      "Python FastAPI Developer for Hire",
      "SvelteKit Backend Developer",
      "AWS CI CD Developer",
      "Technical Leadership Consultant",
      "Full Stack Developer with COO Experience",
      "Python PostgreSQL Developer India"
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
      "GraphQL"
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