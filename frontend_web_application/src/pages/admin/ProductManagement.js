import React, { useEffect, useState } from "react";
import {
  adminListProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
} from "../../api/api";

// PUBLIC_INTERFACE
function ProductManagement() {
  /**
   * Admin panel for managing products, fully connected to API:
   * - List products
   * - Create/edit/delete products
   * State updates as API responses are received.
   */
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newForm, setNewForm] = useState({ name: "", price: "", description: "" });
  const [error, setError] = useState("");

  // Fetch product list from API
  useEffect(() => {
    refreshProducts();
    // eslint-disable-next-line
  }, []);

  // PUBLIC_INTERFACE
  async function refreshProducts() {
    setLoading(true);
    setError("");
    try {
      const result = await adminListProducts();
      setProducts(result ?? []);
    } catch (e) {
      setError("Failed to fetch products.");
    }
    setLoading(false);
  }

  // PUBLIC_INTERFACE
  function handleNewFormChange(e) {
    const { name, value } = e.target;
    setNewForm((prev) => ({ ...prev, [name]: value }));
  }

  // PUBLIC_INTERFACE
  async function handleCreateProduct(e) {
    e.preventDefault();
    setError("");
    const name = newForm.name.trim();
    const price = parseFloat(newForm.price);
    if (!name || isNaN(price)) {
      setError("Name and price are required.");
      return;
    }
    try {
      await adminCreateProduct({
        name,
        price,
        description: newForm.description,
        image: null,
      });
      setNewForm({ name: "", price: "", description: "" });
      await refreshProducts();
    } catch (err) {
      setError("Failed to create product.");
    }
  }

  // PUBLIC_INTERFACE
  function handleEditClick(product) {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      price: product.price,
      description: product.description,
    });
    setError("");
  }

  // PUBLIC_INTERFACE
  function handleEditFormChange(e) {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  }

  // PUBLIC_INTERFACE
  async function handleUpdateProduct(id, e) {
    e.preventDefault();
    setError("");
    const name = editForm.name.trim();
    const price = parseFloat(editForm.price);
    if (!name || isNaN(price)) {
      setError("Name and price are required.");
      return;
    }
    try {
      await adminUpdateProduct(id, {
        name,
        price,
        description: editForm.description,
      });
      setEditingId(null);
      setEditForm({});
      await refreshProducts();
    } catch (err) {
      setError("Failed to update product.");
    }
  }

  // PUBLIC_INTERFACE
  async function handleDeleteProduct(id) {
    setError("");
    try {
      await adminDeleteProduct(id);
      await refreshProducts();
    } catch (err) {
      setError("Failed to delete product.");
    }
  }

  // PUBLIC_INTERFACE
  function handleCancelEdit() {
    setEditingId(null);
    setEditForm({});
  }

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
          padding: "36px 28px",
          border: "2px solid var(--border-color)",
          borderRadius: 16,
          background: "var(--surface-color)",
          boxShadow: "0 7px 36px 0 #8b5cf642, 0 2px 14px 0 #d4af3741",
          marginBottom: 28,
          maxWidth: 600,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={{ marginBottom: 10, fontWeight: 500 }}>Add New Product</div>
        <form onSubmit={handleCreateProduct} style={{ display: "flex", gap: 9, flexWrap: "wrap", marginBottom: 6 }}>
          <input
            name="name"
            type="text"
            required
            placeholder="Name"
            value={newForm.name}
            onChange={handleNewFormChange}
            style={{
              padding: "11px 14px",
              borderRadius: 7,
              fontSize: "1.06rem",
              border: "2px solid var(--border-color)",
              background: "#f5f5f5",
              width: 155
            }}
          />
          <input
            name="price"
            type="number"
            required
            placeholder="Price"
            min="0"
            step="0.01"
            value={newForm.price}
            onChange={handleNewFormChange}
            style={{
              padding: "11px 14px",
              borderRadius: 7,
              fontSize: "1.06rem",
              border: "2px solid var(--border-color)",
              background: "#f5f5f5",
              width: 95
            }}
          />
          <input
            name="description"
            type="text"
            placeholder="Description"
            value={newForm.description}
            onChange={handleNewFormChange}
            style={{
              padding: "11px 14px",
              borderRadius: 7,
              fontSize: "1.06rem",
              border: "2px solid var(--border-color)",
              background: "#f5f5f5",
              width: 250,
              flex: 1
            }}
          />
          <button className="btn" type="submit" style={{ minWidth: 112, fontWeight: 600 }}>
            Add
          </button>
        </form>
        {error && (
          <div style={{ color: "#e6204c", marginTop: 5, marginBottom: 7, fontWeight: 500 }}>
            {error}
          </div>
        )}
      </div>
      <div
        style={{
          padding: "36px 28px",
          border: "2px solid var(--border-color)",
          borderRadius: 16,
          background: "var(--surface-color)",
          boxShadow: "0 7px 36px 0 #8b5cf642, 0 2px 14px 0 #d4af3741"
        }}
      >
        <div style={{ marginBottom: 11, fontWeight: 500 }}>Current Products</div>
        {loading ? (
          <div style={{ color: "#bbb" }}>Loading...</div>
        ) : products.length === 0 ? (
          <div style={{ color: "#bbb" }}>No products found.</div>
        ) : (
          <table style={{
              width: "100%",
              background: "none",
              color: "var(--primary-color)",
              borderCollapse: "collapse"
            }}>
            <thead>
              <tr style={{ background: "var(--card-bg-muted)" }}>
                <th style={{ textAlign: "left", padding: 6 }}>Name</th>
                <th style={{ textAlign: "right" }}>Price</th>
                <th style={{ padding: 6 }}>Description</th>
                <th style={{ padding: 6 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) =>
                editingId === p.id ? (
                  <tr key={p.id} style={{ background: "var(--card-bg-muted)", borderRadius: 6 }}>
                    <td style={{ padding: 6 }}>
                      <input
                        name="name"
                        type="text"
                        value={editForm.name}
                        onChange={handleEditFormChange}
                        required
                        style={{
                          width: 110,
                          padding: "10px",
                          borderRadius: 7,
                          border: "2px solid var(--border-color)",
                          background: "#f5f5f5",
                          fontSize: "1.06rem"
                        }}
                      />
                    </td>
                    <td style={{ padding: 6, textAlign: "right" }}>
                      <input
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={editForm.price}
                        onChange={handleEditFormChange}
                        required
                        style={{
                          width: 70,
                          padding: "10px",
                          borderRadius: 7,
                          border: "2px solid var(--border-color)",
                          background: "#f5f5f5",
                          textAlign: "right",
                          fontSize: "1.06rem"
                        }}
                      />
                    </td>
                    <td style={{ padding: 6 }}>
                      <input
                        name="description"
                        type="text"
                        value={editForm.description}
                        onChange={handleEditFormChange}
                        style={{
                          width: 180,
                          padding: "10px",
                          borderRadius: 7,
                          border: "2px solid var(--border-color)",
                          background: "#f5f5f5",
                          fontSize: "1.06rem"
                        }}
                      />
                    </td>
                    <td style={{ padding: 6 }}>
                      <button className="btn" style={{ fontWeight: 600, marginRight: 3 }} onClick={(e) => handleUpdateProduct(p.id, e)}>
                        Save
                      </button>
                      <button className="btn" style={{ background: "#e6204c", color: "#fff" }} type="button" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--border-color)", background: "var(--card-bg-bright)" }}>
                    <td style={{ padding: 6 }}>{p.name}</td>
                    <td style={{ padding: 6, textAlign: "right" }}>${Number(p.price).toFixed(2)}</td>
                    <td style={{ padding: 6 }}>{p.description}</td>
                    <td style={{ padding: 6 }}>
                      <button className="btn" style={{ fontWeight: 600, marginRight: 7 }} onClick={() => handleEditClick(p)}>
                        Edit
                      </button>
                      <button
                        className="btn"
                        style={{ background: "#e6204c", color: "#fff" }}
                        type="button"
                        onClick={() => handleDeleteProduct(p.id)}
                        title="Delete product"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProductManagement;
