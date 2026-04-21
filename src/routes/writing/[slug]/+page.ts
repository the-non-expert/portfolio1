import { getWritingBySlug } from '$lib/utils/content';
import { error } from '@sveltejs/kit';

export async function load({ params }: { params: { slug: string } }) {
  const writing = await getWritingBySlug(params.slug);

  if (!writing) {
    throw error(404, 'Writing not found');
  }

  return { writing };
}
