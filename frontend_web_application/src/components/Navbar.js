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
    <nav className="navbar" style={{
      background: "var(--surface-color)",
      color: "var(--primary-color)",
      borderBottom: "1px solid var(--border-color)",
      minHeight: 65,
      boxShadow: "0 2px 8px #d4af3722"
    }}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center'
          }}
        >
          <div className="logo" style={{
            fontSize: "1.32rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 9,
            color: "var(--primary-color)",
            letterSpacing: "0.5px",
            background: "none"
          }}>
            <span className="logo-symbol" style={{
              color: "var(--secondary-color)",
              fontWeight: 900,
              fontSize: "2.0em",
              paddingRight: 3
            }}>&#9702;</span>{" "}
            ShopWebsite
          </div>
          <div style={{ display: 'flex', gap: 17, alignItems: 'center' }}>
            <Link className="btn" to="/" tabIndex={0}>
              Home
            </Link>
            {isLoggedIn && (
              <>
                <Link className="btn" to="/products">Products</Link>
                <Link className="btn" to="/cart">Cart</Link>
                <Link className="btn" to="/orders">Orders</Link>
                {hasRole && hasRole("admin") && (
                  <Link className="btn" to="/admin">Admin</Link>
                )}
                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                  type="button"
                  style={{
                    marginLeft: 6,
                    fontWeight: 600
                  }}
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
