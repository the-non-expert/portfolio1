import { error } from '@sveltejs/kit';
import { workExperience } from '$lib/data/workExperience.js';

export const prerender = true;

export function entries() {
  return (workExperience as any[])
    .filter((e) => e.caseStudy?.slug)
    .map((e) => ({ slug: e.caseStudy.slug as string }));
}

export function load({ params }: { params: { slug: string } }) {
  const entry = (workExperience as any[]).find(
    (e) => e.caseStudy?.slug === params.slug
  );

  if (!entry || !entry.caseStudy) {
    throw error(404, 'Case study not found');
  }

  const related = ((entry.caseStudy.relatedSlugs ?? []) as string[])
    .map((slug) => (workExperience as any[]).find((e) => e.caseStudy?.slug === slug))
    .filter((e) => e != null);

  return { entry, related };
}
