import { siteConfig } from '$lib/utils/seo.js';

/**
 * Dynamic sitemap.xml generation for SEO
 * This will be accessible at /sitemap.xml
 */
export async function GET() {
  const baseUrl = siteConfig.url;
  
  // Define all routes with their priority and change frequency
  const routes = [
    {
      path: '',
      priority: '1.0',
      changefreq: 'monthly',
      lastmod: new Date().toISOString().split('T')[0] // Today's date
    },
    {
      path: 'myworks',
      priority: '0.9',
      changefreq: 'weekly',
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      path: 'contact',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: new Date().toISOString().split('T')[0]
    }
  ];

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.path ? `/${route.path}` : ''}</loc>
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
      'Cache-Control': 'max-age=86400' // Cache for 24 hours
    }
  });
}