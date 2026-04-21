import { siteConfig } from '$lib/utils/seo';

/**
 * Dynamic sitemap.xml generation.
 * Static pages have fixed lastmod dates.
 * Blog and writing slugs are discovered at build/request time from markdown frontmatter.
 */

/** @typedef {{ metadata: { slug?: string; date?: string; published?: boolean }; default: unknown }} MarkdownModule */

// Vite glob imports — resolved at build time
/** @type {Record<string, MarkdownModule>} */
const blogModules = /** @type {any} */ (import.meta.glob('/src/content/blog/*.md', { eager: true }));

/** @type {Record<string, MarkdownModule>} */
const writingModules = /** @type {any} */ (import.meta.glob('/src/content/writing/*.md', { eager: true }));

/** @param {string} dateString */
function isoDate(dateString) {
  return new Date(dateString).toISOString().split('T')[0];
}

export async function GET() {
  const base = siteConfig.url;

  // Static routes with known last-modified dates
  const staticRoutes = [
    { path: '',           priority: '1.0', changefreq: 'monthly',  lastmod: '2026-04-21' },
    { path: '/myworks',   priority: '0.9', changefreq: 'monthly',  lastmod: '2026-04-21' },
    { path: '/contact',   priority: '0.8', changefreq: 'yearly',   lastmod: '2025-09-01' },
    { path: '/blog',      priority: '0.8', changefreq: 'weekly',   lastmod: '2025-09-13' },
    { path: '/writing',   priority: '0.7', changefreq: 'weekly',   lastmod: '2025-09-25' },
    { path: '/reading',   priority: '0.5', changefreq: 'monthly',  lastmod: '2026-01-01' },
  ];

  // Blog post routes derived from markdown frontmatter
  const blogRoutes = Object.entries(blogModules)
    .filter(([, mod]) => mod.metadata?.published !== false)
    .map(([path, mod]) => {
      const slug = mod.metadata?.slug ?? path.split('/').pop()?.replace('.md', '') ?? '';
      const lastmod = mod.metadata?.date ? isoDate(mod.metadata.date) : '2025-01-01';
      return { path: `/blog/${slug}`, priority: '0.7', changefreq: 'yearly', lastmod };
    });

  // Writing routes derived from markdown frontmatter
  const writingRoutes = Object.entries(writingModules)
    .filter(([, mod]) => mod.metadata?.published !== false)
    .map(([path, mod]) => {
      const slug = mod.metadata?.slug ?? path.split('/').pop()?.replace('.md', '') ?? '';
      const lastmod = mod.metadata?.date ? isoDate(mod.metadata.date) : '2025-01-01';
      return { path: `/writing/${slug}`, priority: '0.6', changefreq: 'yearly', lastmod };
    });

  const allRoutes = [...staticRoutes, ...blogRoutes, ...writingRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${base}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600'
    }
  });
}
