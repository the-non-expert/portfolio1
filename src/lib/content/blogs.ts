import type { Blog, BlogCollection, BlogsByCategory } from '../types';

export const blogs: BlogCollection = [
  {
    id: 1,
    title: "The hidden costs of microservices: lessons from the trenches",
    slug: "hidden-costs-microservices",
    excerpt: "Everyone talks about the benefits of microservices, but what about the operational overhead, debugging complexity, and team coordination challenges?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "2024-09-10",
    readingTime: "8 min read",
    category: "Architecture",
    featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop&auto=format"
  },
  {
    id: 2,
    title: "Building a culture of ownership in engineering teams",
    slug: "engineering-ownership-culture",
    excerpt: "How we transformed our team from a group of individual contributors to owners who think beyond their immediate tasks.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
    date: "2024-08-25",
    readingTime: "7 min read",
    category: "Leadership",
    featuredImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop&auto=format"
  },
  {
    id: 3,
    title: "Python FastAPI vs Django: choosing the right framework in 2024",
    slug: "fastapi-vs-django-2024",
    excerpt: "A comprehensive comparison based on building production applications with both frameworks. Performance, ecosystem, and developer experience analyzed.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pellentesque eget lorem malesuada wisi. Donec imperdiet tempor mauris. In hac habitasse platea dictumst. Nullam sit amet magna in magna gravida vehicula. Mauris tincidunt sem sed arcu. Nullam eu ante vel est convallis dignissim.",
    date: "2024-07-30",
    readingTime: "9 min read",
    category: "Technology",
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop&auto=format"
  },
  {
    id: 4,
    title: "Lessons from mentoring junior developers",
    slug: "mentoring-junior-developers",
    excerpt: "What I've learned from mentoring 12+ junior developers over the past three years. The mistakes, breakthroughs, and frameworks that actually work.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor.",
    date: "2024-06-15",
    readingTime: "6 min read",
    category: "Career",
    featuredImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=450&fit=crop&auto=format"
  }
];

export function getBlogsByCategory(): BlogsByCategory {
  const categories: BlogsByCategory = {};
  blogs.forEach((blog: Blog) => {
    if (!categories[blog.category]) categories[blog.category] = [];
    categories[blog.category].push(blog);
  });
  return categories;
}

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find((blog: Blog) => blog.slug === slug);
}

export function getRecentBlogs(count: number = 3): BlogCollection {
  return blogs
    .sort((a: Blog, b: Blog) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
