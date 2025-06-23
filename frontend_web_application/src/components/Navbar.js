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

  // Responsive navbar: stack menu items on mobile, hamburger not implemented yet (for simplicity)
  return (
    <nav className="navbar" style={{
      background: "var(--surface-color)",
      color: "var(--primary-color)",
      borderBottom: "1px solid var(--border-color)",
      minHeight: 65,
      boxShadow: "0 2px 8px #d4af3722",
      width: "100vw"
    }}>
      <div className="container" style={{
        paddingLeft: "0.2rem", paddingRight: "0.2rem"
      }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
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
          <div className="navbar-links" style={{
            display: 'flex', gap: 17, alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <Link className="btn" to="/" tabIndex={0} style={{
              fontWeight: 600
            }}>
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
      {/* Simple CSS for navbar mobile stack */}
      <style>{`
        @media (max-width: 600px) {
          .navbar-links {
            flex-direction: column !important;
            gap: 7px !important;
            width: 100vw;
            padding-top: 0.23rem;
          }
          .navbar .btn {
            width: 98vw !important;
            min-width: unset !important;
            margin-left: 0 !important;
            justify-content: flex-start;
            font-size: 0.99rem !important;
          }
          .logo {
            font-size: 1.08rem !important;
            gap: 5px !important;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
