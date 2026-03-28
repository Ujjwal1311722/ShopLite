import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import './Cart.css';

const Cart = () => {
  const { cartItems, cartTotal, itemCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty glass-panel">
        <ShoppingBag size={64} className="empty-cart-icon" />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any premium items to your cart yet.</p>
        <Link to="/" className="primary-btn continue-shopping">
          <ArrowLeft size={18} />
          Start Shopping
        </Link>
      </div>
    );
  }

  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + tax;

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1 className="text-gradient">Review Your Order</h1>
        <p className="subtitle">{itemCount} items in your cart</p>
      </div>

      <div className="cart-container">
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        <div className="cart-summary glass-panel">
          <h3>Order Summary</h3>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Estimated Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-shipping">Free</span>
          </div>
          
          <div className="summary-divider"></div>
          
          <div className="summary-row total-row">
            <span>Total</span>
            <span className="text-gradient">${grandTotal.toFixed(2)}</span>
          </div>
          
          <Link to="/checkout" className="primary-btn checkout-btn">
            Proceed to Checkout
          </Link>
          
          <Link to="/" className="continue-link">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
