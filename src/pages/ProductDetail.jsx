import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Check, Truck, ShieldCheck, Leaf } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const product = PRODUCTS.find(p => p.id === Number(id));
  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-xl text-gray-500">Product not found</p>
      <Link to="/products" className="btn-primary">Back to Shop</Link>
    </div>
  );

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-brand-700">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-brand-700">Shop</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-2xl p-6 md:p-10 shadow-sm">
          {/* Images */}
          <div>
            <div className="rounded-xl overflow-hidden aspect-square mb-3">
              <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${activeImg === i ? 'border-brand-600' : 'border-gray-200'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.badge && (
              <span className="inline-block bg-brand-100 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-full mb-3">
                {product.badge}
              </span>
            )}
            <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
              <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded-md">-{discount}%</span>
            </div>
            <p className="text-sm text-gray-500 mb-5">{product.unit}</p>

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Features */}
            <ul className="space-y-2 mb-6">
              {product.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check size={15} className="text-brand-600 shrink-0" /> {f}
                </li>
              ))}
            </ul>

            {/* Qty + Add */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-2.5 text-lg font-medium hover:bg-gray-100 transition-colors">−</button>
                <span className="px-5 py-2.5 font-semibold">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-4 py-2.5 text-lg font-medium hover:bg-gray-100 transition-colors">+</button>
              </div>
              <button onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  added ? 'bg-green-600 text-white' : 'bg-brand-700 text-white hover:bg-brand-800'
                }`}>
                {added ? <><Check size={18} /> Added!</> : <><ShoppingCart size={18} /> Add to Cart</>}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-100">
              {[
                { icon: Leaf, text: 'Farm Fresh' },
                { icon: Truck, text: 'Fast Delivery' },
                { icon: ShieldCheck, text: '100% Genuine' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center text-center gap-1.5 text-xs text-gray-500">
                  <Icon size={20} className="text-brand-600" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
