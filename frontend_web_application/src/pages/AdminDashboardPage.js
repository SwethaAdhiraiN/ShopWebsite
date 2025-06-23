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
          background: "rgba(0,255,255,0.021)",
          paddingBottom: 2,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className="btn"
            style={{
              background: section === tab.key ? "var(--base-light)" : "rgba(10,20,40,0.17)",
              color: section === tab.key ? "white" : "var(--text-secondary)",
              fontWeight: section === tab.key ? 700 : 500,
              borderRadius: 5,
              fontSize: "1.02rem",
              marginRight: 7,
              borderBottom: section === tab.key ? "2.5px solid #fff" : "none",
              boxShadow: section === tab.key ? "0 1px 6px #00ffff22" : "none",
              outline: "none",
              cursor: "pointer",
              padding: "8px 17px 10px 13px",
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
