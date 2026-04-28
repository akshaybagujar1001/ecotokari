import { useEffect, useMemo, useState } from 'react';
import { Search, ShieldCheck, SlidersHorizontal, Sparkles, Store, Truck, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../lib/api';

export default function Products() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('popular');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
          .map((product) => product.category === 'Legacy Import' ? 'Farm Essentials' : product.category)
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
      const displayCategory = p.category === 'Legacy Import' ? 'Farm Essentials' : p.category;
      const matchCat = category === 'All' || displayCategory === category;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
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
    <div className="min-h-screen bg-[#f7f9f4]">
      <div className="border-b border-emerald-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                <Sparkles size={14} />
                Most ordered by customers
              </p>
              <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Fresh Banana Products
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-gray-600">
                Farm-harvested daily, packed with care, and delivered across India for homes, caterers, and businesses.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { icon: Truck, label: 'Pan-India delivery' },
                  { icon: ShieldCheck, label: 'Trusted quality checks' },
                  { icon: Store, label: 'Bulk order support' },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                    <Icon size={16} className="text-emerald-600" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-emerald-100 bg-gradient-to-br from-emerald-900 via-emerald-800 to-lime-700 p-6 text-white shadow-[0_18px_55px_rgba(21,128,61,0.18)]">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100">Top Seller</p>
              <h2 className="mt-3 text-3xl font-display font-bold">{bestSeller?.name || 'Fresh Banana Leaf'}</h2>
              <p className="mt-3 text-sm leading-6 text-emerald-50">
                Best-selling essentials for restaurants, festive meals, traditional serving, and repeat customer orders.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-100">Products live</p>
                  <p className="mt-2 text-2xl font-bold">{products.length}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-100">In stock now</p>
                  <p className="mt-2 text-2xl font-bold">{totalInStock}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 rounded-[28px] border border-emerald-100 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Smart discovery</p>
              <h2 className="mt-1 text-xl font-semibold text-gray-900">Find the right product faster</h2>
            </div>
            <label className="inline-flex items-center gap-3 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
              />
              In stock only
            </label>
          </div>

          <div className="mt-5 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, use cases, or names..."
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
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
              <option value="popular">Most Popular</option>
              <option value="name">Name A-Z</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
        </div>

        {featuredProducts.length > 0 && (
          <div className="mb-10">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Customer favourites</p>
                <h2 className="mt-1 text-2xl font-display font-bold text-gray-900">Best sellers this season</h2>
              </div>
              <p className="text-sm text-gray-500">Sorted by actual customer order volume</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {featuredProducts.map((product, index) => (
                <div key={product.id} className="rounded-[24px] border border-emerald-100 bg-white p-5 shadow-[0_10px_26px_rgba(15,23,42,0.04)]">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      #{index + 1} Best Seller
                    </span>
                    <span className={`text-xs font-semibold ${product.inStock ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {product.inStock ? 'Ready to order' : 'Out of stock'}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{product.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {product.category === 'Legacy Import' ? 'Farm essentials' : product.category} • Rs {product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === c ? 'bg-brand-700 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300 hover:text-brand-700'
              }`}>
              {c}
            </button>
          ))}
        </div>

        {loading && <p className="text-sm text-gray-500 mb-5">Loading products...</p>}
        {error && <p className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <p className="text-sm text-gray-500 mb-5">
          Showing <strong>{filtered.length}</strong> product{filtered.length !== 1 ? 's' : ''}
          {category !== 'All' && <> in <strong>{category}</strong></>}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <Search size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
            <button onClick={() => { setSearch(''); setCategory('All'); }} className="mt-4 btn-outline text-sm">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
