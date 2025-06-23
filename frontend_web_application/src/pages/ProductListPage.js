import React from 'react';
import { Link } from 'react-router-dom';

// Stub data to simulate products
const demoProducts = [
  { id: 1, name: 'Product A', price: 29.99, image: null, description: 'Short description for Product A' },
  { id: 2, name: 'Product B', price: 39.99, image: null, description: 'Short description for Product B' },
  { id: 3, name: 'Product C', price: 14.95, image: null, description: 'Short description for Product C' },
  { id: 4, name: 'Product D', price: 49.99, image: null, description: 'Short description for Product D' },
];

// PUBLIC_INTERFACE
function ProductListPage() {
  /**
   * Product listing page: shows a grid of product cards.
   * Each product links to its product detail page.
   * UI is prepped for REST API/data integration.
   */
  return (
    <div className="container" style={{ paddingTop: 100, paddingBottom: 40 }}>
      <h2 style={{ marginBottom: 24 }}>Products</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 28,
        }}
        data-testid="product-list"
      >
        {demoProducts.map((prod) => (
          <div
            key={prod.id}
            style={{
              background: 'rgba(20,24,38,0.92)',
              borderRadius: 10,
              boxShadow: '0 2px 14px rgba(0,255,255,.06)',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: 220,
              position: 'relative',
            }}
            data-testid={`card-product-${prod.id}`}
          >
            <div
              style={{
                width: '100%',
                marginBottom: 18,
                height: 80,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#001a3c1e',
                borderRadius: 6,
              }}
            >
              {/* Will show product image when integrated */}
              <span style={{ fontSize: 39, color: 'var(--base-light)' }}>🛍️</span>
            </div>
            <Link to={`/products/${prod.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ fontWeight: 600, fontSize: '1.2rem', marginBottom: 6 }}>
                {prod.name}
              </div>
            </Link>
            <div style={{ color: 'var(--text-secondary)', fontSize: '.99rem', marginBottom: 8, textAlign: 'center' }}>
              {prod.description}
            </div>
            <div style={{ fontWeight: 500, marginBottom: 10, color: 'var(--base-light)', fontSize: '1.05rem' }}>
              ${prod.price.toFixed(2)}
            </div>
            <div style={{ marginTop: 'auto' }}>
              <button
                className="btn"
                style={{ fontWeight: 600, marginTop: 7, width: 126 }}
                disabled // Remove disabled after real add-to-cart is ready
                title="Add to cart coming soon"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;
