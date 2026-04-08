/**
 * @file Checkout.jsx
 * @description Advanced multi-step checkout form managing real-time validations, state,
 * and POST requests simulation integrating with JSON Server's /orders route.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, clearCart } from '../store/cartSlice';
import { CreditCard, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Hook the global shopping cart
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  /** @boolean Manages UX loading indicator */
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
    upiId: ''
  });

  // Local calculation properties
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + tax;

  /**
   * @description Data tracking for inputs via controlled components model
   */
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handlePaymentChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  /**
   * @function validateForm
   * @description Tests that no fields are left purely empty and tests email strings against a standard regex pattern.
   */
  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.city || !formData.zip) {
      toast.error('Please fill in all shipping details.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }

    if (paymentMethod === 'card') {
      const sanitizedCard = paymentData.cardNumber.replace(/\s+/g, '');
      if (!/^\d{16}$/.test(sanitizedCard)) {
        toast.error('Card number must be exactly 16 digits.');
        return false;
      }

      if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(paymentData.expiry)) {
        toast.error('Expiry must be in MM/YY format.');
        return false;
      }

      if (!/^\d{3,4}$/.test(paymentData.cvv)) {
        toast.error('CVV must be 3 or 4 digits.');
        return false;
      }

      if (!paymentData.cardName.trim()) {
        toast.error('Please enter the name on card.');
        return false;
      }
    }

    if (paymentMethod === 'upi') {
      const upiRegex = /^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/;
      if (!upiRegex.test(paymentData.upiId.trim())) {
        toast.error('Please enter a valid UPI ID (example@bank).');
        return false;
      }
    }

    return true;
  };

  /**
   * @async
   * @function handleCheckout
   * @description Initiates the simulated payload push against `http://localhost:3000/orders`.
   */
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    try {
      // 1. Generate Order Payload details matching REST API requirements
      const generatedId = `ORD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      const orderData = {
        id: generatedId,
        customer: formData,
        items: cartItems,
        total: grandTotal,
        paymentMethod,
        paymentSummary:
          paymentMethod === 'card'
            ? {
                last4: paymentData.cardNumber.replace(/\s+/g, '').slice(-4),
                cardName: paymentData.cardName.trim()
              }
            : { upiId: paymentData.upiId.trim() },
        status: 'processing',
        date: new Date().toISOString()
      };

      // 2. Transmit the finalized Order JSON securely
      const response = await axios.post('http://localhost:3000/orders', orderData);

      if (response.status !== 201 && response.status !== 200) {
        throw new Error('Order was not accepted by server.');
      }

      // 3. Clear cart visually & in global scope on post-completion success
      setIsProcessing(false);
      dispatch(clearCart());
      toast.success(`Order placed successfully! ID: ${generatedId}`, { duration: 5000 });
      navigate(`/track/${generatedId}`);
    } catch (error) {
      setIsProcessing(false);
      const statusCode = error?.response?.status;
      const message =
        statusCode
          ? `Payment failed (HTTP ${statusCode}). Ensure JSON Server is running on port 3000.`
          : 'Payment failed. Ensure JSON Server is running on port 3000.';
      toast.error(message, { duration: 5000 });
      console.error('Checkout error:', error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page flex flex-col items-center justify-center pt-20">
        <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
        <button className="primary-btn" onClick={() => navigate('/cart')}>Back to Cart</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="text-gradient checkout-title text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="checkout-container grid md:grid-cols-2 gap-8">
        <form className="checkout-form glass-panel p-6 space-y-6" onSubmit={handleCheckout}>
          <div className="form-section">
            <h3 className="font-semibold text-lg mb-3">Shipping Information</h3>
            <div className="form-row grid grid-cols-2 gap-4 mb-4">
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input-glass p-3 border rounded-md" placeholder="First Name" />
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input-glass p-3 border rounded-md" placeholder="Last Name" />
            </div>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-glass full-width w-full p-3 border rounded-md mb-4" placeholder="Email Address" />
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="input-glass full-width w-full p-3 border rounded-md mb-4" placeholder="Complete Address" />
            <div className="form-row grid grid-cols-2 gap-4">
              <input type="text" name="city" value={formData.city} onChange={handleChange} className="input-glass p-3 border rounded-md" placeholder="City" />
              <input type="text" name="zip" value={formData.zip} onChange={handleChange} className="input-glass p-3 border rounded-md" placeholder="ZIP / Postal Code" />
            </div>
          </div>

          <div className="form-section pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-lg mb-3">Payment Method</h3>
            <div className="payment-options flex gap-4 mb-6">
              <label className={`payment-option flex items-center gap-2 p-3 border rounded-md cursor-pointer ${paymentMethod === 'card' ? 'border-primary-500 bg-blue-50' : 'border-gray-200'}`}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="hidden" />
                <CreditCard size={20} />
                <span>Card</span>
              </label>
              
              <label className={`payment-option flex items-center gap-2 p-3 border rounded-md cursor-pointer ${paymentMethod === 'upi' ? 'border-primary-500 bg-blue-50' : 'border-gray-200'}`}>
                <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="hidden" />
                <Smartphone size={20} />
                <span>UPI</span>
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div className="card-details space-y-4">
                <input
                  type="text"
                  name="cardNumber"
                  className="input-glass full-width w-full p-3 border rounded-md"
                  placeholder="Card Number"
                  maxLength="19"
                  value={paymentData.cardNumber}
                  onChange={handlePaymentChange}
                />
                <div className="form-row grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiry"
                    className="input-glass p-3 border rounded-md"
                    placeholder="MM/YY"
                    maxLength="5"
                    value={paymentData.expiry}
                    onChange={handlePaymentChange}
                  />
                  <input
                    type="password"
                    name="cvv"
                    className="input-glass p-3 border rounded-md"
                    placeholder="CVV"
                    maxLength="4"
                    value={paymentData.cvv}
                    onChange={handlePaymentChange}
                  />
                </div>
                <input
                  type="text"
                  name="cardName"
                  className="input-glass full-width w-full p-3 border rounded-md"
                  placeholder="Name on Card"
                  value={paymentData.cardName}
                  onChange={handlePaymentChange}
                />
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="card-details space-y-4">
                <input
                  type="text"
                  name="upiId"
                  className="input-glass full-width w-full p-3 border rounded-md"
                  placeholder="example@upi"
                  value={paymentData.upiId}
                  onChange={handlePaymentChange}
                />
              </div>
            )}
          </div>

          <button type="submit" className="primary-btn pay-btn w-full mt-6 py-3 rounded-md font-bold text-white bg-blue-600 hover:bg-blue-700 transition" disabled={isProcessing}>
            {isProcessing ? 'Processing Payment...' : `Pay $${grandTotal.toFixed(2)}`}
          </button>
        </form>

        <div className="checkout-summary glass-panel p-6 h-fit">
          <h3 className="font-semibold text-lg mb-4 border-b pb-2">Order Summary</h3>
          <div className="summary-items space-y-3 mb-4">
            {cartItems.map((item) => (
              <div key={item.product.id} className="summary-item-row flex justify-between">
                <div className="item-details">
                  <span className="item-name font-medium">{item.product.name}</span>
                  <span className="item-qty text-gray-500 ml-2">x {item.quantity}</span>
                </div>
                <span className="item-price font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-divider border-t my-4"></div>
          
          <div className="summary-row flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row flex justify-between mb-2">
            <span className="text-gray-600">Tax (8%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total-row flex justify-between mt-4 text-xl font-bold border-t pt-4">
            <span>Total</span>
            <span className="text-blue-600">${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
