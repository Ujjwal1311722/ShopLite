import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { itemCount } = useCart();

  return (
    <nav className="navbar glass-panel">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          <span className="text-gradient">ShopLite</span>
        </Link>
        <div className="navbar-actions">
          <Link to="/track" className="nav-icon-link" aria-label="Track Order" title="Track Order">
            <Truck size={24} />
          </Link>
          <Link to="/cart" className="nav-icon-link cart-link" aria-label="Shopping Cart" title="Shopping Cart">
            <ShoppingCart size={24} />
            {itemCount > 0 && <span className="badge cart-badge">{itemCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
