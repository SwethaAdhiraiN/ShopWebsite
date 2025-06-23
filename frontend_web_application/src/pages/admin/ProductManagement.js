import React from "react";

// PUBLIC_INTERFACE
function ProductManagement() {
  /**
   * Admin panel for managing products.
   * Placeholder for CRUD features and product listing (future).
   */
  return (
    <div>
      <h3 style={{ marginTop: 0, color: "var(--base-light)", marginBottom: 10 }}>
        Product Management
      </h3>
      <div style={{ color: "var(--text-secondary)", fontSize: "1.08rem", marginBottom: 16 }}>
        Create, edit, and remove products. Inventory and pricing controls coming soon.
      </div>
      <div
        style={{
          padding: 22,
          border: "1px solid var(--border-color)",
          borderRadius: 8,
          background: "#232e46",
        }}
      >
        <div style={{ marginBottom: 9, fontWeight: 500 }}>Actions (Stubs):</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <button className="btn" disabled>
            Add New Product
          </button>
          <button className="btn" disabled>
            Bulk Edit
          </button>
        </div>
        <div style={{ color: "#bbb", fontSize: "1.02rem" }}>
          Product list, editing, and actions will be integrated here.
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
