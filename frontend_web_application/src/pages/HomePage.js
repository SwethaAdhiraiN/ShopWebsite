import React from 'react';
import { Link } from 'react-router-dom';

// Demo featured products (stub: can also import from demo data)
const featured = [
  { id: 1, name: 'Product A', price: 29.99 },
  { id: 2, name: 'Product B', price: 39.99 },
  { id: 3, name: 'Product C', price: 14.95 },
];

// PUBLIC_INTERFACE
function HomePage() {
  /**
   * Home page with modern hero/banner, promo, and featured products.
   * UI ready for API/product highlight integration.
   */
  return (
    <div className="container">
      <div className="hero" style={{ marginTop: 30 }}>
        <div className="subtitle" style={{ fontWeight: 700, letterSpacing: 1.0 }}>
          Welcome to ShopWebsite
        </div>
        <h1 className="title" style={{ marginBottom: 12 }}>Your one-stop online shop</h1>
        <div className="description" style={{ marginBottom: 20 }}>
          Browse our latest products and exclusive deals.<br />Add favourites to your cart and enjoy secure checkout!
        </div>
        <Link
          className="btn btn-large"
          style={{ width: 180, alignSelf: 'center', fontWeight: 600, fontSize: '1.15rem', borderRadius: 6 }}
          to="/products"
        >
          Shop Products
        </Link>
      </div>
      <div style={{ marginTop: 46, marginBottom: 36 }}>
        <div style={{ fontWeight: 600, fontSize: '1.4rem', marginBottom: 17, color: 'var(--base-light)' }}>
          Featured Products
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 28,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {featured.map((prod) => (
            <div
              key={prod.id}
              style={{
                background: 'rgba(20,24,38,0.92)',
                borderRadius: 10,
                boxShadow: '0 2px 14px rgba(0,255,255,.08)',
                padding: 22,
                minWidth: 190,
                maxWidth: 190,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{
                width: '100%',
                height: 56,
                background: '#001a3c12',
                borderRadius: 5,
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: 28, color: 'var(--base-light)' }}>🛒</span>
              </div>
              <div style={{ fontWeight: 500, marginBottom: 6 }}>{prod.name}</div>
              <div style={{ color: 'var(--base-light)', fontWeight: 500, fontSize: '1rem', marginBottom: 6 }}>${prod.price.toFixed(2)}</div>
              <Link
                to={`/products/${prod.id}`}
                style={{
                  color: 'white',
                  background: 'var(--base-light)',
                  borderRadius: 5,
                  fontWeight: 600,
                  padding: '7px 12px',
                  fontSize: '.98rem',
                  textDecoration: 'none',
                  marginTop: 5,
                  display: 'inline-block',
                }}
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
