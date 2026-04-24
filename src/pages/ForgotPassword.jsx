import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowLeft, Eye, EyeOff, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
  const [step, setStep] = useState(0); // 0=email, 1=reset, 2=done
  const [email, setEmail] = useState('');
  const [form, setForm] = useState({ newPassword: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();

  const handleEmailSubmit = e => {
    e.preventDefault();
    setError('');
    const users = JSON.parse(localStorage.getItem('eco_users') || '[]');
    if (!users.find(u => u.email === email)) return setError('No account found with this email');
    setStep(1);
  };

  const handleReset = e => {
    e.preventDefault();
    setError('');
    if (form.newPassword !== form.confirm) return setError('Passwords do not match');
    if (form.newPassword.length < 6) return setError('Password must be at least 6 characters');
    try {
      resetPassword({ email, newPassword: form.newPassword });
      setStep(2);
    } catch (err) {
      setError(err.message);
    }
  };

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
          {step === 2 ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Password Reset!</h1>
              <p className="text-gray-500 text-sm mb-6">Your password has been updated successfully.</p>
              <Link to="/login" className="btn-primary w-full text-center block">Sign In Now</Link>
            </div>
          ) : step === 1 ? (
            <>
              <Link to="/login" className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-700 mb-5">
                <ArrowLeft size={14} /> Back to login
              </Link>
              <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Set New Password</h1>
              <p className="text-gray-500 text-sm mb-6">Create a strong password for <strong>{email}</strong></p>
              {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">{error}</div>}
              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                  <div className="relative">
                    <input type={showPw ? 'text' : 'password'} required
                      value={form.newPassword} onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))}
                      placeholder="Min 6 characters" className="input-field pr-11" />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                  <input type="password" required
                    value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                    placeholder="Re-enter password" className="input-field" />
                </div>
                <button type="submit" className="btn-primary w-full">Reset Password</button>
              </form>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-700 mb-5">
                <ArrowLeft size={14} /> Back to login
              </Link>
              <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Forgot Password?</h1>
              <p className="text-gray-500 text-sm mb-6">Enter your registered email address and we'll help you reset your password.</p>
              {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">{error}</div>}
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com" className="input-field" />
                </div>
                <button type="submit" className="btn-primary w-full">Continue</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
