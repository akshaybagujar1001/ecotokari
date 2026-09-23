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
    <footer className="bg-brand-950 text-gray-300">
      <div className="page-shell py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-brand-600 text-white p-1.5 rounded-lg"><Leaf size={18} /></div>
              <span className="font-display font-bold text-xl text-white">EcoTokari</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Pune&apos;s largest supplier of fresh banana leaves, stems & flowers. Serving hotels, caterers & homes pan-India since 2018.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/ecotokari8"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-brand-800 rounded-lg flex items-center justify-center hover:bg-brand-600 transition-colors"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[['/', 'Home'], ['/products', 'Shop'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}><Link to={to} className="hover:text-brand-300 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_PRODUCTS.map(({ label, q }) => (
                <li key={label}>
                  <Link to={`/products?q=${encodeURIComponent(q)}`} className="hover:text-brand-300 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 text-brand-400 shrink-0" />
                <span>Pimple Saudagar, Pune – 411027, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-brand-400 shrink-0" />
                <a href="tel:+918010884556" className="hover:text-brand-300 transition-colors">+91 80108 84556</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-brand-400 shrink-0" />
                <a href="mailto:hello@ecotokari.com" className="hover:text-brand-300 transition-colors">hello@ecotokari.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-brand-900 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} EcoTokari. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
