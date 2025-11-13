// Cart utility functions
export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Cart reducer for state management
export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1, customization = {} } = action.payload;
      const existingItemIndex = state.findIndex(
        item => item.id === product.id && 
        JSON.stringify(item.customization) === JSON.stringify(customization)
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item with same customization exists
        return state.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...state, {
          id: product.id,
          name: product.name,
          price: product.price,
          images: product.images,
          quantity,
          customization,
          addedAt: new Date().toISOString()
        }];
      }
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { productId, customization, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return state.filter(item => 
          !(item.id === productId && 
            JSON.stringify(item.customization) === JSON.stringify(customization))
        );
      }

      return state.map(item =>
        item.id === productId && 
        JSON.stringify(item.customization) === JSON.stringify(customization)
          ? { ...item, quantity }
          : item
      );
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const { productId, customization } = action.payload;
      return state.filter(item =>
        !(item.id === productId && 
          JSON.stringify(item.customization) === JSON.stringify(customization))
      );
    }

    case CART_ACTIONS.CLEAR_CART:
      return [];

    case CART_ACTIONS.LOAD_CART:
      return action.payload || [];

    default:
      return state;
  }
}

// Calculate cart totals
export function calculateCartTotals(cartItems) {
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Simple shipping calculation (free shipping over ₹1500)
  const shipping = subtotal >= 1500 ? 0 : 50;
  const total = subtotal + shipping;

  return {
    subtotal,
    shipping,
    total,
    itemCount,
    freeShippingEligible: subtotal >= 1500,
    freeShippingRemaining: Math.max(0, 1500 - subtotal)
  };
}

// LocalStorage utilities
export const STORAGE_KEY = 'eco-stitch-cart';

export function saveCartToStorage(cartItems) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.warn('Failed to save cart to localStorage:', error);
  }
}

export function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.warn('Failed to load cart from localStorage:', error);
    return [];
  }
}

// Format price in Indian Rupees
export function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

// Generate unique cart item key
export function getCartItemKey(productId, customization = {}) {
  return `${productId}-${JSON.stringify(customization)}`;
}

// Validate cart item
export function validateCartItem(item) {
  return (
    item &&
    item.id &&
    item.name &&
    typeof item.price === 'number' &&
    item.price > 0 &&
    typeof item.quantity === 'number' &&
    item.quantity > 0
  );
}

// Create order object from cart
export function createOrderFromCart(cartItems, customerInfo) {
  const totals = calculateCartTotals(cartItems);
  
  return {
    id: `ECO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    items: cartItems.map(item => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      customization: item.customization,
      itemTotal: item.price * item.quantity
    })),
    customer: customerInfo,
    totals: {
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total,
      itemCount: totals.itemCount
    },
    status: 'pending',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
  };
}