import React from "react";

// PUBLIC_INTERFACE
function UserManagement() {
  /**
   * Admin panel for managing users.
   * When API is available, will fetch users and enable user CRUD.
   * Currently displays placeholder (API not yet implemented).
   */
  // For future: import { adminListUsers, adminCreateUser, adminUpdateUser, adminDeleteUser } from "../../api/api";
  // When mock API supports it, implement CRUD

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
          padding: "48px 36px",
          border: "2px solid var(--border-color)",
          borderRadius: 16,
          margin: "0 auto",
          background: "var(--surface-color)",
          maxWidth: 520,
          marginTop: 16,
          boxShadow: "0 7px 36px 0 #8b5cf642, 0 2px 14px 0 #d4af3741",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* When API is available, CRUD table will appear here */}
        <div style={{
          color: "var(--text-secondary)",
          fontSize: "1.07rem",
          textAlign: "center",
        }}>
          User management API not yet implemented.<br/>
          UI ready for integration with API when available.
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
