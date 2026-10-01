import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { SEO_PAGES, SITE_URL } from '../data/seoPages';

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  const created = !el;
  if (created) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
    const match = selector.match(/\[(\w+)="([^"]+)"\]/);
    if (match) el.setAttribute(match[1], match[2]);
    document.head.appendChild(el);
  }
  const previous = el.getAttribute(attr);
  el.setAttribute(attr, value);
  return () => {
    if (created) el.remove();
    else if (previous != null) el.setAttribute(attr, previous);
  };
}

function usePageMeta(page) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = page.title;
    const url = `${SITE_URL}/${page.slug}`;
    const restore = [
      setMeta('meta[name="description"]', 'content', page.description),
      setMeta('meta[property="og:title"]', 'content', page.title),
      setMeta('meta[property="og:description"]', 'content', page.description),
      setMeta('link[rel="canonical"]', 'href', url),
    ];
    return () => {
      document.title = previousTitle;
      restore.forEach((fn) => fn());
    };
  }, [page]);
}

function LanguageBlock({ lang, label, block }) {
  return (
    <section lang={lang} className="surface p-6 md:p-8">
      <p className="eyebrow mb-2">{label}</p>
      <h2 className="font-display text-xl md:text-2xl font-bold text-brand-950 mb-4">{block.h}</h2>
      <div className="space-y-3 text-gray-700 leading-relaxed">
        {block.p.map((text) => <p key={text}>{text}</p>)}
      </div>
    </section>
  );
}

export default function SeoLanding({ page }) {
  usePageMeta(page);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);
  const related = page.related.map((slug) => SEO_PAGES.find((p) => p.slug === slug)).filter(Boolean);

  return (
    <div className="py-12 md:py-14">
      <article className="page-shell max-w-3xl space-y-8">
        <header>
          <p className="eyebrow mb-2">{page.eyebrow}</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-950 tracking-display text-balance mb-4">{page.h1}</h1>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">{page.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={page.shop} className="btn-primary text-sm">
              Shop now <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-outline text-sm">Get a bulk quote</Link>
          </div>
        </header>

        {page.sections.map((section) => (
          <section key={section.h}>
            <h2 className="font-display text-xl md:text-2xl font-bold text-brand-950 mb-3">{section.h}</h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              {section.p.map((text) => <p key={text}>{text}</p>)}
            </div>
          </section>
        ))}

        <LanguageBlock lang="hi" label="हिंदी" block={page.hi} />
        <LanguageBlock lang="mr" label="मराठी" block={page.mr} />

        <section>
          <h2 className="font-display text-xl md:text-2xl font-bold text-brand-950 mb-4">Frequently asked questions</h2>
          <div className="space-y-3">
            {page.faqs.map((faq) => (
              <details key={faq.q} className="surface p-5 group">
                <summary className="cursor-pointer font-semibold text-brand-950 list-none flex justify-between gap-4">
                  {faq.q}
                  <span className="text-brand-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="surface p-6 md:p-8 bg-gradient-to-br from-brand-50 to-white">
          <h2 className="font-display text-xl font-bold text-brand-950 mb-4">Order from EcoTokari</h2>
          <ul className="space-y-2 text-gray-700 text-sm md:text-base">
            <li className="flex items-start gap-2"><MapPin size={18} className="text-brand-600 mt-0.5 shrink-0" /> Pimple Saudagar, Pune – 411027, Maharashtra, India</li>
            <li className="flex items-center gap-2"><Phone size={18} className="text-brand-600 shrink-0" /> <a href="tel:+918010884556" className="hover:text-brand-700">+91 80108 84556</a></li>
            <li className="flex items-center gap-2"><Mail size={18} className="text-brand-600 shrink-0" /> <a href="mailto:hello@ecotokari.com" className="hover:text-brand-700">hello@ecotokari.com</a></li>
          </ul>
          <Link to={page.shop} className="btn-primary text-sm mt-5 inline-flex">
            Shop now <ArrowRight size={16} />
          </Link>
        </section>

        {related.length > 0 && (
          <nav aria-label="Related guides">
            <h2 className="font-display text-lg font-bold text-brand-950 mb-3">Related</h2>
            <ul className="grid sm:grid-cols-3 gap-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link to={`/${r.slug}`} className="surface block p-4 text-sm font-medium text-brand-900 hover:text-brand-700 h-full">
                    {r.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </article>
    </div>
  );
}
