import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Leaf, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [otpIdentifier, setOtpIdentifier] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const { login, requestLoginOtp, loginWithOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/account';

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setError('');
    setOtpLoading(true);
    try {
      await requestLoginOtp(otpIdentifier);
      setOtpSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleOtpLogin = async e => {
    e.preventDefault();
    setError('');
    setOtpLoading(true);
    try {
      await loginWithOtp({ identifier: otpIdentifier, code: otpCode });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setOtpLoading(false);
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
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-gray-500 text-sm mb-6">Sign in with phone, email, or username. OTP login is available below.</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone, email, or username</label>
              <input
                name="identifier"
                type="text"
                autoComplete="username"
                required
                value={form.identifier}
                onChange={onChange}
                placeholder="+91 9999999999 or you@example.com"
                className="input-field"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-xs text-brand-700 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={onChange}
                  placeholder="Enter your password"
                  className="input-field pr-11"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full text-base justify-center">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">Login with OTP</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <form onSubmit={handleOtpLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone, email, or username</label>
              <input
                type="text"
                value={otpIdentifier}
                onChange={e => setOtpIdentifier(e.target.value)}
                placeholder="+91 9999999999 or you@example.com"
                className="input-field"
                required
              />
            </div>

            {otpSent && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">OTP Code</label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={e => setOtpCode(e.target.value)}
                  placeholder="Enter OTP"
                  className="input-field"
                  required
                />
              </div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={handleSendOtp} disabled={otpLoading || !otpIdentifier} className="btn-outline flex-1">
                {otpLoading && !otpSent ? 'Sending...' : 'Send OTP'}
              </button>
              <button type="submit" disabled={otpLoading || !otpSent} className="btn-primary flex-1 justify-center">
                <Smartphone size={16} /> {otpLoading && otpSent ? 'Verifying...' : 'Login'}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-700 font-medium hover:underline">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
