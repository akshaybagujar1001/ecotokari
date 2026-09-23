export default function Privacy() {
  return (
    <div className="min-h-screen py-14">
      <div className="page-shell max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600 mb-2">Legal</p>
        <h1 className="font-display text-4xl font-bold text-brand-950 mb-6">Privacy Policy</h1>
        <div className="surface p-6 md:p-8 space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
          <p>EcoTokari (“we”, “us”) respects your privacy. This page explains what information we collect when you use our website and how we use it.</p>
          <h2 className="font-display text-xl font-bold text-brand-950 pt-2">Information we collect</h2>
          <p>Account details such as name, email, phone number, delivery address, and order history when you register or place an order.</p>
          <h2 className="font-display text-xl font-bold text-brand-950 pt-2">How we use it</h2>
          <p>To process orders, deliver products, support your account, improve our service, and contact you about your orders when needed.</p>
          <h2 className="font-display text-xl font-bold text-brand-950 pt-2">Sharing</h2>
          <p>We do not sell your personal information. We may share order details with delivery partners solely to fulfill your order.</p>
          <h2 className="font-display text-xl font-bold text-brand-950 pt-2">Contact</h2>
          <p>For privacy questions, email <a className="text-brand-700 font-medium hover:underline" href="mailto:hello@ecotokari.com">hello@ecotokari.com</a> or call +91 80108 84556.</p>
          <p className="text-xs text-gray-500 pt-4">Last updated: {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
