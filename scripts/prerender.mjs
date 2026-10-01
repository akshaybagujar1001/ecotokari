import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { SEO_PAGES, SITE_URL } from '../src/data/seoPages.js';

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');

const MAIN_ROUTES = [
  {
    path: '/products',
    title: 'Shop Fresh Banana Leaves, Banana Stem & Banana Flower Online | EcoTokari',
    description: 'Order fresh banana leaves, banana stem, banana flower and festival combo packs online from EcoTokari, Pune. Retail and bulk packs with pan-India delivery.',
  },
  {
    path: '/about',
    title: 'About EcoTokari – Pune Banana Leaf Supplier Since 2018',
    description: 'EcoTokari connects 30+ banana farms around Pune directly with hotels, caterers and families. Learn our story, values and commitment to freshness.',
  },
  {
    path: '/contact',
    title: 'Contact EcoTokari – Banana Leaf Supplier, Pimple Saudagar, Pune',
    description: 'Call +91 80108 84556 or email info@ecotokari.com for orders, bulk quotes and delivery queries. Pimple Saudagar, Pune – 411027.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | EcoTokari',
    description: 'How EcoTokari collects, uses and protects your personal information.',
  },
  {
    path: '/terms',
    title: 'Terms of Service | EcoTokari',
    description: 'Terms and conditions for ordering from EcoTokari.',
  },
];

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function withHead(template, { title, description, url, jsonLd }) {
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta\s+name="description"[^>]*>/, '')
    .replace(/<meta\s+property="og:title"[^>]*>/, '')
    .replace(/<meta\s+property="og:description"[^>]*>/, '')
    .replace(/<link\s+rel="canonical"[^>]*>/, '');

  const tags = [
    `<meta name="description" content="${esc(description)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
  ];
  if (jsonLd) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`);
  }
  return html.replace('</head>', `    ${tags.join('\n    ')}\n  </head>`);
}

function paragraphs(list) {
  return list.map((text) => `<p>${esc(text)}</p>`).join('');
}

function staticBody(page) {
  const sections = page.sections.map((s) => `<section><h2>${esc(s.h)}</h2>${paragraphs(s.p)}</section>`).join('');
  const faqs = page.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('');
  const related = page.related
    .map((slug) => SEO_PAGES.find((p) => p.slug === slug))
    .filter(Boolean)
    .map((p) => `<li><a href="/${p.slug}">${esc(p.h1)}</a></li>`)
    .join('');

  return `<article class="page-shell max-w-3xl py-12">
<h1>${esc(page.h1)}</h1>
<p>${esc(page.intro)}</p>
<p><a href="${esc(page.shop)}">Shop now</a> · <a href="/contact">Get a bulk quote</a></p>
${sections}
<section lang="hi"><h2>${esc(page.hi.h)}</h2>${paragraphs(page.hi.p)}</section>
<section lang="mr"><h2>${esc(page.mr.h)}</h2>${paragraphs(page.mr.p)}</section>
<section><h2>Frequently asked questions</h2>${faqs}</section>
<section><h2>Order from EcoTokari</h2><p>Pimple Saudagar, Pune – 411027, Maharashtra, India · +91 80108 84556 · info@ecotokari.com</p></section>
<nav><ul><li><a href="/">Home</a></li><li><a href="/products">Shop</a></li>${related}</ul></nav>
</article>`;
}

function faqJsonLd(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

for (const route of MAIN_ROUTES) {
  const html = withHead(template, { ...route, url: `${SITE_URL}${route.path}` });
  await writeFile(path.join(distDir, `${route.path.slice(1)}.html`), html);
}

for (const page of SEO_PAGES) {
  const url = `${SITE_URL}/${page.slug}`;
  const html = withHead(template, { title: page.title, description: page.description, url, jsonLd: faqJsonLd(page) })
    .replace('<div id="root"></div>', `<div id="root">${staticBody(page)}</div>`);
  await writeFile(path.join(distDir, `${page.slug}.html`), html);
}

const today = new Date().toISOString().slice(0, 10);
const urls = ['/', ...MAIN_ROUTES.map((r) => r.path), ...SEO_PAGES.map((p) => `/${p.slug}`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
await writeFile(path.join(distDir, 'sitemap.xml'), sitemap);

console.log(`Prerendered ${MAIN_ROUTES.length + SEO_PAGES.length} pages and sitemap.xml`);
