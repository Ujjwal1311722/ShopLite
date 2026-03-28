import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, Search } from 'lucide-react';
import './OrderTracking.css';

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(orderId || '');
  const [activeOrder, setActiveOrder] = useState(orderId || null);

  // Helper to format time dynamically
  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const now = new Date();
  const placedTime = formatTime(now);
  const processingTime = formatTime(new Date(now.getTime() + 10 * 60000)); // +10 mins

  // Fake tracking steps
  const steps = [
    { id: 1, label: 'Order Placed', icon: Clock, completed: true, date: `Today, ${placedTime}` },
    { id: 2, label: 'Processing', icon: Package, completed: true, date: `Today, ${processingTime}` },
    { id: 3, label: 'Shipped', icon: Truck, completed: false, date: 'Estimated: Tomorrow' },
    { id: 4, label: 'Delivered', icon: CheckCircle, completed: false, date: 'Estimated: in 3 days' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveOrder(searchInput.trim().toUpperCase());
      navigate(`/track/${searchInput.trim()}`);
    }
  };

  return (
    <div className="tracking-page">
      <div className="tracking-header">
        <h1 className="text-gradient">Track Your Order</h1>
        <p className="subtitle">Enter your order ID to see real-time updates.</p>
      </div>

      <div className="search-order-container glass-panel">
        <form onSubmit={handleSearch} className="search-order-form">
          <input
            type="text"
            className="input-glass"
            placeholder="e.g. ORD-8X9J2"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            required
          />
          <button type="submit" className="primary-btn search-btn">
            <Search size={20} />
            <span>Track</span>
          </button>
        </form>
      </div>

      {activeOrder && (
        <div className="tracking-details glass-panel">
          <div className="order-info-header">
            <div>
              <h3>Order #{activeOrder}</h3>
              <p className="text-muted">Placed via Standard Shipping</p>
            </div>
            <div className="status-badge">Processing</div>
          </div>

          <div className="timeline-container">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className={`timeline-step ${step.completed ? 'completed' : 'pending'}`}>
                  <div className="timeline-icon-wrapper">
                    <div className="timeline-icon">
                      <Icon size={24} />
                    </div>
                    {index < steps.length - 1 && <div className="timeline-connector"></div>}
                  </div>
                  
                  <div className="timeline-content">
                    <h4>{step.label}</h4>
                    <p>{step.date}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="shipping-address">
            <h4>Shipping Destination</h4>
            <p>123 Premium Avenue, Tech District</p>
            <p>San Francisco, CA 94105</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
