import { getBlogBySlug, loadBlogPosts } from '$lib/utils/content';
import { error } from '@sveltejs/kit';

export async function load({ params }: { params: { slug: string } }) {
  const [blog, allBlogs] = await Promise.all([
    getBlogBySlug(params.slug),
    loadBlogPosts()
  ]);

  if (!blog) {
    throw error(404, 'Blog post not found');
  }

  const otherPosts = allBlogs.filter(b => b.slug !== params.slug).slice(0, 3);

  return { blog, otherPosts };
}
