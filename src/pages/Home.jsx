import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Leaf, Phone, Star, ArrowRight, Award, Users, PackageCheck } from 'lucide-react';
import { PRODUCTS, TESTIMONIALS } from '../data/products';
import ProductCard from '../components/ProductCard';

const STATS = [
  { icon: Users, value: '5,000+', label: 'Happy Customers' },
  { icon: Truck, value: 'Pan-India', label: 'Delivery Network' },
  { icon: PackageCheck, value: '50,000+', label: 'Orders Delivered' },
  { icon: Award, value: '6+ Years', label: 'In Business' },
];

const WHY = [
  { icon: Leaf, title: 'Farm Fresh Daily', desc: 'Leaves harvested every morning from farms around Pune. Never stored for more than 12 hours.' },
  { icon: Truck, title: 'Pan-India Delivery', desc: 'We ship fresh produce to hotels, caterers and homes across India with express delivery options.' },
  { icon: ShieldCheck, title: 'Quality Guaranteed', desc: 'Every batch is hand-inspected. If you\'re not happy, we replace or refund — no questions asked.' },
  { icon: Phone, title: '24/7 B2B Support', desc: 'Dedicated account manager for hotels and caterers. WhatsApp, call, or email — we\'re always on.' },
];

export default function Home() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-950">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=1600&q=80"
            alt="Fresh banana leaves"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/70 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-1.5 bg-brand-800/60 text-brand-300 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
              <Leaf size={14} /> Pune's #1 Banana Leaf Supplier
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Fresh Banana<br />
              <span className="text-brand-400">Leaves</span> Delivered<br />
              Pan-India
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Farm-fresh banana leaves, stems & flowers sourced daily from Pune farms.
              Trusted by 500+ hotels, caterers & event managers across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn-primary text-center text-base">
                Shop Now <ArrowRight size={18} className="inline ml-1" />
              </Link>
              <a href="tel:+918010884556" className="btn-outline border-white text-white hover:bg-white hover:text-brand-800 text-center text-base">
                <Phone size={16} className="inline mr-2" /> Call for Bulk Orders
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40 text-xs">
          <span>Scroll to explore</span>
          <div className="w-px h-8 bg-white/20 animate-pulse" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-brand-600">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center px-4">
                <Icon size={24} className="text-brand-200 mb-2" />
                <span className="text-2xl font-bold text-white">{value}</span>
                <span className="text-sm text-brand-200 mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why EcoTokari */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Why Choose EcoTokari?</h2>
          <p className="section-sub">We don't just sell banana leaves — we build long-term relationships with hotels, caterers, and families who care about freshness.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {WHY.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-12 h-12 bg-brand-100 text-brand-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title text-left">Our Best Sellers</h2>
              <p className="text-gray-500 mt-2">Freshest picks loved by our customers</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-1 text-brand-700 font-medium hover:gap-2 transition-all">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link to="/products" className="btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">How It Works</h2>
          <p className="section-sub">Order fresh banana produce from farm to your doorstep in 3 easy steps.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative">
            {[
              { step: '01', title: 'Browse & Order', desc: 'Choose your products, select quantity, and place your order online or via call.' },
              { step: '02', title: 'We Pack Fresh', desc: 'Same-day harvest. Our team hand-packs your order within hours of your purchase.' },
              { step: '03', title: 'Doorstep Delivery', desc: 'We deliver to your home, hotel, or restaurant across Pune and pan-India.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative text-center p-8 bg-white rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-brand-700 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-5">
                  {step}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-sub">Loved by hotels, caterers, and families across India.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="w-9 h-9 bg-brand-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brand-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Order Fresh?</h2>
          <p className="text-brand-200 mb-8 max-w-xl mx-auto">Get the freshest banana leaves delivered to your door. Hotels and caterers can request a custom quote.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="bg-white text-brand-800 px-8 py-3 rounded-lg font-semibold hover:bg-brand-50 transition-colors">
              Shop Now
            </Link>
            <a href="https://wa.me/918010884556" target="_blank" rel="noreferrer"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
