import { useState, useEffect } from 'react';
import { formatPrice } from '../utils/cart';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState({
    orders: [],
    workshops: [],
    inquiries: [],
    newsletter: []
  });
  const [activeTab, setActiveTab] = useState('overview');

  const ADMIN_PASSWORD = 'ecostichadmin2024';

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = () => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const workshops = JSON.parse(localStorage.getItem('workshops') || '[]');
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    const newsletter = JSON.parse(localStorage.getItem('newsletter') || '[]');
    
    setStats({ orders, workshops, inquiries, newsletter });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const exportData = (type) => {
    const data = stats[type];
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearData = (type) => {
    if (confirm(`Are you sure you want to clear all ${type} data?`)) {
      localStorage.removeItem(type);
      loadData();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-serif font-bold text-center text-text mb-8">
            Eco-Stitch Admin
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input w-full"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>
          
          <p className="text-center text-text/60 text-sm mt-6">
            Demo password: ecostichadmin2024
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'workshops', label: 'Workshops', icon: '🎨' },
    { id: 'inquiries', label: 'Inquiries', icon: '💬' },
    { id: 'newsletter', label: 'Newsletter', icon: '📧' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-serif font-bold text-text">
              Eco-Stitch Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="btn-outline"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text/60 hover:text-text hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-primary/10 rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary">Total Orders</p>
                        <p className="text-2xl font-bold text-text">{stats.orders.length}</p>
                      </div>
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        📦
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/10 rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-accent">Workshop RSVPs</p>
                        <p className="text-2xl font-bold text-text">{stats.workshops.length}</p>
                      </div>
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                        🎨
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-100 rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-700">Inquiries</p>
                        <p className="text-2xl font-bold text-text">{stats.inquiries.length}</p>
                      </div>
                      <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                        💬
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-100 rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-700">Newsletter Subs</p>
                        <p className="text-2xl font-bold text-text">{stats.newsletter.length}</p>
                      </div>
                      <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                        📧
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-text">Recent Activity</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {stats.orders.slice(-5).reverse().map((order) => (
                        <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                          <div>
                            <p className="font-medium text-text">Order #{order.id}</p>
                            <p className="text-sm text-text/60">{order.customer.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-text">{formatPrice(order.total)}</p>
                            <p className="text-sm text-text/60">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      {stats.orders.length === 0 && (
                        <p className="text-text/60 text-center py-4">No orders yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-text">All Orders</h3>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => exportData('orders')}
                      className="btn-outline"
                      disabled={stats.orders.length === 0}
                    >
                      Export JSON
                    </button>
                    <button
                      onClick={() => clearData('orders')}
                      className="btn-outline text-red-600 border-red-600 hover:bg-red-50"
                      disabled={stats.orders.length === 0}
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                          Items
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {stats.orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text">
                            #{order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-text">{order.customer.name}</div>
                              <div className="text-sm text-text/60">{order.customer.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text">
                            {formatPrice(order.total)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text/60">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {stats.orders.length === 0 && (
                    <div className="text-center py-8 text-text/60">
                      No orders found
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'workshops' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-text">Workshop RSVPs</h3>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => exportData('workshops')}
                      className="btn-outline"
                      disabled={stats.workshops.length === 0}
                    >
                      Export JSON
                    </button>
                    <button
                      onClick={() => clearData('workshops')}
                      className="btn-outline text-red-600 border-red-600 hover:bg-red-50"
                      disabled={stats.workshops.length === 0}
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                          Workshop
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                          Date Registered
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {stats.workshops.map((rsvp, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text">
                            {rsvp.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                            {rsvp.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                            {rsvp.workshop}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text/60">
                            {new Date(rsvp.timestamp).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {stats.workshops.length === 0 && (
                    <div className="text-center py-8 text-text/60">
                      No workshop registrations found
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-text">Customer Inquiries</h3>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => exportData('inquiries')}
                      className="btn-outline"
                      disabled={stats.inquiries.length === 0}
                    >
                      Export JSON
                    </button>
                    <button
                      onClick={() => clearData('inquiries')}
                      className="btn-outline text-red-600 border-red-600 hover:bg-red-50"
                      disabled={stats.inquiries.length === 0}
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {stats.inquiries.map((inquiry, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium text-text">{inquiry.name}</h4>
                          <p className="text-sm text-text/60">{inquiry.email}</p>
                        </div>
                        <span className="text-sm text-text/60">
                          {new Date(inquiry.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mb-3">
                        <span className="text-sm font-medium text-text">Subject: </span>
                        <span className="text-sm text-text/70">{inquiry.subject}</span>
                      </div>
                      <p className="text-text/70">{inquiry.message}</p>
                    </div>
                  ))}
                  {stats.inquiries.length === 0 && (
                    <div className="text-center py-8 text-text/60">
                      No inquiries found
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'newsletter' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-text">Newsletter Subscribers</h3>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => exportData('newsletter')}
                      className="btn-outline"
                      disabled={stats.newsletter.length === 0}
                    >
                      Export JSON
                    </button>
                    <button
                      onClick={() => clearData('newsletter')}
                      className="btn-outline text-red-600 border-red-600 hover:bg-red-50"
                      disabled={stats.newsletter.length === 0}
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                          Subscription Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {stats.newsletter.map((subscriber, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                            {subscriber.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text/60">
                            {new Date(subscriber.timestamp).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {stats.newsletter.length === 0 && (
                    <div className="text-center py-8 text-text/60">
                      No newsletter subscribers found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}