import { loadBlogPosts, getBlogsByCategory } from '$lib/utils/content';

export const prerender = true;

export async function load() {
  const [blogs, blogsByCategory] = await Promise.all([
    loadBlogPosts(),
    getBlogsByCategory()
  ]);

  return { blogs, blogsByCategory };
}
