import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ShieldCheck, SlidersHorizontal, Sparkles, Store, Truck, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../lib/api';

function normalizeCategory(value) {
  return value === 'Legacy Import' ? 'Farm Essentials' : value;
}

export default function Products() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get('q') || '');
  const [category, setCategory] = useState(() => searchParams.get('category') || 'All');
  const [sort, setSort] = useState('popular');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const nextCategory = searchParams.get('category');
    const nextSearch = searchParams.get('q');
    if (nextCategory) setCategory(nextCategory);
    if (nextSearch != null) setSearch(nextSearch);
  }, [searchParams]);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      setLoading(true);
      setError('');

      try {
        const data = await fetchProducts();
        if (!active) return;
        setProducts(data.products || []);
        const normalizedCategories = (data.products || [])
          .map((product) => normalizeCategory(product.category))
          .filter(Boolean);
        setCategories(normalizedCategories.length ? ['All', ...Array.from(new Set(normalizedCategories))] : ['All']);
      } catch (err) {
        if (!active) return;
        setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProducts();
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const displayCategory = normalizeCategory(p.category);
      const matchCat = category === 'All' || displayCategory === category || (p.category || '').toLowerCase().includes(category.toLowerCase()) || displayCategory.toLowerCase().includes(category.toLowerCase());
      const matchSearch = !search
        || p.name.toLowerCase().includes(search.toLowerCase())
        || (p.description || '').toLowerCase().includes(search.toLowerCase());
      const matchStock = !inStockOnly || p.inStock;
      return matchCat && matchSearch && matchStock;
    });
    if (sort === 'popular') list = [...list].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [search, category, sort, products, inStockOnly]);

  const featuredProducts = filtered.slice(0, 3);
  const bestSeller = featuredProducts[0];
  const totalInStock = products.filter(product => product.inStock).length;

  return (
    <div className="min-h-screen">
      <div className="border-b border-brand-100 bg-white/80 backdrop-blur-sm">
        <div className="page-shell py-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="animate-fade-up">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
                <Sparkles size={14} />
                Most ordered by customers
              </p>
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-brand-950 md:text-5xl text-balance">
                Fresh Banana Products
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-gray-600 leading-relaxed font-medium tracking-tight">
                Farm-harvested daily, packed with care, and delivered across India for homes, caterers, and businesses.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {[
                  { icon: Truck, label: 'Pan-India delivery' },
                  { icon: ShieldCheck, label: 'Trusted quality checks' },
                  { icon: Store, label: 'Bulk order support' },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-2 text-sm font-medium text-gray-700">
                    <Icon size={15} className="text-brand-600" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-brand-700/20 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 p-6 text-white shadow-[0_18px_50px_rgba(21,128,61,0.2)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">Top Seller</p>
              <h2 className="mt-3 text-2xl md:text-3xl font-display font-bold">{bestSeller?.name || 'Fresh Banana Leaf'}</h2>
              <p className="mt-3 text-sm leading-6 text-brand-100/90">
                Best-selling essentials for restaurants, festive meals, and repeat customer orders.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.16em] text-brand-200">Products live</p>
                  <p className="mt-2 text-2xl font-bold">{products.length}</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.16em] text-brand-200">In stock now</p>
                  <p className="mt-2 text-2xl font-bold">{totalInStock}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-shell py-8 md:py-10">
        <div className="mb-8 surface p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Browse</p>
              <h2 className="mt-1 text-xl font-semibold text-brand-950">Find the right product</h2>
            </div>
            <label className="inline-flex items-center gap-3 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-800 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-4 w-4 rounded border-brand-300 text-brand-600 focus:ring-brand-500"
              />
              In stock only
            </label>
          </div>

          <div className="mt-5 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field pl-10 !py-2.5"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-gray-500" />
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 bg-white"
              >
                <option value="popular">Most Popular</option>
                <option value="name">Name A-Z</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === c
                  ? 'bg-brand-700 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-brand-100 hover:border-brand-300 hover:text-brand-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading && <p className="text-sm text-gray-500 mb-5">Loading products...</p>}
        {error && (
          <div className="mb-5 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
            {error}
            <p className="mt-1 text-red-600/80">You can still reach us on WhatsApp for orders.</p>
          </div>
        )}

        <p className="text-sm text-gray-500 mb-5">
          Showing <strong className="text-brand-900">{filtered.length}</strong> product{filtered.length !== 1 ? 's' : ''}
          {category !== 'All' && <> in <strong className="text-brand-900">{category}</strong></>}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : !loading ? (
          <div className="text-center py-20 surface">
            <Search size={48} className="mx-auto mb-4 text-brand-200" />
            <p className="text-lg font-medium text-brand-950">No products found</p>
            <p className="text-sm mt-1 text-gray-500">Try a different search or category</p>
            <button
              onClick={() => { setSearch(''); setCategory('All'); setInStockOnly(false); }}
              className="mt-4 btn-outline text-sm"
            >
              Clear Filters
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
