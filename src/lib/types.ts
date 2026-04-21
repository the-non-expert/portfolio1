/**
 * Type definitions for content managed by Decap CMS
 * These interfaces ensure type safety between CMS and application
 */

// Book interface - for reading list content
export interface Book {
  id: number;
  title: string;
  author: string;
  finishedOn: string; // Date in dd.mm.yyyy format
  rating: string; // Format: "4/5", "5/5", etc.
}

// Writing interface - for personal writing/notes
export interface Writing {
  id: number;
  title: string;
  slug: string;
  date: string; // ISO date string
  excerpt: string;
  content: string;
  published?: boolean;
}

// Blog interface - for blog posts
export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string; // ISO date string
  readingTime: string; // Format: "5 min read"
  category: string;
  featuredImage: string; // Image path
  published?: boolean;
}

// SEO configuration interfaces
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  author: string;
  image: string;
  twitterHandle: string;
  keywords: string[];
}

export interface PageConfig {
  title: string;
  description: string;
  keywords: string[];
  ogType: string;
  canonical: string;
}

export interface SEOConfig extends Omit<SiteConfig, 'keywords'>, Omit<PageConfig, 'keywords'> {
  ogImage: string;
  ogUrl: string;
  keywords: string; // Merged keywords as a single string
}

// Utility types for content collections
export type BookCollection = Book[];
export type WritingCollection = Writing[];
export type BlogCollection = Blog[];

// Helper types for content organization
export interface WritingsByYear {
  [year: number]: Writing[];
}

export interface BlogsByCategory {
  [category: string]: Blog[];
}

// Function type definitions for content utilities
export type DateFormatter = (dateString: string) => string;
export type ContentParser = (content: string) => string;
export type RatingDisplay = (rating: string) => string;