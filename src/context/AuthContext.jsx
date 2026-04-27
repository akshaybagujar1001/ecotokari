import { createContext, useContext, useState } from 'react';
import { loginUser, sendLoginOtp, sendSignupOtp, verifyLoginOtp, verifySignupOtp } from '../lib/api';

const AuthContext = createContext(null);
const USER_STORAGE_KEY = 'eco_user';
const TOKEN_STORAGE_KEY = 'eco_token';

function persistSession(user, token) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_STORAGE_KEY)) || null; } catch { return null; }
  });

  const signup = async (payload) => {
    return sendSignupOtp(payload);
  };

  const login = async ({ identifier, password }) => {
    const { user: safe, token } = await loginUser({ email: identifier, identifier, password });
    persistSession(safe, token);
    setUser(safe);
    return safe;
  };

  const requestLoginOtp = async (identifier) => sendLoginOtp({ identifier });

  const loginWithOtp = async ({ identifier, code }) => {
    const { user: safe, token } = await verifyLoginOtp({ identifier, code });
    persistSession(safe, token);
    setUser(safe);
    return safe;
  };

  const completeSignup = async (payload) => {
    const { user: safe, token } = await verifySignupOtp(payload);
    persistSession(safe, token);
    setUser(safe);
    return safe;
  };

  const logout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
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
