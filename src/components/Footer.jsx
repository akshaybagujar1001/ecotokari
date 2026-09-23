import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin } from 'lucide-react';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FOOTER_PRODUCTS = [
  { label: 'Banana Leaves', q: 'Banana Leaf' },
  { label: 'Banana Stem', q: 'Banana Stem' },
  { label: 'Banana Flower', q: 'Banana Flower' },
  { label: 'Festival Combo', q: 'Festival' },
  { label: 'Hotel Supply', q: 'Hotel' },
];

export default function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-[#f3f7f2] text-brand-950">
      <div className="page-shell py-12 md:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-xl bg-brand-700 p-1.5 text-white">
                <Leaf size={18} />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-brand-900">EcoTokari</span>
            </div>
            <p className="mb-5 text-sm font-medium leading-relaxed tracking-tight text-gray-600">
              Pune&apos;s largest supplier of fresh banana leaves, stems & flowers. Serving hotels, caterers & homes pan-India since 2018.
            </p>
            <a
              href="https://instagram.com/ecotokari8"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 transition-colors hover:bg-brand-700 hover:text-white"
            >
              <InstagramIcon />
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-extrabold tracking-tight text-brand-950">Quick Links</h4>
            <ul className="space-y-2.5 text-sm font-medium tracking-tight text-gray-600">
              {[['/', 'Home'], ['/products', 'Shop'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="transition-colors hover:text-brand-700">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-extrabold tracking-tight text-brand-950">Products</h4>
            <ul className="space-y-2.5 text-sm font-medium tracking-tight text-gray-600">
              {FOOTER_PRODUCTS.map(({ label, q }) => (
                <li key={label}>
                  <Link to={`/products?q=${encodeURIComponent(q)}`} className="transition-colors hover:text-brand-700">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-extrabold tracking-tight text-brand-950">Contact</h4>
            <ul className="space-y-3 text-sm font-medium tracking-tight text-gray-600">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-600" />
                <span>Pimple Saudagar, Pune – 411027, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-brand-600" />
                <a href="tel:+918010884556" className="transition-colors hover:text-brand-700">+91 80108 84556</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-brand-600" />
                <a href="mailto:hello@ecotokari.com" className="transition-colors hover:text-brand-700">hello@ecotokari.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-brand-200/80 pt-5 text-xs font-medium tracking-tight text-gray-500 md:flex-row">
          <span>© {new Date().getFullYear()} EcoTokari. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="transition-colors hover:text-brand-700">Privacy Policy</Link>
            <Link to="/terms" className="transition-colors hover:text-brand-700">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
