import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../store/cartSlice';
import { Minus, Plus, Trash2 } from 'lucide-react';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { product, quantity } = item;
  const dispatch = useDispatch();

  return (
    <div className="cart-item glass-panel">
      <div className="cart-item-image-container">
        <img src={product.image} alt={product.name} className="cart-item-image" />
      </div>
      
      <div className="cart-item-details">
        <h3 className="cart-item-name">{product.name}</h3>
        <p className="cart-item-category">{product.category}</p>
        <div className="cart-item-price">${product.price.toFixed(2)}</div>
      </div>
      
      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button 
            className="icon-btn" 
            onClick={() => dispatch(updateQuantity({ id: product.id, delta: -1 }))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="quantity-display">{quantity}</span>
          <button 
            className="icon-btn" 
            onClick={() => dispatch(updateQuantity({ id: product.id, delta: 1 }))}
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <div className="cart-item-subtotal">
          ${(product.price * quantity).toFixed(2)}
        </div>
        
        <button 
          className="icon-btn delete-btn" 
          onClick={() => dispatch(removeFromCart(product.id))}
          aria-label="Remove item"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
