import { loadWritings } from '$lib/utils/content';

export async function load() {
  const writings = await loadWritings();
  return { writings };
}
