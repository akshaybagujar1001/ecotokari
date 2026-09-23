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
      {/* Hero — compact composition */}
      <section className="relative h-[42vh] min-h-[280px] max-h-[420px] flex items-center overflow-hidden bg-brand-950">
        <div className="absolute inset-0">
          <img
            src="/hero-banana-leaves.png"
            alt="Fresh banana leaves"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/55 to-brand-950/15" />
        </div>

        <div className="relative page-shell w-full py-10 md:py-12">
          <div className="max-w-lg animate-fade-up">
            <p className="text-brand-300 text-xs md:text-sm font-semibold tracking-tight mb-2">
              EcoTokari
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-[2.15rem] font-extrabold text-white leading-[1.2] tracking-tight mb-3 text-balance">
              Fresh banana leaves, delivered pan-India
            </h1>
            <p className="text-sm text-brand-50/90 mb-5 leading-relaxed max-w-md font-medium tracking-tight">
              Farm-fresh leaves, stems & flowers from Pune — trusted by hotels, caterers, and families.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <Link to="/products" className="btn-primary !px-4 !py-2 text-center text-sm bg-white text-brand-900 hover:bg-brand-50">
                Shop Now <ArrowRight size={15} />
              </Link>
              <a
                href="tel:+918010884556"
                className="btn-outline !px-4 !py-2 border-white/80 text-white hover:bg-white hover:text-brand-900 text-center text-sm"
              >
                <Phone size={14} /> Call for Bulk Orders
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-brand-800 border-y border-brand-700/50">
        <div className="page-shell py-6 md:py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-0 md:divide-x md:divide-brand-600/60">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center px-4">
                <Icon size={18} className="text-brand-300 mb-1.5" />
                <span className="text-lg md:text-xl font-extrabold text-white tracking-tight">{value}</span>
                <span className="text-[11px] md:text-xs text-brand-100 mt-0.5 font-medium tracking-tight">{label}</span>
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
                <h3 className="font-bold text-brand-950 mb-2 tracking-tight">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium tracking-tight">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-14 md:py-16">
        <div className="page-shell">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-left text-2xl font-extrabold tracking-tight text-brand-950 md:text-3xl">
                Our Best Sellers
              </h2>
              <p className="mt-1.5 text-sm font-medium tracking-tight text-gray-500">
                Freshest picks loved by our customers
              </p>
            </div>
            <Link
              to="/products"
              className="hidden items-center gap-1 text-sm font-semibold tracking-tight text-brand-700 transition-all hover:gap-2 md:inline-flex"
            >
              View all <ArrowRight size={15} />
            </Link>
          </div>
          {featured.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="surface p-10 text-center text-gray-500">
              <p>Loading fresh picks…</p>
              <Link to="/products" className="btn-outline mt-4 text-sm">Browse Shop</Link>
            </div>
          )}
          <div className="mt-6 text-center md:hidden">
            <Link to="/products" className="btn-outline text-sm">View All Products</Link>
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
                <h3 className="font-bold text-brand-950 text-lg mb-2 tracking-tight">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-medium tracking-tight">{desc}</p>
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
      <section className="border-y border-brand-100 bg-gradient-to-br from-brand-50 via-[#eef6ea] to-white py-12 md:py-14">
        <div className="page-shell text-center">
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-brand-950 md:text-3xl text-balance">
            Ready to Order Fresh?
          </h2>
          <p className="mx-auto mb-7 max-w-xl text-sm font-medium leading-relaxed tracking-tight text-gray-600 md:text-[15px]">
            Get the freshest banana leaves delivered to your door. Hotels and caterers can request a custom quote.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/products" className="btn-primary !px-5 !py-2.5 text-sm">
              Shop Now
            </Link>
            <a
              href="https://wa.me/918010884556"
              target="_blank"
              rel="noreferrer"
              className="btn-outline !px-5 !py-2.5 text-sm"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
