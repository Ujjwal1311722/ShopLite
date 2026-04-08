import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="page-wrapper container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track" element={<OrderTracking />} />
          <Route path="/track/:orderId" element={<OrderTracking />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;