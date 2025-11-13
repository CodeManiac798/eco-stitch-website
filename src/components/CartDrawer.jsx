import { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice, createOrderFromCart } from '../utils/cart';

export default function CartDrawer() {
  const {
    cartItems,
    cartTotals,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart
  } = useCart();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeCartDrawer();
      }
    };

    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        closeCartDrawer();
      }
    };

    if (isCartDrawerOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isCartDrawerOpen, closeCartDrawer]);

  const handleCheckout = (e) => {
    e.preventDefault();
    
    const order = createOrderFromCart(cartItems, customerInfo);
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // If API URL exists, also send to backend
    const apiUrl = import.meta.env.VITE_API_URL;
    if (apiUrl) {
      fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      }).catch(() => {
        // Silently fail - already saved to localStorage
      });
    }
    
    setCompletedOrder(order);
    setIsOrderComplete(true);
  };

  const downloadOrderJSON = () => {
    if (completedOrder) {
      const blob = new Blob([JSON.stringify(completedOrder, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `order-${completedOrder.id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const resetCart = () => {
    setIsCheckingOut(false);
    setIsOrderComplete(false);
    setCompletedOrder(null);
    setCustomerInfo({ name: '', email: '', phone: '', address: '' });
    closeCartDrawer();
  };

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50" role="dialog" aria-modal="true">
      <div 
        ref={drawerRef}
        className="bg-white h-full w-full max-w-md overflow-y-auto transform transition-transform"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-serif font-bold text-text">
            {isOrderComplete ? 'Order Confirmed!' : 
             isCheckingOut ? 'Checkout' : 
             `Shopping Cart (${cartTotals.itemCount})`}
          </h2>
          <button
            onClick={closeCartDrawer}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {isOrderComplete ? (
            // Order Success
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-lg font-serif font-bold text-text mb-2">
                Thank you for your order!
              </h3>
              <p className="text-text/70 mb-4">
                Order #{completedOrder?.id}
              </p>
              <p className="text-text/70 mb-6">
                Expected delivery: {completedOrder?.estimatedDelivery && 
                new Date(completedOrder.estimatedDelivery).toLocaleDateString('en-IN')}
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={downloadOrderJSON}
                  className="btn-primary w-full"
                >
                  Download Order Details
                </button>
                <button
                  onClick={resetCart}
                  className="btn-outline w-full"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : isCheckingOut ? (
            // Checkout Form
            <form onSubmit={handleCheckout} className="space-y-4">
              <h3 className="font-serif font-bold text-text mb-4">Delivery Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="input w-full"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="input w-full"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="input w-full"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Delivery Address *
                </label>
                <textarea
                  required
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                  className="input w-full"
                  rows="3"
                  placeholder="Enter your complete address"
                />
              </div>

              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-text/70">
                    <span>Subtotal ({cartTotals.itemCount} items)</span>
                    <span>{formatPrice(cartTotals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-text/70">
                    <span>Shipping</span>
                    <span>{cartTotals.shipping === 0 ? 'Free' : formatPrice(cartTotals.shipping)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-text border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>{formatPrice(cartTotals.total)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button type="submit" className="btn-primary w-full">
                    Place Order
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="btn-outline w-full"
                  >
                    Back to Cart
                  </button>
                </div>
              </div>
            </form>
          ) : (
            // Cart Items
            <div>
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-text mb-2">Your cart is empty</h3>
                  <p className="text-text/70 mb-4">Add some sustainable fashion to get started!</p>
                  <button
                    onClick={closeCartDrawer}
                    className="btn-primary"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-text">{item.name}</h4>
                          <p className="text-sm text-text/70">{formatPrice(item.price)} each</p>
                          {Object.keys(item.customization).length > 0 && (
                            <div className="text-xs text-text/60 mt-1">
                              Customized: {Object.entries(item.customization)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(', ')}
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.customization, item.quantity - 1)}
                              className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.customization, item.quantity + 1)}
                              className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id, item.customization)}
                              className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded"
                              aria-label="Remove item"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-text">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Free shipping progress */}
                  {!cartTotals.freeShippingEligible && (
                    <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-accent font-medium">
                          Add {formatPrice(cartTotals.freeShippingRemaining)} for free shipping
                        </span>
                        <span className="text-text/60">
                          {formatPrice(cartTotals.subtotal)} / {formatPrice(1500)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (cartTotals.subtotal / 1500) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Order Summary */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-text/70">
                        <span>Subtotal ({cartTotals.itemCount} items)</span>
                        <span>{formatPrice(cartTotals.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-text/70">
                        <span>Shipping</span>
                        <span>{cartTotals.shipping === 0 ? 'Free' : formatPrice(cartTotals.shipping)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-text border-t border-gray-200 pt-2">
                        <span>Total</span>
                        <span>{formatPrice(cartTotals.total)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsCheckingOut(true)}
                      className="btn-primary w-full"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}