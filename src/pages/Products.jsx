import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('popular');

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p => {
      const matchCat = category === 'All' || p.category === category;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, category, sort]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-display text-3xl font-bold text-gray-900">Fresh Banana Products</h1>
          <p className="text-gray-500 mt-1">Farm-harvested daily. Delivered pan-India.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
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

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-gray-500" />
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === c ? 'bg-brand-700 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300 hover:text-brand-700'
              }`}>
              {c}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-5">
          Showing <strong>{filtered.length}</strong> product{filtered.length !== 1 ? 's' : ''}
          {category !== 'All' && <> in <strong>{category}</strong></>}
        </p>

        {/* Grid */}
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
