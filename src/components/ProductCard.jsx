import { Link } from 'react-router-dom';
import { ShoppingCart, Sparkles, Truck, Check, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const hasDiscount = product.originalPrice > product.price;
  const discount = hasDiscount ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const salesBadge = product.popularity > 1000
    ? 'Best Seller'
    : product.popularity > 0
      ? 'Popular Choice'
      : null;
  const displayCategory = product.category === 'Legacy Import' ? 'Farm Essentials' : product.category;

  const clampQty = (value) => {
    const num = Number.parseInt(String(value).replace(/\D/g, ''), 10);
    if (!Number.isFinite(num) || num < 1) return 1;
    if (num > 999) return 999;
    return num;
  };

  const handleQtyInput = (e) => {
    const raw = e.target.value;
    if (raw === '') {
      setQty('');
      return;
    }
    setQty(clampQty(raw));
  };

  const handleQtyBlur = () => {
    setQty((current) => clampQty(current === '' ? 1 : current));
  };

  const handleAdd = () => {
    if (!product.inStock) return;
    const amount = clampQty(qty);
    setQty(amount);
    addToCart(product, amount);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-[0_8px_28px_rgba(15,40,20,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,40,20,0.1)]">
      <Link to={`/products/${product.id}`} className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-brand-50 via-white to-lime-50">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-50 text-4xl font-bold text-brand-200">
            {product.name?.charAt(0) || '?'}
          </div>
        )}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-bold ${
              product.badge === 'Out of Stock'
                ? 'bg-rose-600 text-white'
                : product.badge === 'In Stock'
                  ? 'bg-brand-700 text-white'
                  : product.badge === 'Best Seller'
                    ? 'bg-amber-400 text-amber-950'
                    : product.badge === 'Premium'
                      ? 'bg-brand-800 text-white'
                      : product.badge === 'B2B'
                        ? 'bg-brand-600 text-white'
                        : 'bg-brand-700 text-white'
            }`}
          >
            {product.badge}
          </span>
        )}
        {salesBadge && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-gray-700 shadow-sm">
            <Sparkles size={12} className="text-amber-500" />
            {salesBadge}
          </span>
        )}
        {hasDiscount && (
          <span className="absolute top-3 right-3 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">{displayCategory}</p>
        <Link
          to={`/products/${product.id}`}
          className="mb-2 min-h-[3.25rem] text-lg font-semibold leading-snug text-brand-950 transition-colors hover:text-brand-700"
        >
          {product.name}
        </Link>

        <p className={`mb-3 text-sm font-semibold ${product.inStock ? 'text-brand-700' : 'text-rose-600'}`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </p>

        <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-brand-700 font-medium">Fresh dispatch</span>
          <span className="inline-flex items-center gap-1">
            <Truck size={12} />
            Pan-India
          </span>
        </div>

        <div className="mt-auto">
          <div className="mb-3 flex items-baseline gap-2">
            <span className="text-xl font-bold text-brand-950">₹{product.price}</span>
            {hasDiscount && <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>}
            <span className="text-xs text-gray-500">{product.unit}</span>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`flex items-center overflow-hidden rounded-xl border bg-white ${
                product.inStock ? 'border-brand-200' : 'border-gray-200 opacity-60'
              }`}
            >
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={!product.inStock}
                onClick={() => setQty((current) => Math.max(1, clampQty(current) - 1))}
                className="px-2.5 py-2.5 text-brand-800 transition-colors hover:bg-brand-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <Minus size={14} />
              </button>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                aria-label="Quantity"
                disabled={!product.inStock}
                value={qty}
                onChange={handleQtyInput}
                onBlur={handleQtyBlur}
                className="w-10 border-x border-brand-100 bg-transparent py-2 text-center text-sm font-semibold text-brand-950 outline-none disabled:cursor-not-allowed"
              />
              <button
                type="button"
                aria-label="Increase quantity"
                disabled={!product.inStock}
                onClick={() => setQty((current) => Math.min(999, clampQty(current) + 1))}
                className="px-2.5 py-2.5 text-brand-800 transition-colors hover:bg-brand-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={!product.inStock}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
                !product.inStock
                  ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                  : added
                    ? 'bg-green-600 text-white'
                    : 'bg-brand-700 text-white hover:bg-brand-800 active:scale-[0.98]'
              }`}
            >
              {added ? (
                <><Check size={15} /> Added</>
              ) : (
                <><ShoppingCart size={15} /> {product.inStock ? 'Add' : 'Out of Stock'}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
