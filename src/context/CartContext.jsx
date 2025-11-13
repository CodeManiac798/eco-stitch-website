import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { 
  cartReducer, 
  CART_ACTIONS, 
  saveCartToStorage, 
  loadCartFromStorage,
  calculateCartTotals
} from '../utils/cart';

const CartContext = createContext();

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, []);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    if (savedCart.length > 0) {
      dispatch({ type: CART_ACTIONS.LOAD_CART, payload: savedCart });
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    if (isLoaded) {
      saveCartToStorage(cartItems);
    }
  }, [cartItems, isLoaded]);

  // Calculate cart totals
  const cartTotals = calculateCartTotals(cartItems);

  // Add item to cart
  const addToCart = (product, quantity = 1, customization = {}) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity, customization }
    });
  };

  // Update item quantity
  const updateQuantity = (productId, customization, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { productId, customization, quantity }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId, customization = {}) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { productId, customization }
    });
  };

  // Clear entire cart
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Toggle cart drawer
  const toggleCartDrawer = () => {
    setIsCartDrawerOpen(!isCartDrawerOpen);
  };

  // Close cart drawer
  const closeCartDrawer = () => {
    setIsCartDrawerOpen(false);
  };

  // Open cart drawer
  const openCartDrawer = () => {
    setIsCartDrawerOpen(true);
  };

  // Product modal controls
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  // Get item quantity (for specific customization)
  const getItemQuantity = (productId, customization = {}) => {
    const item = cartItems.find(
      item => item.id === productId && 
      JSON.stringify(item.customization) === JSON.stringify(customization)
    );
    return item ? item.quantity : 0;
  };

  // Check if item is in cart
  const isInCart = (productId, customization = {}) => {
    return cartItems.some(
      item => item.id === productId && 
      JSON.stringify(item.customization) === JSON.stringify(customization)
    );
  };

  const contextValue = {
    // State
    cartItems,
    cartTotals,
    isCartDrawerOpen,
    isProductModalOpen,
    selectedProduct,
    isLoaded,
    
    // Actions
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    
    // Drawer controls
    toggleCartDrawer,
    openCartDrawer,
    closeCartDrawer,
    
    // Product modal controls
    openProductModal,
    closeProductModal,
    
    // Utilities
    getItemQuantity,
    isInCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}