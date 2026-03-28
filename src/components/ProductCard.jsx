import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card glass-panel">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <div className="category-tag">{product.category}</div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button 
            className="primary-btn add-btn" 
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
