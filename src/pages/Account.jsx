import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Package, ShoppingBag, Truck } from 'lucide-react';
import { fetchAccount } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const statusTone = {
  PENDING: 'bg-amber-50 text-amber-700',
  CONFIRMED: 'bg-blue-50 text-blue-700',
  PROCESSING: 'bg-violet-50 text-violet-700',
  OUT_FOR_DELIVERY: 'bg-orange-50 text-orange-700',
  DELIVERED: 'bg-emerald-50 text-emerald-700',
  CANCELLED: 'bg-red-50 text-red-700',
};

export default function Account() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function load() {
      if (!user?.id) return;
      setLoading(true);
      setError('');
      try {
        const data = await fetchAccount(user.id);
        if (!active) return;
        setProfile(data.profile);
        setOrders(data.orders || []);
      } catch (err) {
        if (!active) return;
        setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => { active = false; };
  }, [user?.id]);

  const totalSpent = orders.reduce((sum, order) => sum + (order.status === 'DELIVERED' ? order.total : 0), 0);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading account...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-600">My Account</p>
          <h1 className="font-display text-3xl font-bold text-gray-900 mt-2">{profile?.name}</h1>
          <p className="text-gray-500 mt-1">Your products, cart, and order updates in one place.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={ShoppingBag} label="Total Orders" value={String(orders.length)} />
          <StatCard icon={Package} label="Delivered" value={String(orders.filter(order => order.status === 'DELIVERED').length)} />
          <StatCard icon={Truck} label="In Progress" value={String(orders.filter(order => ['PENDING', 'CONFIRMED', 'PROCESSING', 'OUT_FOR_DELIVERY'].includes(order.status)).length)} />
          <StatCard icon={FileText} label="Total Spent" value={`Rs ${totalSpent.toLocaleString('en-IN')}`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-brand-700 text-white flex items-center justify-center text-lg font-bold">
                {profile?.name?.[0]?.toUpperCase() || 'E'}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{profile?.name}</p>
                <p className="text-sm text-gray-500">{profile?.role}</p>
              </div>
            </div>
            <Info label="Email" value={profile?.email || 'Not added'} />
            <Info label="Phone" value={profile?.phone || 'Not added'} />
            <Info label="Business" value={profile?.customer?.businessName || profile?.name || 'Not linked'} />
            <Info label="Outstanding" value={`Rs ${(profile?.customer?.outstandingBalance || 0).toLocaleString('en-IN')}`} />
            <Info
              label="Address"
              value={
                [profile?.customer?.address, profile?.customer?.city, profile?.customer?.state, profile?.customer?.pincode]
                  .filter(Boolean)
                  .join(', ') || 'Add during checkout'
              }
            />
            <Link to="/products" className="btn-primary mt-6 w-full justify-center">Browse Products</Link>
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="font-semibold text-gray-800">No orders yet</p>
                <p className="text-sm text-gray-500 mt-1">Place your first order and it will appear here with status updates.</p>
                <Link to="/products" className="btn-primary mt-5 inline-flex">Start Shopping</Link>
              </div>
            ) : orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                      <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${statusTone[order.status] || 'bg-gray-100 text-gray-600'}`}>
                        {order.status.replaceAll('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">Rs {order.total.toLocaleString('en-IN')}</p>
                    {order.invoice && order.invoice.balanceDue > 0 && (
                      <p className="text-xs text-rose-600 mt-1">Due Rs {order.invoice.balanceDue.toLocaleString('en-IN')}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 font-bold text-gray-400">{item.name[0]}</div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.quantity} {item.unit} x Rs {item.rate}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">Rs {item.amount.toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>

                {order.deliveryAddress && <p className="mt-4 text-sm text-gray-500">Ship to: {order.deliveryAddress}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-brand-600" />
        <p className="text-xs text-gray-500">{label}</p>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="mb-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">{label}</p>
      <p className="mt-1 text-gray-800">{value}</p>
    </div>
  );
}
