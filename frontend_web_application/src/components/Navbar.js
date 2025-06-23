import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
function Navbar() {
  /** A top navigation bar for the application. */
  return (
    <nav className="navbar">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div className="logo">
            <span className="logo-symbol">*</span> ShopWebsite
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link className="btn" to="/">Home</Link>
            <Link className="btn" to="/products">Products</Link>
            <Link className="btn" to="/cart">Cart</Link>
            <Link className="btn" to="/orders">Orders</Link>
            <Link className="btn" to="/admin">Admin</Link>
            <Link className="btn" to="/login">Login</Link>
            <Link className="btn" to="/register">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
