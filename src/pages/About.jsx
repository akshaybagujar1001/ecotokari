import { Link } from 'react-router-dom';
import { Leaf, Heart, Sprout } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-28 bg-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1605105789722-fb41aa5e8b0d?w=1400&q=60"
            alt=""
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/70 via-brand-950/80 to-brand-950" />
        </div>
        <div className="relative page-shell text-center">
          <p className="font-display text-brand-300 text-lg font-semibold mb-3">EcoTokari</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-5 text-balance">
            From farm to your plate,<br className="hidden sm:block" /> with love from Pune
          </h1>
          <p className="text-brand-100/90 max-w-2xl mx-auto text-lg leading-relaxed">
            Every festival, every meal, every celebration deserves the freshest banana leaf.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#f6f8f4]">
        <div className="page-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-brand-950 mb-5">Our Journey</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  EcoTokari was founded in 2018 in Pune with a simple mission — connect local banana farmers directly with hotels, caterers and families, eliminating middlemen and guaranteeing freshness.
                </p>
                <p>
                  What started as a small operation supplying banana leaves to a few restaurants in Pimple Saudagar has grown into Pune&apos;s largest banana produce supplier, delivering pan-India.
                </p>
                <p>
                  Today, we partner with 30+ farms around Pune, deliver to 500+ hotels and caterers, and have served over 50,000 orders. We remain committed to quality, sustainability, and supporting local farmers.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-brand-100">
              <img
                src="https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=800&q=80"
                alt="Banana farm"
                className="w-full aspect-video object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-brand-50/80">
        <div className="page-shell">
          <h2 className="section-title">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {[
              { icon: Sprout, title: 'Farm to Doorstep', desc: 'We cut out middlemen completely. Every leaf goes directly from our partner farms to your door.' },
              { icon: Heart, title: 'Community First', desc: 'We pay farmers fair prices, create rural employment, and invest back into Pune\'s farming communities.' },
              { icon: Leaf, title: '100% Natural', desc: 'No chemicals, no cold storage tricks. Just naturally harvested, same-day fresh produce.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="surface p-6 text-center">
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

      <section className="py-14 bg-brand-900 text-white">
        <div className="page-shell">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '2018', label: 'Founded' },
              { value: '30+', label: 'Farm Partners' },
              { value: '500+', label: 'B2B Clients' },
              { value: '50,000+', label: 'Orders Delivered' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-white mb-1 tracking-tight">{s.value}</div>
                <div className="text-brand-200 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center bg-[#f6f8f4]">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-brand-950 mb-4">Want Fresh Banana Products?</h2>
          <p className="text-gray-600 mb-6">Browse our range and get farm-fresh produce delivered to your door.</p>
          <Link to="/products" className="btn-primary inline-flex">Shop Now</Link>
        </div>
      </section>
    </div>
  );
}
