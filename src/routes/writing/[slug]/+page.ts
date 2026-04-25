import { getWritingBySlug } from '$lib/utils/content';
import { error } from '@sveltejs/kit';

export const prerender = true;

export async function entries() {
  const modules = import.meta.glob('/src/content/writing/*.md', { eager: true }) as Record<string, any>;
  return Object.entries(modules).map(([path, mod]) => ({
    slug: mod.metadata?.slug || path.split('/').pop()?.replace('.md', '') || ''
  }));
}

export async function load({ params }: { params: { slug: string } }) {
  const writing = await getWritingBySlug(params.slug);

  if (!writing) {
    throw error(404, 'Writing not found');
  }

  return { writing };
}
