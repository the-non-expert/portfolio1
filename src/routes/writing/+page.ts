import { loadWritings } from '$lib/utils/content';

export const prerender = true;

export async function load() {
  const writings = await loadWritings();
  return { writings };
}
