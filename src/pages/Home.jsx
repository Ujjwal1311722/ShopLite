import React, { useState, useMemo } from 'react';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import './Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(productsData.map(p => p.category));
    return Array.from(cats);
  }, []);

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

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
