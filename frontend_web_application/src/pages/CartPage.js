import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
function CartPage() {
  /**
   * Shopping cart page: displays cart items, quantity, subtotal, and stub actions.
   * Ready for future REST API/data integration; interacts with CartContext.
   */
  const { cartItems } = useCart();

  // Demo-only: If cart is empty, informative placeholder
  const isEmpty = cartItems.length === 0;

  // Demo cart summary logic (replace with real shipping, etc.)
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="container" style={{ paddingTop: 94, paddingBottom: 64, minHeight: 400 }}>
      <h2 style={{ marginBottom: 28 }}>Cart</h2>
      {isEmpty ? (
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.12rem', marginTop: 32, textAlign: 'center' }}>
          Your cart is empty.<br />
          <Link to="/products" style={{ color: 'var(--base-light)', textDecoration: 'underline', fontWeight: 500 }}>
            Browse products
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 520, margin: '0 auto' }}>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: 28 }}>
            {cartItems.map((item, idx) => (
              <li
                key={item.id || idx}
                style={{
                  background: '#1a223c',
                  borderRadius: 6,
                  padding: '16px 14px',
                  marginBottom: 14,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 26, marginRight: 16, color: 'var(--base-light)' }}>🛒</span>
                <div style={{ flex: 2 }}>
                  <div style={{ fontWeight: 500 }}>{item.name}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '.96rem' }}>
                    Qty: {item.quantity || 1}
                  </div>
                </div>
                <div style={{ flex: 1, fontWeight: 600, textAlign: 'right', color: 'var(--base-light)', fontSize: '.98rem' }}>
                  ${(item.price * (item.quantity || 1)).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
          <div style={{ fontWeight: 600, fontSize: '1.13rem', marginBottom: 17, display: 'flex', justifyContent: 'space-between' }}>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-large"
            style={{ width: 155, alignSelf: 'center', fontWeight: 600, marginTop: 9, fontSize: '1.07rem' }}
            disabled // Remove disabled when implementing checkout handler
            title="Checkout not yet implemented"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
