import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Leaf, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const strength = (() => {
    const pw = form.password;
    if (!pw) return 0;
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^a-zA-Z0-9]/.test(pw)) s++;
    return s;
  })();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Passwords do not match');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      signup(form);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const PERKS = ['Free shipping on orders ₹499+', 'Early access to festival deals', 'Order history & tracking'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-green-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-brand-700 text-white p-2 rounded-xl"><Leaf size={22} /></div>
            <span className="font-display font-bold text-2xl text-brand-800">EcoTokari</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
          <p className="text-gray-500 text-sm mb-4">Join thousands of happy customers</p>

          <ul className="space-y-1.5 mb-5">
            {PERKS.map(p => (
              <li key={p} className="flex items-center gap-2 text-xs text-brand-700">
                <Check size={13} className="text-brand-600 shrink-0" /> {p}
              </li>
            ))}
          </ul>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input name="name" type="text" required value={form.name} onChange={onChange}
                placeholder="Your full name" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input name="email" type="email" required value={form.email} onChange={onChange}
                placeholder="you@example.com" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
              <input name="phone" type="tel" value={form.phone} onChange={onChange}
                placeholder="+91 9999999999" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input name="password" type={showPw ? 'text' : 'password'} required
                  value={form.password} onChange={onChange} placeholder="Min 6 characters" className="input-field pr-11" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.password && (
                <div className="flex gap-1 mt-1.5">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`flex-1 h-1 rounded-full transition-colors
                      ${i <= strength ? strength <= 1 ? 'bg-red-400' : strength <= 2 ? 'bg-yellow-400' : 'bg-brand-500' : 'bg-gray-200'}`} />
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
              <input name="confirm" type="password" required value={form.confirm} onChange={onChange}
                placeholder="Re-enter password" className="input-field" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full text-base">
              {loading ? 'Creating Account...' : 'Create Free Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-700 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
