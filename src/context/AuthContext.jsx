import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('eco_user')) || null; } catch { return null; }
  });

  const signup = ({ name, email, phone, password }) => {
    const users = JSON.parse(localStorage.getItem('eco_users') || '[]');
    if (users.find(u => u.email === email)) throw new Error('Email already registered');
    const newUser = { id: Date.now(), name, email, phone, createdAt: new Date().toISOString() };
    users.push({ ...newUser, password });
    localStorage.setItem('eco_users', JSON.stringify(users));
    localStorage.setItem('eco_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem('eco_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password');
    const { password: _p, ...safe } = found;
    localStorage.setItem('eco_user', JSON.stringify(safe));
    setUser(safe);
    return safe;
  };

  const logout = () => {
    localStorage.removeItem('eco_user');
    setUser(null);
  };

  const resetPassword = ({ email, newPassword }) => {
    const users = JSON.parse(localStorage.getItem('eco_users') || '[]');
    const idx = users.findIndex(u => u.email === email);
    if (idx === -1) throw new Error('No account with that email');
    users[idx].password = newPassword;
    localStorage.setItem('eco_users', JSON.stringify(users));
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
