import { Link } from 'react-router-dom';
import { Leaf, Heart, Sprout } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-brand-900 py-14 md:py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1608139478418-5805c4c63188?w=1400&q=60"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-950/55" />
        </div>
        <div className="relative page-shell max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold tracking-tight text-white/90">EcoTokari</p>
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl text-balance">
            From farm to your plate, with love from Pune
          </h1>
          <p className="mx-auto max-w-xl text-[15px] font-medium leading-relaxed tracking-tight text-white/90">
            Every festival, every meal, every celebration deserves the freshest banana leaf.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="page-shell">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div>
              <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-brand-950 md:text-3xl">
                Our Journey
              </h2>
              <div className="space-y-3.5 text-[15px] font-medium leading-relaxed tracking-tight text-gray-600">
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
            <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-brand-100 bg-[#f3f6f1] shadow-sm lg:mx-0">
              <img
                src="https://images.unsplash.com/photo-1622491427961-f404948cea02?w=700&q=80"
                alt="Fresh banana leaves"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-100 bg-[#f6f9f4] py-12 md:py-14">
        <div className="page-shell">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-brand-950 md:text-3xl">
            Our Values
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: Sprout, title: 'Farm to Doorstep', desc: 'We cut out middlemen completely. Every leaf goes directly from our partner farms to your door.' },
              { icon: Heart, title: 'Community First', desc: 'We pay farmers fair prices, create rural employment, and invest back into Pune\'s farming communities.' },
              { icon: Leaf, title: '100% Natural', desc: 'No chemicals, no cold storage tricks. Just naturally harvested, same-day fresh produce.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-brand-100 bg-white p-5 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <Icon size={20} />
                </div>
                <h3 className="mb-1.5 font-bold tracking-tight text-brand-950">{title}</h3>
                <p className="text-sm font-medium leading-relaxed tracking-tight text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 md:py-12">
        <div className="page-shell">
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-brand-100 bg-[#f7faf5] px-4 py-8 text-center md:grid-cols-4 md:gap-6 md:px-8">
            {[
              { value: '2018', label: 'Founded' },
              { value: '30+', label: 'Farm Partners' },
              { value: '500+', label: 'B2B Clients' },
              { value: '50,000+', label: 'Orders Delivered' },
            ].map(s => (
              <div key={s.label}>
                <div className="mb-1 text-2xl font-extrabold tracking-tight text-brand-800 md:text-3xl">{s.value}</div>
                <div className="text-xs font-semibold tracking-tight text-gray-500 md:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-100 bg-[#f6f9f4] py-12 text-center">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-brand-950">
            Want Fresh Banana Products?
          </h2>
          <p className="mb-6 text-sm font-medium tracking-tight text-gray-600">
            Browse our range and get farm-fresh produce delivered to your door.
          </p>
          <Link to="/products" className="btn-primary inline-flex !px-5 !py-2.5 text-sm">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
