import React from 'react';
import { Search } from 'lucide-react';
import './FilterBar.css';

const FilterBar = ({ searchTerm, onSearchChange, categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="filter-bar glass-panel">
      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          className="input-glass search-input"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="category-filters">
        <button
          className={`category-pill ${activeCategory === 'All' ? 'active' : ''}`}
          onClick={() => onCategoryChange('All')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
