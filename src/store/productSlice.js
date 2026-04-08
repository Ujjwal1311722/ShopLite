/**
 * @file productSlice.js
 * @description Manages asynchronous API calls and caching related to the Product Catalog.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Development API pointing to the JSON Server mock backend
const API_URL = 'http://localhost:3000';

/**
 * @function fetchProducts
 * @description Redux Async Thunk designed to make network requests outside of components.
 * It automatically dispatches: 
 *  - fetchProducts.pending (before the request)
 *  - fetchProducts.fulfilled (on success)
 *  - fetchProducts.rejected (on failure)
 */
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    // Status tracks the API request lifecycle inside Redux (helps avoid manual loading booleans)
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {}, // No synchronous reducers needed
  
  /**
   * Handles asynchronous effects dispatched by `fetchProducts`
   */
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'; // Show user a loading spinner immediately
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Updates UI automatically with mapped response
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Propagates the Axios error to the component
      });
  }
});

// Exposed Selectors: Ensures components read specific parts of state
/** @returns {Array} All product objects */
export const selectAllProducts = (state) => state.products.items;

/** @returns {String} The API fetching status ('idle' | 'loading' | 'succeeded' | 'failed') */
export const selectProductsStatus = (state) => state.products.status;

/** @returns {String|null} Error messages on request failure */
export const selectProductsError = (state) => state.products.error;

export default productSlice.reducer;
