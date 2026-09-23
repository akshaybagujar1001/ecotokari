import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ProtectedRoute from './components/ProtectedRoute';
import Account from './pages/Account';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/products" element={<Layout><Products /></Layout>} />
            <Route path="/products/:id" element={<Layout><ProductDetail /></Layout>} />
            <Route path="/cart" element={<Layout><Cart /></Layout>} />
            <Route path="/checkout" element={<Layout><ProtectedRoute><Checkout /></ProtectedRoute></Layout>} />
            <Route path="/account" element={<Layout><ProtectedRoute><Account /></ProtectedRoute></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
            <Route path="/terms" element={<Layout><Terms /></Layout>} />
            <Route path="*" element={
              <Layout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-gray-500">
                  <span className="font-display text-7xl font-bold text-brand-200">404</span>
                  <p className="text-lg text-brand-950">Page not found</p>
                  <a href="/" className="btn-primary text-sm">Go Home</a>
                </div>
              </Layout>
            } />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
