import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Check, Truck, ShieldCheck, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { fetchProduct, fetchProducts } from '../lib/api';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadProduct() {
      setLoading(true);
      setError('');
      try {
        const [{ product }, relatedData] = await Promise.all([
          fetchProduct(id),
          fetchProducts(),
        ]);
        if (!active) return;
        setProduct(product);
        setRelated((relatedData.products || []).filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4));
      } catch (err) {
        if (!active) return;
        setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProduct();
    return () => { active = false; };
  }, [id]);

  const discount = useMemo(() => {
    if (!product?.originalPrice || !product?.price || product.originalPrice <= product.price) return 0;
    return Math.round((1 - product.price / product.originalPrice) * 100);
  }, [product]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading product...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-xl text-gray-500">Product not found</p>
      <Link to="/products" className="btn-primary">Back to Shop</Link>
    </div>
  );

  const handleAdd = () => {
    if (!product.inStock) return;
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-brand-700">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-brand-700">Shop</Link>
          <span>/</span>
          <span className="truncate font-medium text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 rounded-2xl bg-white p-6 shadow-sm md:p-10 lg:grid-cols-2">
          <div>
            <div className="mb-3 aspect-square overflow-hidden rounded-xl">
              {product.images.length > 0 ? (
                <img src={product.images[activeImg]} alt={product.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-7xl font-bold text-gray-300">
                  {product.name?.charAt(0) || '?'}
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImg(index)}
                    className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-colors ${activeImg === index ? 'border-brand-600' : 'border-gray-200'}`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            {product.badge && (
              <span className={`mb-3 inline-block rounded-full px-2.5 py-1 text-xs font-bold ${
                product.inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }`}>
                {product.badge}
              </span>
            )}
            <h1 className="mb-3 font-display text-2xl font-bold text-gray-900 md:text-3xl">{product.name}</h1>

            <div className="mb-4 flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={16} className={index < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
            </div>

            <div className="mb-2 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">Rs {product.price}</span>
              {product.originalPrice > product.price && <span className="text-lg text-gray-400 line-through">Rs {product.originalPrice}</span>}
              {discount > 0 && <span className="rounded-md bg-red-100 px-2 py-0.5 text-sm font-bold text-red-600">-{discount}%</span>}
            </div>
            <p className="mb-2 text-sm text-gray-500">{product.unit}</p>
            <p className={`mb-5 text-sm font-semibold ${product.inStock ? 'text-emerald-600' : 'text-rose-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>

            <p className="mb-6 leading-relaxed text-gray-600">{product.description}</p>

            <ul className="mb-6 space-y-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check size={15} className="shrink-0 text-brand-600" /> {feature}
                </li>
              ))}
            </ul>

            <div className="mb-4 flex items-center gap-3">
              <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
                <button onClick={() => setQty((value) => Math.max(1, value - 1))} className="px-4 py-2.5 text-lg font-medium transition-colors hover:bg-gray-100">-</button>
                <span className="px-5 py-2.5 font-semibold">{qty}</span>
                <button onClick={() => setQty((value) => value + 1)} className="px-4 py-2.5 text-lg font-medium transition-colors hover:bg-gray-100">+</button>
              </div>
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`flex-1 rounded-lg py-3 font-semibold transition-all duration-200 ${
                  !product.inStock
                    ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                    : added
                      ? 'bg-green-600 text-white'
                      : 'bg-brand-700 text-white hover:bg-brand-800'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {!product.inStock ? <><ShoppingCart size={18} /> Out of Stock</> : added ? <><Check size={18} /> Added!</> : <><ShoppingCart size={18} /> Add to Cart</>}
                </span>
              </button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-gray-100 pt-6">
              {[
                { icon: Leaf, text: 'Farm Fresh' },
                { icon: Truck, text: 'Fast Delivery' },
                { icon: ShieldCheck, text: '100% Genuine' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1.5 text-center text-xs text-gray-500">
                  <Icon size={20} className="text-brand-600" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 font-display text-2xl font-bold text-gray-900">You May Also Like</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => <ProductCard key={item.id} product={item} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
