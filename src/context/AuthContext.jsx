import { createContext, useContext, useState } from 'react';
import { loginUser, sendLoginOtp, sendSignupOtp, verifyLoginOtp, verifySignupOtp } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('eco_user')) || null; } catch { return null; }
  });

  const signup = async (payload) => {
    return sendSignupOtp(payload);
  };

  const login = async ({ identifier, password }) => {
    const { user: safe } = await loginUser({ email: identifier, identifier, password });
    localStorage.setItem('eco_user', JSON.stringify(safe));
    setUser(safe);
    return safe;
  };

  const requestLoginOtp = async (identifier) => sendLoginOtp({ identifier });

  const loginWithOtp = async ({ identifier, code }) => {
    const { user: safe } = await verifyLoginOtp({ identifier, code });
    localStorage.setItem('eco_user', JSON.stringify(safe));
    setUser(safe);
    return safe;
  };

  const completeSignup = async (payload) => {
    const { user: safe } = await verifySignupOtp(payload);
    localStorage.setItem('eco_user', JSON.stringify(safe));
    setUser(safe);
    return safe;
  };

  const logout = () => {
    localStorage.removeItem('eco_user');
    setUser(null);
  };

  const resetPassword = async () => {
    throw new Error('Password reset is not connected yet. Please contact EcoTokari support.');
  };

  return (
    <AuthContext.Provider value={{ user, signup, completeSignup, login, requestLoginOtp, loginWithOtp, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
