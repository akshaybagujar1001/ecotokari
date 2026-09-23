import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Check } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  const INFO = [
    { icon: MapPin, title: 'Address', lines: ['Pimple Saudagar, Pune – 411027', 'Maharashtra, India'] },
    { icon: Phone, title: 'Phone', lines: ['+91 80108 84556', 'Mon–Sat, 8 AM – 8 PM'] },
    { icon: Mail, title: 'Email', lines: ['hello@ecotokari.com', 'orders@ecotokari.com'] },
    { icon: Clock, title: 'Business Hours', lines: ['Mon–Sat: 8 AM – 8 PM', 'Sunday: 8 AM – 2 PM'] },
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-brand-950 text-white py-14 md:py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(74,222,128,0.15),_transparent_60%)]" />
        <div className="relative page-shell">
          <p className="font-display text-brand-300 text-lg font-semibold mb-2">EcoTokari</p>
          <h1 className="font-display text-4xl font-bold mb-3">Get in Touch</h1>
          <p className="text-brand-100/85 max-w-md mx-auto leading-relaxed">
            Questions about bulk orders? Need a custom quote for your hotel? We&apos;re here to help.
          </p>
        </div>
      </div>

      <div className="page-shell py-14 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="space-y-4">
            {INFO.map(({ icon: Icon, title, lines }) => (
              <div key={title} className="surface p-5 flex gap-4">
                <div className="w-10 h-10 bg-brand-100 text-brand-700 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-semibold text-brand-950 text-sm mb-0.5">{title}</p>
                  {lines.map(l => <p key={l} className="text-gray-600 text-sm">{l}</p>)}
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/918010884556"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 bg-green-600 text-white rounded-2xl p-5 hover:bg-green-700 transition-colors shadow-md shadow-green-600/20"
            >
              <MessageCircle size={22} />
              <div>
                <p className="font-semibold">WhatsApp Us</p>
                <p className="text-green-100 text-sm">Quickest way for bulk orders</p>
              </div>
            </a>
          </div>

          <div className="lg:col-span-2">
            <div className="surface p-6 md:p-8">
              {sent ? (
                <div className="text-center py-10 animate-fade-in">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-brand-950 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We&apos;ll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                    className="mt-5 btn-outline text-sm"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-bold text-brand-950 mb-5">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
                        <input name="name" required value={form.name} onChange={onChange} placeholder="Full name" className="input-field" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                        <input name="email" type="email" required value={form.email} onChange={onChange} placeholder="you@example.com" className="input-field" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                        <input name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="+91 9999999999" className="input-field" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                        <select name="subject" value={form.subject} onChange={onChange} className="input-field">
                          <option value="">Select subject</option>
                          <option>Bulk/Hotel Order</option>
                          <option>Delivery Query</option>
                          <option>Product Information</option>
                          <option>Partnership</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        value={form.message}
                        onChange={onChange}
                        placeholder="Tell us about your requirement..."
                        className="input-field resize-none"
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full text-base">Send Message</button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 surface overflow-hidden h-64 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-100 via-brand-50 to-lime-50" />
          <div className="relative text-center px-4">
            <MapPin size={32} className="mx-auto mb-2 text-brand-600" />
            <p className="text-sm font-medium text-brand-950">Pimple Saudagar, Pune – 411027</p>
            <a
              href="https://maps.google.com/?q=Pimple+Saudagar+Pune"
              target="_blank"
              rel="noreferrer"
              className="text-brand-700 text-sm font-semibold hover:underline mt-2 inline-block"
            >
              View on Google Maps →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
