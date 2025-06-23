import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
function OrderConfirmationPage() {
  /**
   * Placeholder order confirmation page for successful checkout.
   * Shows order summary/details.
   * The confirmation box uses the same bright, modern card style as login/register.
   */
  return (
    <div
      className="container"
      style={{ paddingTop: 96, paddingBottom: 64, textAlign: 'center', minHeight: 400 }}
    >
      <div
        style={{
          background: "var(--surface-color)",
          borderRadius: 18,
          maxWidth: 430,
          margin: "55px auto",
          padding: "53px 38px 35px 38px",
          boxShadow: "0 7px 36px 0 #8b5cf642, 0 2px 14px 0 #d4af3741",
          border: "2px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          gap: 26,
        }}
        role="region"
        aria-label="Order confirmation card"
      >
        <span style={{ fontSize: 44, color: "var(--base-light)", alignSelf: "center" }}>✅</span>
        <h2 className="title" style={{
          margin: "18px 0 8px 0",
          fontSize: "2.1rem",
          textAlign: "center"
        }}>Order Confirmed</h2>
        <div className="description" style={{
          marginBottom: 16,
          textAlign: "center"
        }}>
          Thank you for your purchase! Your order was placed successfully.
        </div>
        <div style={{
          color: "var(--text-secondary)",
          fontSize: ".93rem",
          marginBottom: 9,
          textAlign: "center"
        }}>
          {/* In future, show order number and summary from REST API */}
        </div>
        <Link
          to="/products"
          className="btn btn-large"
          style={{
            display: "inline-block",
            fontWeight: 600,
            marginTop: 18,
            textDecoration: "none",
            background: "var(--base-light)",
            color: "white",
            alignSelf: "center"
          }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
