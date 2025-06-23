import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
function Navbar() {
  /** A top navigation bar for the application, context-aware for login state. */
  const { isLoggedIn, logout, user, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div className="logo">
            <span className="logo-symbol">*</span> ShopWebsite
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link className="btn" to="/">Home</Link>
            {isLoggedIn && (
              <>
                <Link className="btn" to="/products">Products</Link>
                <Link className="btn" to="/cart">Cart</Link>
                <Link className="btn" to="/orders">Orders</Link>
                {hasRole && hasRole("admin") && (
                  <Link className="btn" to="/admin">Admin</Link>
                )}
                <button
                  className="btn"
                  style={{ background: "#e6204c", color: "#fff", marginLeft: 6, fontWeight: 600 }}
                  onClick={handleLogout}
                  type="button"
                >
                  Logout{user?.username ? ` (${user.username})` : ''}
                </button>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link className="btn" to="/login">Login</Link>
                <Link className="btn" to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
