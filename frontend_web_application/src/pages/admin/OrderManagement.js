import React, { useEffect, useState } from "react";
import { createOrder } from "../../api/api";

// Order CRUD API stubs for admin (replace with API if available)
let mockApi;
try {
  // Try to require order-specific mock/admin functions if added in api.js
  // Fallback: orders not implemented in mock API
  mockApi = require("../../api/api");
} catch {
  mockApi = {};
}

// PUBLIC_INTERFACE
function OrderManagement() {
  /**
   * Admin panel for managing customer orders:
   * - List all orders (mocked for now)
   * - (No create from admin; only update/delete)
   * UI updates as responses are received from API/mock.
   */
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // For demo, editing state is omitted; can add later for full update

  // Try to fetch adminListOrders if available
  const adminListOrders = mockApi.adminListOrders;
  const adminDeleteOrder = mockApi.adminDeleteOrder;
  const adminUpdateOrder = mockApi.adminUpdateOrder;

  // Fetch order list (mock API or fail gracefully)
  useEffect(() => {
    refreshOrders();
    // eslint-disable-next-line
  }, []);

  // PUBLIC_INTERFACE
  async function refreshOrders() {
    setLoading(true);
    setError("");
    if (typeof adminListOrders !== "function") {
      setError("Order management API not implemented.");
      setOrders([]);
      setLoading(false);
      return;
    }
    try {
      const data = await adminListOrders();
      setOrders(data ?? []);
    } catch (e) {
      setError("Failed to fetch orders.");
      setOrders([]);
    }
    setLoading(false);
  }

  // PUBLIC_INTERFACE
  async function handleDeleteOrder(id) {
    setError("");
    if (typeof adminDeleteOrder !== "function") {
      setError("Delete API not implemented.");
      return;
    }
    try {
      await adminDeleteOrder(id);
      await refreshOrders();
    } catch {
      setError("Failed to delete order.");
    }
  }

  // PUBLIC_INTERFACE
  async function handleUpdateOrderStatus(id, newStatus) {
    setError("");
    if (typeof adminUpdateOrder !== "function") {
      setError("Update API not implemented.");
      return;
    }
    try {
      await adminUpdateOrder(id, { status: newStatus });
      await refreshOrders();
    } catch {
      setError("Failed to update order status.");
    }
  }

  return (
    <div>
      <h3 style={{ marginTop: 0, color: "var(--base-light)", marginBottom: 10 }}>
        Order Management
      </h3>
      <div style={{ color: "var(--text-secondary)", fontSize: "1.08rem", marginBottom: 16 }}>
        View, update, and fulfill orders.
      </div>
      <div
        style={{
          padding: "36px 28px",
          border: "2px solid var(--border-color)",
          borderRadius: 16,
          background: "var(--surface-color)",
          boxShadow: "0 7px 36px 0 #8b5cf641, 0 2px 14px 0 #d4af3733",
          marginBottom: 32,
          maxWidth: 900,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={{ marginBottom: 10, fontWeight: 500 }}>Order Actions</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          <button className="btn" onClick={refreshOrders} disabled={loading || typeof adminListOrders !== "function"}>
            Refresh Orders
          </button>
        </div>
        {error ? (
          <div style={{ color: "#e6204c", margin: "8px 0 12px 0" }}>{error}</div>
        ) : loading ? (
          <div style={{ color: "#bbb" }}>Loading...</div>
        ) : orders.length === 0 ? (
          <div style={{ color: "#bbb" }}>No orders found (or not implemented in mock API).</div>
        ) : (
          <table style={{
              width: "100%",
              background: "none",
              color: "var(--primary-color)",
              borderCollapse: "collapse"
            }}>
            <thead>
              <tr style={{ background: "var(--card-bg-muted)" }}>
                <th style={{ textAlign: "left", padding: 6 }}>Order ID</th>
                <th style={{ padding: 6, textAlign: "right" }}>Subtotal</th>
                <th style={{ padding: 6 }}>Status</th>
                <th style={{ padding: 6 }}>Items</th>
                <th style={{ padding: 6 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: "1px solid var(--border-color)", background: "var(--card-bg-bright)" }}>
                  <td style={{ padding: 6 }}>{order.id}</td>
                  <td style={{ padding: 6, textAlign: "right" }}>${order.subtotal?.toFixed(2) ?? "n/a"}</td>
                  <td style={{ padding: 6 }}>
                    {order.status ?? "pending"}
                    {typeof adminUpdateOrder === "function" && (
                      <>
                        {" "}
                        <button
                          className="btn"
                          type="button"
                          style={{ marginLeft: 5, fontSize: ".9rem", padding: "2px 10px", fontWeight: 600 }}
                          onClick={() => handleUpdateOrderStatus(order.id, order.status === "fulfilled" ? "pending" : "fulfilled")}
                        >
                          Mark {order.status === "fulfilled" ? "Pending" : "Fulfilled"}
                        </button>
                      </>
                    )}
                  </td>
                  <td style={{ padding: 6, fontSize: ".96rem" }}>
                    {Array.isArray(order.items)
                      ? order.items.map((i) => `${i.name} (x${i.quantity || 1})`).join(", ")
                      : ""}
                  </td>
                  <td style={{ padding: 6 }}>
                    {typeof adminDeleteOrder === "function" ? (
                      <button className="btn" style={{ background: "#e6204c", color: "#fff" }} type="button" onClick={() => handleDeleteOrder(order.id)}>
                        Delete
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default OrderManagement;
