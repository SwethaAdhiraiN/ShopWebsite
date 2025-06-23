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
          padding: 22,
          border: "1px solid var(--border-color)",
          borderRadius: 8,
          background: "#232e46",
        }}
      >
        {/* When API is available, CRUD table will appear here */}
        <div style={{ color: "#bbb", fontSize: "1.07rem" }}>
          User management API not yet implemented.<br/>
          UI ready for integration with API when available.
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
