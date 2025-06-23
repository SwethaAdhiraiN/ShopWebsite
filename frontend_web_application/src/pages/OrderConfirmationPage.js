import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
function OrderConfirmationPage() {
  /**
   * Placeholder order confirmation page for successful checkout.
   * Will show order summary/details soon.
   */
  return (
    <div className="container" style={{ paddingTop: 96, paddingBottom: 64, textAlign: 'center' }}>
      <div
        style={{
          background: 'rgba(0,255,255,0.11)',
          borderRadius: 16,
          maxWidth: 420,
          margin: '0 auto',
          padding: '48px 24px 36px 24px',
        }}
      >
        <span style={{ fontSize: 44, color: 'var(--base-light)' }}>✅</span>
        <h2 className="title" style={{ margin: '18px 0 8px 0', fontSize: '2.1rem' }}>Order Confirmed</h2>
        <div className="description" style={{ marginBottom: 16 }}>
          Thank you for your purchase! Your order was placed successfully.
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '.93rem', marginBottom: 9 }}>
          {/* In future, show order number and summary from REST API */}
        </div>
        <Link
          to="/products"
          className="btn btn-large"
          style={{
            display: 'inline-block',
            fontWeight: 600,
            marginTop: 18,
            textDecoration: 'none',
            background: 'var(--base-light)',
            color: 'white',
          }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
