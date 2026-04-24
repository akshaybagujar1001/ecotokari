import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin } from 'lucide-react';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-brand-600 text-white p-1.5 rounded-lg"><Leaf size={18} /></div>
              <span className="font-display font-bold text-xl text-white">EcoTokari</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Pune's largest supplier of fresh banana leaves, stems & flowers. Serving hotels, caterers & homes pan-India since 2018.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/ecotokari8" target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-brand-800 rounded-lg flex items-center justify-center hover:bg-brand-600 transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-brand-800 rounded-lg flex items-center justify-center hover:bg-brand-600 transition-colors">
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[['/', 'Home'], ['/products', 'Shop'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}><Link to={to} className="hover:text-brand-300 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2.5 text-sm">
              {['Banana Leaves', 'Banana Stem', 'Banana Flower', 'Festival Combo', 'Hotel Supply'].map(p => (
                <li key={p}><Link to="/products" className="hover:text-brand-300 transition-colors">{p}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
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
