import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div className="card group flex flex-col">
      <Link to={`/products/${product.id}`} className="relative overflow-hidden aspect-[4/3]">
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
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full
            ${product.badge === 'Best Seller' ? 'bg-amber-400 text-amber-900' :
              product.badge === 'Premium' ? 'bg-purple-500 text-white' :
              product.badge === 'B2B' ? 'bg-blue-600 text-white' :
              'bg-brand-600 text-white'}`}>
            {product.badge}
          </span>
        )}
        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          -{discount}%
        </span>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-brand-600 font-medium mb-1">{product.category}</p>
        <Link to={`/products/${product.id}`} className="font-semibold text-gray-900 hover:text-brand-700 transition-colors leading-snug mb-2">
          {product.name}
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
            <span className="text-xs text-gray-500">{product.unit}</span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full flex items-center justify-center gap-2 bg-brand-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-800 transition-all duration-200 active:scale-95"
          >
            <ShoppingCart size={15} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
