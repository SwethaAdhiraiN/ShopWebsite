import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProductManagement from "./admin/ProductManagement";
import OrderManagement from "./admin/OrderManagement";
import UserManagement from "./admin/UserManagement";

// PUBLIC_INTERFACE
function AdminDashboardPage() {
  /**
   * Full admin dashboard page with tab navigation.
   * Layout blends KAVIA/ShopWebsite cues with modern, clean sidebar/topbar.
   * Protects access to admin-only users.
   */
  const { isLoggedIn, hasRole } = useAuth();
  // For testing/demo, fallback to forbidden if not "admin"
  const isAdmin = isLoggedIn && hasRole && hasRole("admin");
  // Section state: "products", "orders", "users"
  const [section, setSection] = useState("products");

  // ADMIN-GUARD: block unauthorized
  if (!isAdmin) {
    // Optionally: replace with dedicated Forbidden page/component
    return (
      <div className="container" style={{ paddingTop: 96 }}>
        <h2>Access Denied</h2>
        <div style={{ color: "var(--text-secondary)", fontSize: "1.09rem" }}>
          Admin access required. Please login as an admin to use the dashboard.
        </div>
      </div>
    );
  }

  // Navigation tabs (could use icons if desired)
  const tabs = [
    { key: "products", label: "Product Management", icon: "📦" },
    { key: "orders", label: "Order Management", icon: "🧾" },
    { key: "users", label: "User Management", icon: "👥" },
  ];

  return (
    <div className="container" style={{ paddingTop: 94, paddingBottom: 50 }}>
      <div className="subtitle" style={{ color: "var(--base-light)", fontWeight: 700, marginBottom: 14 }}>
        Admin Dashboard
      </div>
      <div
        style={{
          display: "flex",
          gap: 14,
          marginBottom: 33,
          borderBottom: "1px solid var(--border-color)",
          background: "transparent",
          paddingBottom: 2,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className="btn"
            style={{
              background: section === tab.key ? "var(--surface-color)" : "var(--card-bg-muted)",
              color: section === tab.key ? "var(--primary-color)" : "var(--text-secondary)",
              fontWeight: section === tab.key ? 700 : 500,
              borderRadius: 7,
              fontSize: "1.04rem",
              marginRight: 7,
              borderBottom: section === tab.key ? "3px solid var(--base-light)" : "none",
              boxShadow: section === tab.key ? "0 2px 8px #8b5cf646" : "none",
              outline: "none",
              cursor: "pointer",
              padding: "10px 20px 10px 15px",
            }}
            onClick={() => setSection(tab.key)}
            aria-current={section === tab.key ? "page" : undefined}
          >
            <span style={{ marginRight: 8 }}>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>
      {/* Main Content Area */}
      <div>
        {section === "products" && <ProductManagement />}
        {section === "orders" && <OrderManagement />}
        {section === "users" && <UserManagement />}
      </div>
    </div>
  );
}

export default AdminDashboardPage;
