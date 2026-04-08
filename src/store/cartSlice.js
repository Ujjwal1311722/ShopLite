/**
 * @file cartSlice.js
 * @description Manages the global shopping cart state using Redux Toolkit.
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Adds an item to the cart or increments its quantity if it already exists.
     * @param {Object} state - The current Redux state for the cart.
     * @param {Object} action - The action payload containing the product object.
     */
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    
    /**
     * Completely removes an item from the cart.
     * @param {Object} state - The current Redux state for the cart.
     * @param {Object} action - The action payload containing the product ID.
     */
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
    },
    
    /**
     * Updates the quantity of a specific cart item up or down.
     * @param {Object} payload - Contains { id, delta } where delta is +1 or -1.
     */
    updateQuantity: (state, action) => {
      const { id, delta } = action.payload; 
      const existingItem = state.items.find(item => item.product.id === id);
      if (existingItem) {
        existingItem.quantity += delta;
      }
    },
    
    /**
     * Empties the cart after a successful checkout.
     */
    clearCart: (state) => {
      state.items = [];
    }
  }
});

// Action creators to be dispatched in components
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors: Compute derived data cleanly outside of UI components
/** @returns {Array} List of current items in the cart */
export const selectCartItems = (state) => state.cart.items;

/** @returns {Number} The total monetary value of the cart using Array.reduce */
export const selectCartTotal = (state) => state.cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

/** @returns {Number} The total number of items (quantities included) */
export const selectCartCount = (state) => state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;
