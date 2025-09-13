import type { Blog, Writing, BlogCollection, WritingCollection } from '../types';

// Interface for markdown module structure
interface MarkdownModule {
  default: any;
  metadata: {
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    category?: string;
    readingTime?: string;
    featuredImage?: string;
    published?: boolean;
  };
}

/**
 * Load blog posts from markdown files
 * Returns empty array if no markdown files exist (fresh start approach)
 */
export async function loadBlogPosts(): Promise<BlogCollection> {
  try {
    // Use Vite's glob import to load all markdown files from blog directory
    const modules = import.meta.glob<MarkdownModule>('/src/content/blog/*.md', { eager: true });

    if (Object.keys(modules).length === 0) {
      return [];
    }

    const posts = Object.entries(modules).map(([path, module]) => {
      const filename = path.split('/').pop() || '';
      const slug = module.metadata.slug || filename.replace('.md', '');

      return {
        id: slug.split('-').reduce((acc, part) => acc + part.charCodeAt(0), 0),
        title: module.metadata.title,
        slug: slug,
        excerpt: module.metadata.excerpt,
        content: '', // Will be populated when needed
        date: module.metadata.date,
        readingTime: module.metadata.readingTime || '5 min read',
        category: module.metadata.category || 'Technology',
        featuredImage: module.metadata.featuredImage || '/blog-images/default.jpg',
        published: module.metadata.published !== false
      } as Blog;
    });

    return posts
      .filter(post => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.log('No markdown blog posts found, returning empty array');
    return [];
  }
}

/**
 * Load writings from markdown files
 * Returns empty array if no markdown files exist (fresh start approach)
 */
export async function loadWritings(): Promise<WritingCollection> {
  try {
    const modules = import.meta.glob<MarkdownModule>('/src/content/writing/*.md', { eager: true });

    if (Object.keys(modules).length === 0) {
      return [];
    }

    const writings = Object.entries(modules).map(([path, module]) => {
      const filename = path.split('/').pop() || '';
      const slug = module.metadata.slug || filename.replace('.md', '');

      return {
        id: slug.split('-').reduce((acc, part) => acc + part.charCodeAt(0), 0),
        title: module.metadata.title,
        slug: slug,
        date: module.metadata.date,
        excerpt: module.metadata.excerpt,
        content: '', // Will be populated when needed
        published: module.metadata.published !== false
      } as Writing;
    });

    return writings
      .filter(writing => writing.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.log('No markdown writings found, returning empty array');
    return [];
  }
}

/**
 * Get single blog post by slug with full content
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    // Try to import the specific markdown file
    const modules = import.meta.glob<MarkdownModule>('/src/content/blog/*.md', { eager: true });

    for (const [path, module] of Object.entries(modules)) {
      const fileSlug = module.metadata.slug || path.split('/').pop()?.replace('.md', '');

      if (fileSlug === slug) {
        return {
          id: slug.split('-').reduce((acc, part) => acc + part.charCodeAt(0), 0),
          title: module.metadata.title,
          slug: slug,
          excerpt: module.metadata.excerpt,
          content: module.default,
          date: module.metadata.date,
          readingTime: module.metadata.readingTime || '5 min read',
          category: module.metadata.category || 'Technology',
          featuredImage: module.metadata.featuredImage || '/blog-images/default.jpg'
        } as Blog;
      }
    }

    return null;
  } catch (error) {
    console.log(`Blog post with slug "${slug}" not found`);
    return null;
  }
}

/**
 * Get single writing by slug with full content
 */
export async function getWritingBySlug(slug: string): Promise<Writing | null> {
  try {
    const modules = import.meta.glob<MarkdownModule>('/src/content/writing/*.md', { eager: true });

    for (const [path, module] of Object.entries(modules)) {
      const fileSlug = module.metadata.slug || path.split('/').pop()?.replace('.md', '');

      if (fileSlug === slug) {
        return {
          id: slug.split('-').reduce((acc, part) => acc + part.charCodeAt(0), 0),
          title: module.metadata.title,
          slug: slug,
          date: module.metadata.date,
          excerpt: module.metadata.excerpt,
          content: module.default
        } as Writing;
      }
    }

    return null;
  } catch (error) {
    console.log(`Writing with slug "${slug}" not found`);
    return null;
  }
}

/**
 * Get blogs by category (for filtering)
 */
export async function getBlogsByCategory(): Promise<{[category: string]: Blog[]}> {
  const blogs = await loadBlogPosts();
  const categories: {[category: string]: Blog[]} = {};

  blogs.forEach(blog => {
    if (!categories[blog.category]) {
      categories[blog.category] = [];
    }
    categories[blog.category].push(blog);
  });

  return categories;
}

/**
 * Get recent blog posts (for homepage, etc.)
 */
export async function getRecentBlogs(count: number = 3): Promise<BlogCollection> {
  const blogs = await loadBlogPosts();
  return blogs.slice(0, count);
}