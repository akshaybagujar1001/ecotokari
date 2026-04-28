import { Link } from 'react-router-dom';
import { ShoppingCart, Sparkles, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const hasDiscount = product.originalPrice > product.price;
  const discount = hasDiscount ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const salesBadge = product.popularity > 1000
    ? 'Best Seller'
    : product.popularity > 0
      ? 'Popular Choice'
      : null;
  const displayCategory = product.category === 'Legacy Import' ? 'Farm Essentials' : product.category;

  return (
    <div className="group flex flex-col overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.1)]">
      <Link to={`/products/${product.id}`} className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-emerald-50 via-white to-lime-50">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-4xl font-bold text-gray-300">
            {product.name?.charAt(0) || '?'}
          </div>
        )}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-bold ${
              product.badge === 'Out of Stock'
                ? 'bg-rose-600 text-white'
                : product.badge === 'In Stock'
                  ? 'bg-emerald-600 text-white'
                  : product.badge === 'Best Seller'
                    ? 'bg-amber-400 text-amber-900'
                    : product.badge === 'Premium'
                      ? 'bg-purple-500 text-white'
                      : product.badge === 'B2B'
                        ? 'bg-blue-600 text-white'
                        : 'bg-brand-600 text-white'
            }`}
          >
            {product.badge}
          </span>
        )}
        {salesBadge && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-semibold text-gray-700 shadow-sm">
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
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">{displayCategory}</p>
        <Link
          to={`/products/${product.id}`}
          className="mb-2 min-h-[56px] text-[1.35rem] font-semibold leading-snug text-gray-900 transition-colors hover:text-brand-700"
        >
          {product.name}
        </Link>

        <p className={`mb-3 text-sm font-semibold ${product.inStock ? 'text-emerald-600' : 'text-rose-600'}`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </p>

        <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">Fresh dispatch</span>
          <span className="inline-flex items-center gap-1">
            <Truck size={12} />
            Pan-India delivery
          </span>
        </div>

        <div className="mt-auto">
          <div className="mb-3 flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">Rs {product.price}</span>
            {hasDiscount && <span className="text-sm text-gray-400 line-through">Rs {product.originalPrice}</span>}
            <span className="text-xs text-gray-500">{product.unit}</span>
          </div>

          <button
            onClick={() => product.inStock && addToCart(product)}
            disabled={!product.inStock}
            className={`w-full rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
              product.inStock
                ? 'flex items-center justify-center gap-2 bg-brand-700 text-white hover:bg-brand-800 active:scale-95'
                : 'cursor-not-allowed bg-gray-200 text-gray-500'
            }`}
          >
            <ShoppingCart size={15} /> {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
