import { Link } from 'react-router-dom';
import { ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const hasDiscount = product.originalPrice > product.price;
  const discount = hasDiscount ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const displayCategory = product.category === 'Legacy Import' ? 'Farm Essentials' : product.category;
  const showBadge = product.badge && product.badge !== 'In Stock';
  const isPopular = product.popularity > 1000;

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
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white transition-all duration-300 hover:border-brand-200 hover:shadow-[0_12px_32px_rgba(15,40,20,0.08)]">
      <Link to={`/products/${product.id}`} className="relative block overflow-hidden bg-[#f3f6f1]">
        <div className="aspect-[16/11]">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-brand-200">
              {product.name?.charAt(0) || '?'}
            </div>
          )}
        </div>

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2.5">
          <div className="flex flex-wrap gap-1.5">
            {showBadge && (
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-tight ${
                  product.badge === 'Out of Stock'
                    ? 'bg-rose-500 text-white'
                    : product.badge === 'Best Seller'
                      ? 'bg-amber-400 text-amber-950'
                      : 'bg-white/95 text-brand-900 shadow-sm'
                }`}
              >
                {product.badge}
              </span>
            )}
            {isPopular && !showBadge && (
              <span className="rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold tracking-tight text-brand-900 shadow-sm">
                Best seller
              </span>
            )}
          </div>
          {hasDiscount && (
            <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-3.5">
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-600">
            {displayCategory}
          </p>
          <Link
            to={`/products/${product.id}`}
            className="line-clamp-2 text-[15px] font-bold leading-snug tracking-tight text-brand-950 transition-colors hover:text-brand-700"
          >
            {product.name}
          </Link>
          <p className={`mt-1 text-xs font-semibold tracking-tight ${product.inStock ? 'text-brand-600' : 'text-rose-500'}`}>
            {product.inStock ? 'In stock · Pan-India delivery' : 'Out of stock'}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold tracking-tight text-brand-950">₹{product.price}</span>
            {hasDiscount && <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>}
            {product.unit && <span className="text-[11px] font-medium text-gray-500">{product.unit}</span>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`flex h-9 items-center overflow-hidden rounded-full border bg-[#f7f9f6] ${
              product.inStock ? 'border-black/[0.08]' : 'border-gray-200 opacity-50'
            }`}
          >
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={!product.inStock}
              onClick={() => setQty((current) => Math.max(1, clampQty(current) - 1))}
              className="flex h-9 w-8 items-center justify-center text-brand-800 transition-colors hover:bg-white disabled:cursor-not-allowed"
            >
              <Minus size={13} />
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
              className="h-9 w-8 bg-transparent text-center text-sm font-bold tracking-tight text-brand-950 outline-none disabled:cursor-not-allowed"
            />
            <button
              type="button"
              aria-label="Increase quantity"
              disabled={!product.inStock}
              onClick={() => setQty((current) => Math.min(999, clampQty(current) + 1))}
              className="flex h-9 w-8 items-center justify-center text-brand-800 transition-colors hover:bg-white disabled:cursor-not-allowed"
            >
              <Plus size={13} />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full text-sm font-semibold tracking-tight transition-all duration-200 ${
              !product.inStock
                ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                : added
                  ? 'bg-green-600 text-white'
                  : 'bg-brand-800 text-white hover:bg-brand-900 active:scale-[0.98]'
            }`}
          >
            {added ? (
              <><Check size={14} /> Added</>
            ) : product.inStock ? (
              <><ShoppingCart size={14} /> Add</>
            ) : (
              'Unavailable'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
