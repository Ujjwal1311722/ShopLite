import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CreditCard, Smartphone, CheckCircle } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { cartTotal, clearCart, cartItems } = useCart();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Prevent accessing checkout if cart is empty
  if (cartItems.length === 0 && !orderComplete) {
    navigate('/cart');
    return null;
  }

  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + tax;

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call for payment processing
    setTimeout(() => {
      // Generate dummy Order ID like ORD-1A2B3
      const generatedId = `ORD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      setOrderId(generatedId);
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="checkout-success glass-panel">
        <CheckCircle size={80} className="success-icon" />
        <h1 className="text-gradient">Payment Successful!</h1>
        <p>Thank you for your premium purchase. Your order has been confirmed.</p>
        <p className="order-id-display">Order ID: <strong>{orderId}</strong></p>
        
        <div className="success-actions">
          <button className="primary-btn" onClick={() => navigate(`/track/${orderId}`)}>
            Track Order
          </button>
          <button className="secondary-btn" onClick={() => navigate('/')}>
            Return to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="text-gradient checkout-title">Checkout</h1>
      
      <div className="checkout-container">
        <form className="checkout-form glass-panel" onSubmit={handleCheckout}>
          <div className="form-section">
            <h3>Shipping Information</h3>
            <div className="form-row">
              <input type="text" className="input-glass" placeholder="First Name" required />
              <input type="text" className="input-glass" placeholder="Last Name" required />
            </div>
            <input type="email" className="input-glass full-width" placeholder="Email Address" required />
            <input type="text" className="input-glass full-width" placeholder="Complete Address" required />
            <div className="form-row">
              <input type="text" className="input-glass" placeholder="City" required />
              <input type="text" className="input-glass" placeholder="ZIP / Postal Code" required />
            </div>
          </div>

          <div className="form-section">
            <h3>Payment Method</h3>
            <div className="payment-options">
              <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="card" 
                  checked={paymentMethod === 'card'} 
                  onChange={() => setPaymentMethod('card')} 
                />
                <CreditCard size={20} />
                <span>Credit / Debit Card</span>
              </label>

              <label className={`payment-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="paypal" 
                  checked={paymentMethod === 'paypal'} 
                  onChange={() => setPaymentMethod('paypal')} 
                />
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M7.144 19.532l1.049-5.751c.08-.439.46-.776.906-.776h3.468c.358 0 .692.146.942.4.249.255.39.6.39.957v2.531c0 .44-.359.799-.8.799H9.49l-.499 2.74c-.06.327-.348.56-.684.56H7.144z"></path><path d="M8.598 10.65l1.049-5.75c.08-.44.46-.777.906-.777h4.468c.358 0 .692.147.942.401.249.255.39.6.39.957v2.53c0 .44-.359.799-.8.799H10.94l-1.049 5.751c-.08.439-.46.776-.906.776H7.83l.768-4.687z"></path></svg>
                <span>PayPal</span>
              </label>
              
              <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="upi" 
                  checked={paymentMethod === 'upi'} 
                  onChange={() => setPaymentMethod('upi')} 
                />
                <Smartphone size={20} />
                <span>UPI / Mobile Wallets</span>
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div className="card-details">
                <input type="text" className="input-glass full-width" placeholder="Card Number" minLength="16" maxLength="16" required />
                <div className="form-row">
                  <input type="text" className="input-glass" placeholder="MM/YY" maxLength="5" required />
                  <input type="password" className="input-glass" placeholder="CVV" maxLength="4" required />
                </div>
                <input type="text" className="input-glass full-width" placeholder="Name on Card" required />
              </div>
            )}
            
            {paymentMethod === 'paypal' && (
              <div className="alternative-payment">
                <p>You will be redirected to PayPal to complete your purchase securely.</p>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="alternative-payment">
                <p>Enter your Virtual Payment Address (VPA) or scan the QR on the next step.</p>
                <input type="text" className="input-glass full-width" placeholder="example@upi" />
              </div>
            )}
          </div>

          <button type="submit" className="primary-btn pay-btn" disabled={isProcessing}>
            {isProcessing ? 'Processing Payment...' : `Pay $${grandTotal.toFixed(2)}`}
          </button>
        </form>

        <div className="checkout-summary glass-panel">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.product.id} className="summary-item-row">
                <div className="item-details">
                  <span className="item-name">{item.product.name}</span>
                  <span className="item-qty">x {item.quantity}</span>
                </div>
                <span className="item-price">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span className="text-gradient">${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
