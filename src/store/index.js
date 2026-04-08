/**
 * @file Redux Global Store Configuration
 * @description Serves as the central state hub for the React application.
 * Replaces React Context to avoid unnecessary prop drilling and re-renders.
 */

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: {
    // Defines the state.cart property tree mapped to the cart options
    cart: cartReducer,
    // Defines the state.products property tree mapped to the catalog API
    products: productReducer,
  },
});
