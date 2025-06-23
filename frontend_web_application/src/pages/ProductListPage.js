import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/api';

// PUBLIC_INTERFACE
function ProductListPage() {
  /**
   * Product listing page: shows a grid of product cards.
   * Uses fetchProducts API function.
   */
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchProducts().then((data) => {
      if (isMounted) {
        setProducts(data || []);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="container" style={{ paddingTop: 100, paddingBottom: 40 }}>
      <h2 style={{ marginBottom: 24 }}>Products</h2>
      {loading ? (
        <div style={{ color: "var(--text-secondary)", marginBottom: 24 }}>Loading products...</div>
      ) : (
        <div
          className="productGrid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: "1.7rem"
          }}
          data-testid="product-list"
        >
          {products.map((prod) => (
            <div
              key={prod.id}
              className="card"
              style={{
                background: "var(--surface-color)",
                borderRadius: 14,
                boxShadow: "0 8px 34px 0 #8b5cf641, 0 2px 14px 0 #d4af3729",
                border: "2px solid var(--border-color)",
                padding: "1.45rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: 210,
                width: "100%",
                position: "relative"
              }}
              data-testid={`card-product-${prod.id}`}
            >
              <div
                style={{
                  width: "100%",
                  marginBottom: 18,
                  height: 80,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "var(--card-bg-muted)",
                  borderRadius: 7,
                }}
              >
                {/* Will show product image when integrated */}
                <span style={{ fontSize: 39, color: "var(--base-light)" }}>🛍️</span>
              </div>
              <Link to={`/products/${prod.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ fontWeight: 600, fontSize: '1.2rem', marginBottom: 6 }}>
                  {prod.name}
                </div>
              </Link>
              <div style={{
                color: 'var(--text-secondary)',
                fontSize: '.99rem',
                marginBottom: 8,
                textAlign: 'center'
              }}>
                {prod.description}
              </div>
              <div style={{
                fontWeight: 500,
                marginBottom: 10,
                color: 'var(--base-light)',
                fontSize: '1.05rem'
              }}>
                ${prod.price.toFixed(2)}
              </div>
              <div style={{ marginTop: 'auto' }}>
                <button
                  className="btn"
                  style={{ fontWeight: 600, marginTop: 7, width: 126 }}
                  disabled
                  title="Add to cart coming soon"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListPage;
