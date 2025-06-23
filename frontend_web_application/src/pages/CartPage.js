import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

/**
 * Shopping cart page: displays cart items, allows editing (update quantity, remove),
 * and handles checkout workflow (with stubbed REST API logic).
 * Integrates with CartContext for all cart operations.
 */

// PUBLIC_INTERFACE
function CartPage() {
  const navigate = useNavigate();
  const { cartItems, removeItem, updateItem, clearCart } = useCart();

  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState('');

  // Get subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price * (item.quantity || 1)),
    0
  );
  const isEmpty = cartItems.length === 0;

  // Handler for changing item quantity in cart
  // PUBLIC_INTERFACE
  const handleQuantityChange = (item, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (isNaN(qty) || qty < 1) return;
    updateItem(item.id, { ...item, quantity: qty });
  };

  // Handler for removing an item from cart
  // PUBLIC_INTERFACE
  const handleRemove = (itemId) => {
    removeItem(itemId);
  };

  // Handler for placing order (stub, simulates network)
  // PUBLIC_INTERFACE
  const handleCheckout = async (e) => {
    e.preventDefault();
    setOrderError('');
    setPlacingOrder(true);

    // Stub: Simulate async API call for order placement
    try {
      // await submitOrder(cartItems); // REST API call (to implement)
      await new Promise((resolve) => setTimeout(resolve, 700));
      // Fake order number
      const fakeOrderId = Math.floor(Math.random() * 100000) + 1000;
      // For now, just transition to order confirmation, passing order details in navigation state
      clearCart();
      navigate('/order-confirmation', {
        state: {
          orderId: fakeOrderId,
          items: cartItems,
          subtotal,
        },
      });
    } catch (e) {
      setOrderError('Order placement failed. Please try again soon.');
    }
    setPlacingOrder(false);
  };

  // (Future) Stub for actual REST API order submission
  // PUBLIC_INTERFACE
  // eslint-disable-next-line
  async function submitOrder(orderData) {
    // TODO: Integrate with backend REST API for order submission
    // Example: return await fetch('/api/orders', { method: 'POST', ... })
    return { orderId: 'PLACEHOLDER' };
  }

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
        <form
          onSubmit={handleCheckout}
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 520,
            margin: '0 auto'
          }}
        >
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
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 26, marginRight: 14, color: 'var(--base-light)' }}>🛒</span>
                <div style={{ flex: 2 }}>
                  <div style={{ fontWeight: 500 }}>{item.name}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '.98rem', display: 'flex', gap: 7, alignItems: 'center', marginTop: 2 }}>
                    <label htmlFor={`qty-${item.id}`} style={{ fontWeight: 400 }}>Qty:</label>
                    <input
                      id={`qty-${item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity || 1}
                      onChange={(e) => handleQuantityChange(item, e.target.value)}
                      style={{
                        width: 53,
                        padding: '3px 7px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 4,
                        background: '#162040',
                        color: 'var(--text-color)',
                        fontSize: '.98rem'
                      }}
                    />
                  </div>
                </div>
                <div style={{ flex: 1, fontWeight: 600, textAlign: 'right', color: 'var(--base-light)', fontSize: '.98rem' }}>
                  ${(item.price * (item.quantity || 1)).toFixed(2)}
                </div>
                <button
                  type="button"
                  title="Remove item"
                  onClick={() => handleRemove(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#e6204c',
                    fontWeight: 700,
                    marginLeft: 13,
                    fontSize: '1.3rem',
                    cursor: 'pointer',
                  }}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          <div style={{
            fontWeight: 600,
            fontSize: '1.13rem',
            marginBottom: 17,
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button
            type="submit"
            className="btn btn-large"
            style={{
              width: 155,
              alignSelf: 'center',
              fontWeight: 600,
              marginTop: 9,
              fontSize: '1.07rem',
              opacity: placingOrder ? 0.6 : 1,
              cursor: placingOrder ? 'default' : 'pointer'
            }}
            disabled={placingOrder}
          >
            {placingOrder ? 'Placing order...' : 'Checkout'}
          </button>
          {orderError && (
            <div style={{ color: '#e6204c', fontWeight: 500, marginTop: 19, textAlign: 'center' }}>
              {orderError}
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default CartPage;
