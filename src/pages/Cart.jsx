import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQty, total, clearCart } = useCart();
  const navigate = useNavigate();

  const shipping = total > 499 ? 0 : 49;
  const tax = Math.round(total * 0.05);
  const grand = total + shipping + tax;

  if (items.length === 0) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6 px-4">
      <ShoppingBag size={72} className="text-gray-200" />
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500">Add some fresh products to get started</p>
      </div>
      <Link to="/products" className="btn-primary">Browse Products</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-8">Your Cart ({items.length})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm flex gap-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-brand-600 font-medium mb-0.5">{item.category}</p>
                  <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5 mb-3">{item.unit}</p>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-3 py-1.5 hover:bg-gray-50 transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="px-4 py-1.5 text-sm font-semibold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-3 py-1.5 hover:bg-gray-50 transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-gray-900">₹{item.price * item.qty}</span>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1.5 mt-2">
              <Trash2 size={14} /> Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="font-semibold text-gray-900 text-lg mb-5">Order Summary</h2>
              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span><span className="font-medium text-gray-900">₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (5%)</span><span className="font-medium text-gray-900">₹{tax}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-brand-600 bg-brand-50 rounded-lg p-2">
                    Add ₹{499 - total} more for FREE shipping!
                  </p>
                )}
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900 text-lg mb-5">
                <span>Total</span><span>₹{grand}</span>
              </div>
              <button onClick={() => navigate('/checkout')} className="w-full btn-primary flex items-center justify-center gap-2 text-base">
                Proceed to Checkout <ArrowRight size={18} />
              </button>
              <Link to="/products" className="block text-center text-sm text-gray-500 mt-3 hover:text-brand-700">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
