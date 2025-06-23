import React from "react";

// PUBLIC_INTERFACE
function UserManagement() {
  /**
   * Admin panel for managing users.
   * Placeholder for CRUD/role management (future).
   */
  return (
    <div>
      <h3 style={{ marginTop: 0, color: "var(--base-light)", marginBottom: 10 }}>
        User Management
      </h3>
      <div style={{ color: "var(--text-secondary)", fontSize: "1.08rem", marginBottom: 16 }}>
        View, edit, and manage user accounts. (Role assignment and blocking coming soon.)
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
            Add User
          </button>
          <button className="btn" disabled>
            Bulk Permissions
          </button>
        </div>
        <div style={{ color: "#bbb", fontSize: "1.02rem" }}>
          User list, search, and editing tools go here.
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
