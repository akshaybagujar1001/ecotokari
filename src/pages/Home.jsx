import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Truck, ShieldCheck, Leaf, Phone, Star, ArrowRight, Award, Users, PackageCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../lib/api';

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
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    let active = true;

    fetchProducts()
      .then((data) => {
        if (!active) return;
        setFeatured((data.products || []).slice(0, 4));
      })
      .catch(() => {
        if (!active) return;
        setFeatured([]);
      });

    return () => { active = false; };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero — one composition: brand, headline, line, CTAs, full-bleed image */}
      <section className="relative min-h-[88vh] flex items-end md:items-center overflow-hidden bg-brand-950">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=1600&q=80"
            alt="Fresh banana leaves"
            className="w-full h-full object-cover scale-105 animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/75 to-brand-950/35 md:bg-gradient-to-r md:from-brand-950/95 md:via-brand-950/70 md:to-brand-950/20" />
        </div>

        <div className="relative page-shell w-full py-20 md:py-28">
          <div className="max-w-2xl animate-fade-up">
            <p className="font-display text-brand-300 text-xl md:text-2xl font-semibold tracking-tight mb-4">
              EcoTokari
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white leading-[1.08] mb-5 text-balance">
              Fresh banana leaves, delivered pan-India
            </h1>
            <p className="text-base md:text-lg text-brand-100/90 mb-8 leading-relaxed max-w-xl">
              Farm-fresh leaves, stems & flowers from Pune — trusted by hotels, caterers, and families.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/products" className="btn-primary text-center text-base bg-white text-brand-900 hover:bg-brand-50">
                Shop Now <ArrowRight size={18} />
              </Link>
              <a
                href="tel:+918010884556"
                className="btn-outline border-white/80 text-white hover:bg-white hover:text-brand-900 text-center text-base"
              >
                <Phone size={16} /> Call for Bulk Orders
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-white/35 text-xs">
          <span>Scroll</span>
          <div className="w-px h-7 bg-white/25 animate-soft-pulse" />
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-brand-800 border-y border-brand-700/50">
        <div className="page-shell py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-brand-600/60">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center px-4">
                <Icon size={20} className="text-brand-300 mb-2" />
                <span className="text-xl md:text-2xl font-bold text-white tracking-tight">{value}</span>
                <span className="text-xs md:text-sm text-brand-200 mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why EcoTokari */}
      <section className="py-20 md:py-24">
        <div className="page-shell">
          <h2 className="section-title">Why Choose EcoTokari?</h2>
          <p className="section-sub">
            We don&apos;t just sell banana leaves — we build long-term relationships with hotels, caterers, and families who care about freshness.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {WHY.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="surface p-6 text-center transition-transform duration-300 hover:-translate-y-0.5">
                <div className="w-12 h-12 bg-brand-100 text-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-brand-950 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-brand-50/80 to-transparent">
        <div className="page-shell">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="section-title text-left">Our Best Sellers</h2>
              <p className="text-gray-600 mt-2">Freshest picks loved by our customers</p>
            </div>
            <Link to="/products" className="hidden md:inline-flex items-center gap-1 text-brand-700 font-semibold hover:gap-2 transition-all">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          {featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="surface p-10 text-center text-gray-500">
              <p>Loading fresh picks…</p>
              <Link to="/products" className="btn-outline mt-4 text-sm">Browse Shop</Link>
            </div>
          )}
          <div className="text-center mt-8 md:hidden">
            <Link to="/products" className="btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 md:py-24">
        <div className="page-shell">
          <h2 className="section-title">How It Works</h2>
          <p className="section-sub">Order fresh banana produce from farm to your doorstep in 3 easy steps.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { step: '01', title: 'Browse & Order', desc: 'Choose your products, select quantity, and place your order online or via call.' },
              { step: '02', title: 'We Pack Fresh', desc: 'Same-day harvest. Our team hand-packs your order within hours of your purchase.' },
              { step: '03', title: 'Doorstep Delivery', desc: 'We deliver to your home, hotel, or restaurant across Pune and pan-India.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="surface p-8 text-center">
                <div className="w-12 h-12 bg-brand-700 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-5 shadow-md shadow-brand-700/25">
                  {step}
                </div>
                <h3 className="font-semibold text-brand-950 text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-24 bg-brand-50/60">
        <div className="page-shell">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-sub">Loved by hotels, caterers, and families across India.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="surface p-6">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-3 border-t border-brand-100">
                  <div className="w-9 h-9 bg-brand-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-950 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-brand-900 text-white py-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(74,222,128,0.18),_transparent_55%)]" />
        <div className="relative page-shell text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to Order Fresh?</h2>
          <p className="text-brand-200 mb-8 max-w-xl mx-auto leading-relaxed">
            Get the freshest banana leaves delivered to your door. Hotels and caterers can request a custom quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/products" className="btn-primary bg-white text-brand-900 hover:bg-brand-50">
              Shop Now
            </Link>
            <a
              href="https://wa.me/918010884556"
              target="_blank"
              rel="noreferrer"
              className="btn-outline border-white/80 text-white hover:bg-white hover:text-brand-900"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
