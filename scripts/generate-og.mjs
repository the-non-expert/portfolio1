/**
 * Generates custom OG images for blog posts.
 * Run: node scripts/generate-og.mjs
 * Outputs to: static/images/og/
 * Does NOT modify package.json — satori + @resvg/resvg-js installed with --no-save.
 */

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../static/images/og');
mkdirSync(OUT_DIR, { recursive: true });

// Brand tokens (from app.css)
const C = {
  bg:     '#F2F1EE',
  ink:    '#1C1B19',
  muted:  '#66635E',
  accent: '#C13B2A',
  pill_engineering: '#1C1B19',
  pill_pricing:     '#66635E',
};

// Fetch a single Playfair Display or Lato woff2 from Google Fonts
async function fetchGoogleFont(family, weight, italic = false) {
  const axis = italic ? `ital,wght@1,${weight}` : `wght@${weight}`;
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:${axis}&display=swap`;
  // Non-browser UA — Google returns TTF which satori's opentype.js can parse (WOFF2 is unsupported)
  const css = await fetch(cssUrl, {
    headers: { 'User-Agent': 'node-og-gen/1.0' },
  }).then(r => r.text());

  const match = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/);
  if (!match) throw new Error(`No font URL found for ${family} ${weight} italic=${italic}`);
  return fetch(match[1]).then(r => r.arrayBuffer());
}

console.log('Fetching fonts…');
const [playfairBold, playfairItalic, latoRegular] = await Promise.all([
  fetchGoogleFont('Playfair Display', 700, false),
  fetchGoogleFont('Playfair Display', 400, true),
  fetchGoogleFont('Lato', 400, false),
]);

const fonts = [
  { name: 'Playfair Display', data: playfairBold,   weight: 700, style: 'normal' },
  { name: 'Playfair Display', data: playfairItalic, weight: 400, style: 'italic' },
  { name: 'Lato',             data: latoRegular,    weight: 400, style: 'normal' },
];
console.log('Fonts loaded.');

// h() — builds satori-compatible element objects
function h(type, props, ...children) {
  const flat = children.flat(Infinity).filter(c => c !== null && c !== undefined);
  return {
    type,
    props: {
      ...props,
      children: flat.length === 0 ? undefined : flat.length === 1 ? flat[0] : flat,
    },
  };
}

// Category pill
function pill(label) {
  return h('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '6px 18px',
      borderRadius: '999px',
      border: `1.5px solid ${C.muted}`,
      color: C.muted,
      fontFamily: 'Lato',
      fontSize: 20,
      fontWeight: 400,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
  }, label);
}

// Card builder
function card({ category, titleLines, hook }) {
  return h('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: 1200,
      height: 630,
      backgroundColor: C.bg,
      padding: '60px 72px',
    },
  },
    // Top section: byline + category
    h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20 } },
      h('p', {
        style: {
          fontFamily: 'Lato',
          fontSize: 18,
          fontWeight: 400,
          color: C.muted,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          margin: 0,
        },
      }, 'Ayush Jhunjhunwala · Software Engineer'),
      pill(category),
    ),

    // Middle section: title + hook
    h('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
      // Title lines (bold serif)
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: 2 } },
        ...titleLines.map(line =>
          h('p', {
            style: {
              fontFamily: 'Playfair Display',
              fontSize: 72,
              fontWeight: 700,
              fontStyle: 'normal',
              color: C.ink,
              lineHeight: 1.1,
              margin: 0,
            },
          }, line)
        )
      ),
      // Hook (italic red serif)
      h('p', {
        style: {
          fontFamily: 'Playfair Display',
          fontSize: 46,
          fontWeight: 400,
          fontStyle: 'italic',
          color: C.accent,
          lineHeight: 1.2,
          margin: 0,
        },
      }, hook),
    ),

    // Footer
    h('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      },
    },
      h('p', {
        style: {
          fontFamily: 'Lato',
          fontSize: 20,
          color: C.accent,
          margin: 0,
        },
      }, 'ayushjhunjhunwala.com'),
      h('p', {
        style: {
          fontFamily: 'Lato',
          fontSize: 20,
          color: C.muted,
          margin: 0,
        },
      }, 'Cuttack, India · working worldwide'),
    ),
  );
}

// Post definitions
const posts = [
  {
    slug: 'razorpay-webhook-track-payments-by-source',
    category: 'Engineering',
    titleLines: ['Razorpay webhooks:', 'attributing payments', 'from multiple sources.'],
    hook: 'one gateway. full attribution.',
  },
  {
    slug: 'qr-code-loyalty-program-build-vs-subscribe',
    category: 'Pricing',
    titleLines: ['QR code loyalty:', 'free tools vs SaaS', 'vs building your own.'],
    hook: 'your customers. your data.',
  },
  {
    slug: 'how-much-does-a-custom-website-cost-in-india',
    category: 'Pricing',
    titleLines: ['Custom website cost', 'in India, 2026.', 'Real numbers.'],
    hook: 'no "it depends."',
  },
  {
    slug: 'website-builder-without-monthly-fee-vs-custom',
    category: 'Pricing',
    titleLines: ['Website builder', 'without monthly fees.', 'Wix, Squarespace, or custom?'],
    hook: 'you pay forever. or once.',
  },
];

for (const post of posts) {
  process.stdout.write(`Generating ${post.slug}… `);
  const el = card(post);
  const svg = await satori(el, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  const outPath = join(OUT_DIR, `${post.slug}.png`);
  writeFileSync(outPath, png);
  console.log(`saved → static/images/og/${post.slug}.png`);
}

console.log('\nDone. Update featuredImage in each post frontmatter to /images/og/<slug>.png');
