import React from 'react';
import { useParams, Link } from 'react-router-dom';

// PUBLIC_INTERFACE
function ProductDetailPage() {
  /**
   * Single product view page (stub).
   * Designed for future REST API integration based on productId param.
   */
  const { productId } = useParams();

  // Stub data, replace with API later
  const stubProduct = {
    id: productId,
    name: `Product ${productId}`,
    price: 49.99,
    image: null,
    description: 'This is a placeholder description for a single product. Product data will be loaded via API.',
  };

  return (
    <div className="container" style={{ paddingTop: 94, paddingBottom: 46 }}>
      <Link to="/products" style={{ color: 'var(--base-light)', textDecoration: 'underline', fontWeight: 500, marginBottom: 20, display: 'inline-block' }}>
        &larr; Back to Products
      </Link>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 32, marginTop: 10 }}>
        <div style={{ minWidth: 230, flex: 1 }}>
          <div
            style={{
              width: "100%",
              height: 180,
              background: "var(--card-bg-muted)",
              borderRadius: 12,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20
            }}
          >
            <span style={{ fontSize: 58, color: "var(--base-light)" }}>🛍️</span>
          </div>
        </div>
        <div style={{ flex: 2, minWidth: 240 }}>
          <div style={{ fontWeight: 600, fontSize: '2rem', marginBottom: 8 }}>{stubProduct.name}</div>
          <div style={{ color: 'var(--base-light)', fontWeight: 600, fontSize: '1.15rem', marginBottom: 12 }}>
            ${stubProduct.price.toFixed(2)}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '1.01rem', marginBottom: 12 }}>
            {stubProduct.description}
          </div>
          <div>
            <button
              className="btn btn-large"
              style={{ width: 160, fontWeight: 600 }}
              disabled // Remove disabled when hooked to cart context
              title="Add to cart coming soon"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div style={{ color: 'var(--text-secondary)', marginTop: 30, fontSize: '0.97rem' }}>
        {/* REST API/product reviews/related info will go here */}
      </div>
    </div>
  );
}

export default ProductDetailPage;
