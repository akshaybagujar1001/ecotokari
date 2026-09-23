export default function Terms() {
  return (
    <div className="min-h-screen py-14">
      <div className="page-shell max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600 mb-2">Legal</p>
        <h1 className="font-display text-4xl font-bold text-brand-950 mb-6">Terms of Service</h1>
        <div className="surface p-6 md:p-8 space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
          <p>By using the EcoTokari website, you agree to these terms for browsing, ordering, and receiving our products.</p>
          <h2 className="font-display text-xl font-bold text-brand-950 pt-2">Orders</h2>
          <p>Orders are subject to product availability and confirmation. Prices, units, and delivery estimates shown on the site apply at the time of order.</p>
          <h2 className="font-display text-xl font-bold text-brand-950 pt-2">Delivery & freshness</h2>
          <p>We pack produce as fresh as possible. Delivery timelines may vary by location. Please inspect deliveries on receipt and contact us promptly with any quality concerns.</p>
          <h2 className="font-display text-xl font-bold text-brand-950 pt-2">Payments</h2>
          <p>Payment methods shown at checkout are accepted as available. For bulk or hotel orders, custom payment terms may apply as agreed with EcoTokari.</p>
          <h2 className="font-display text-xl font-bold text-brand-950 pt-2">Contact</h2>
          <p>Questions about these terms? Email <a className="text-brand-700 font-medium hover:underline" href="mailto:hello@ecotokari.com">hello@ecotokari.com</a>.</p>
          <p className="text-xs text-gray-500 pt-4">Last updated: {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
