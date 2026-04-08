/**
 * @file Home.jsx
 * @description Catalog landing page containing advanced search and filtering mechanisms.
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, selectAllProducts, selectProductsStatus, selectProductsError } from '../store/productSlice';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  
  // Link global React-Redux state variables here
  const productsData = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Triggering the single API request on initial mount securely via Redux
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  /**
   * @description Derives distinct categories uniquely on computation.
   * `useMemo` stops this heavy logic from executing strictly when typing onto the search box.
   */
  const categories = useMemo(() => {
    const cats = new Set(productsData.map(p => p.category));
    return Array.from(cats);
  }, [productsData]);

  /**
   * @description Multi-variable filtering combining `activeCategory` & `searchTerm`.
   */
  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory, productsData]);

  if (status === 'loading') {
    return <div className="text-center mt-20 text-xl font-bold">Loading premium products...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center mt-20 text-red-500 font-bold">Failed to load products: {error}</div>;
  }

  return (
    <div className="home-page">
      <div className="page-header">
        <h1 className="text-gradient">Discover Premium Products</h1>
        <p className="subtitle">Curated collection for your modern lifestyle.</p>
      </div>

      <FilterBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state glass-panel">
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria.</p>
          <button 
            className="secondary-btn" 
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('All');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
