import { describe, it, expect } from 'vitest';
import { cartReducer, CART_ACTIONS, calculateCartTotals } from '../src/utils/cart';

describe('Cart Reducer', () => {
  const mockProduct = {
    id: 1,
    name: 'Organic Cotton T-Shirt',
    price: 899,
    images: ['/placeholder.jpg'],
    category: 'Clothing'
  };

  it('should add item to empty cart', () => {
    const initialState = [];
    const action = {
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product: mockProduct, quantity: 2, customization: { size: 'M' } }
    };

    const result = cartReducer(initialState, action);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      ...mockProduct,
      quantity: 2,
      customization: { size: 'M' }
    });
  });

  it('should update quantity for existing item with same customization', () => {
    const initialState = [{
      ...mockProduct,
      quantity: 1,
      customization: { size: 'M' }
    }];

    const action = {
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product: mockProduct, quantity: 2, customization: { size: 'M' } }
    };

    const result = cartReducer(initialState, action);

    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(3);
  });

  it('should add separate item for different customization', () => {
    const initialState = [{
      ...mockProduct,
      quantity: 1,
      customization: { size: 'M' }
    }];

    const action = {
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product: mockProduct, quantity: 1, customization: { size: 'L' } }
    };

    const result = cartReducer(initialState, action);

    expect(result).toHaveLength(2);
    expect(result[1].customization).toEqual({ size: 'L' });
  });

  it('should update item quantity', () => {
    const initialState = [{
      ...mockProduct,
      quantity: 2,
      customization: { size: 'M' }
    }];

    const action = {
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { productId: 1, customization: { size: 'M' }, quantity: 5 }
    };

    const result = cartReducer(initialState, action);

    expect(result[0].quantity).toBe(5);
  });

  it('should remove item when quantity is 0', () => {
    const initialState = [{
      ...mockProduct,
      quantity: 1,
      customization: { size: 'M' }
    }];

    const action = {
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { productId: 1, customization: { size: 'M' }, quantity: 0 }
    };

    const result = cartReducer(initialState, action);

    expect(result).toHaveLength(0);
  });

  it('should remove specific item', () => {
    const initialState = [
      { ...mockProduct, quantity: 1, customization: { size: 'M' } },
      { ...mockProduct, quantity: 2, customization: { size: 'L' } }
    ];

    const action = {
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { productId: 1, customization: { size: 'M' } }
    };

    const result = cartReducer(initialState, action);

    expect(result).toHaveLength(1);
    expect(result[0].customization).toEqual({ size: 'L' });
  });

  it('should clear entire cart', () => {
    const initialState = [
      { ...mockProduct, quantity: 1, customization: { size: 'M' } },
      { ...mockProduct, quantity: 2, customization: { size: 'L' } }
    ];

    const action = { type: CART_ACTIONS.CLEAR_CART };
    const result = cartReducer(initialState, action);

    expect(result).toHaveLength(0);
  });

  it('should load cart from storage', () => {
    const savedCart = [
      { ...mockProduct, quantity: 3, customization: { size: 'M' } }
    ];

    const action = {
      type: CART_ACTIONS.LOAD_CART,
      payload: savedCart
    };

    const result = cartReducer([], action);

    expect(result).toEqual(savedCart);
  });
});

describe('Cart Totals Calculation', () => {
  const mockItems = [
    {
      id: 1,
      name: 'T-Shirt',
      price: 899,
      quantity: 2,
      customization: { size: 'M' }
    },
    {
      id: 2,
      name: 'Jeans',
      price: 1599,
      quantity: 1,
      customization: { size: 'L' }
    }
  ];

  it('should calculate correct subtotal', () => {
    const totals = calculateCartTotals(mockItems);

    expect(totals.subtotal).toBe(3397); // (899 * 2) + (1599 * 1)
    expect(totals.itemCount).toBe(3);
  });

  it('should apply free shipping for orders over ₹1500', () => {
    const totals = calculateCartTotals(mockItems);

    expect(totals.freeShippingEligible).toBe(true);
    expect(totals.shipping).toBe(0);
    expect(totals.total).toBe(3397);
  });

  it('should charge shipping for orders under ₹1500', () => {
    const smallOrder = [
      {
        id: 1,
        name: 'T-Shirt',
        price: 899,
        quantity: 1,
        customization: {}
      }
    ];

    const totals = calculateCartTotals(smallOrder);

    expect(totals.freeShippingEligible).toBe(false);
    expect(totals.shipping).toBe(99);
    expect(totals.total).toBe(998);
    expect(totals.freeShippingRemaining).toBe(601);
  });

  it('should handle empty cart', () => {
    const totals = calculateCartTotals([]);

    expect(totals.subtotal).toBe(0);
    expect(totals.itemCount).toBe(0);
    expect(totals.shipping).toBe(0);
    expect(totals.total).toBe(0);
    expect(totals.freeShippingEligible).toBe(false);
  });
});