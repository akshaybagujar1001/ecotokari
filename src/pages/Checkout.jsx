import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder } from '../lib/api';

const STEPS = ['Shipping', 'Payment', 'Confirm'];

export default function Checkout() {
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' });
  const [payment, setPayment] = useState('upi');
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    setForm(prev => ({
      ...prev,
      name: prev.name || user.name || '',
      email: prev.email || user.email || '',
      phone: prev.phone || user.phone || '',
    }));
  }, [user]);

  if (!user) {
    navigate('/login', { state: { from: '/checkout' } });
    return null;
  }

  if (items.length === 0 && !placed) {
    navigate('/cart');
    return null;
  }

  const shipping = total > 499 ? 0 : 49;
  const tax = Math.round(total * 0.05);
  const grand = total + shipping + tax;

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handlePlaceOrder = async () => {
    setError('');
    setPlacing(true);
    try {
      await placeOrder({
        shipping: form,
        paymentMethod: payment,
        items,
      });
      clearCart();
      setPlaced(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  if (placed) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <Check size={40} className="text-green-600" />
      </div>
      <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">Order Placed!</h1>
      <p className="text-gray-500 max-w-md mb-2">Your order has been created in EcoTokari CRM. You can track the status from your account page.</p>
      <p className="text-sm text-brand-700 font-medium mb-8">Expected delivery: 1 to 3 business days</p>
      <div className="flex gap-4">
        <Link to="/products" className="btn-outline">Continue Shopping</Link>
        <Link to="/account" className="btn-primary">View My Orders</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="flex items-center mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i < step ? 'bg-brand-600 text-white' : i === step ? 'bg-brand-700 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className={`ml-2 text-sm font-medium ${i === step ? 'text-gray-900' : 'text-gray-400'}`}>{s}</span>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-3 ${i < step ? 'bg-brand-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-semibold text-gray-900 text-lg mb-5">Shipping Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'name', label: 'Full Name', placeholder: 'Your full name' },
                    { name: 'email', label: 'Email', placeholder: 'email@example.com', type: 'email' },
                    { name: 'phone', label: 'Phone', placeholder: '+91 9999999999', type: 'tel' },
                    { name: 'pincode', label: 'Pincode', placeholder: '411027' },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                      <input name={f.name} type={f.type || 'text'} placeholder={f.placeholder} value={form[f.name]} onChange={onChange} className="input-field" required />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                    <input name="address" placeholder="House no, street, area" value={form.address} onChange={onChange} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                    <input name="city" placeholder="City" value={form.city} onChange={onChange} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                    <input name="state" placeholder="State" value={form.state} onChange={onChange} className="input-field" />
                  </div>
                </div>
                <button onClick={() => setStep(1)} className="btn-primary mt-6 w-full">Continue to Payment</button>
              </div>
            )}

            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-semibold text-gray-900 text-lg mb-5">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { id: 'upi', icon: Smartphone, label: 'UPI / GPay / PhonePe', sub: 'Pay instantly with any UPI app' },
                    { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay' },
                    { id: 'cod', icon: Banknote, label: 'Cash on Delivery', sub: 'Pay when you receive' },
                  ].map(m => (
                    <label key={m.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${payment === m.id ? 'border-brand-600 bg-brand-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={e => setPayment(e.target.value)} className="sr-only" />
                      <m.icon size={22} className={payment === m.id ? 'text-brand-700' : 'text-gray-400'} />
                      <div>
                        <p className="font-medium text-gray-900">{m.label}</p>
                        <p className="text-xs text-gray-400">{m.sub}</p>
                      </div>
                      <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${payment === m.id ? 'border-brand-600 bg-brand-600' : 'border-gray-300'}`}>
                        {payment === m.id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)} className="btn-outline flex-1">Back</button>
                  <button onClick={() => setStep(2)} className="btn-primary flex-1">Review Order</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-semibold text-gray-900 text-lg mb-5">Review and Confirm</h2>
                <div className="space-y-3 mb-6">
                  {items.map(i => (
                    <div key={i.id} className="flex items-center gap-3">
                      {i.image ? (
                        <img src={i.image} alt={i.name} className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 font-bold text-gray-400">{i.name[0]}</div>
                      )}
                      <div className="flex-1"><p className="text-sm font-medium text-gray-900">{i.name}</p><p className="text-xs text-gray-400">Qty: {i.qty}</p></div>
                      <span className="font-semibold text-gray-900">Rs {i.price * i.qty}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-1 mb-6">
                  <p><strong>Ship to:</strong> {form.name}, {form.address}, {form.city} - {form.pincode}</p>
                  <p><strong>Payment:</strong> {payment.toUpperCase()}</p>
                </div>
                {error && <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-outline flex-1">Back</button>
                  <button onClick={handlePlaceOrder} disabled={placing} className="btn-primary flex-1">
                    {placing ? 'Placing...' : `Place Order Rs ${grand}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-24 text-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              {items.map(i => (
                <div key={i.id} className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-600 truncate mr-2">{i.name} x {i.qty}</span>
                  <span className="font-medium shrink-0">Rs {i.price * i.qty}</span>
                </div>
              ))}
              <div className="space-y-1.5 mt-3 text-gray-600">
                <div className="flex justify-between"><span>Subtotal</span><span>Rs {total}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : `Rs ${shipping}`}</span></div>
                <div className="flex justify-between"><span>GST (5%)</span><span>Rs {tax}</span></div>
              </div>
              <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold text-gray-900 text-base">
                <span>Total</span><span>Rs {grand}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
