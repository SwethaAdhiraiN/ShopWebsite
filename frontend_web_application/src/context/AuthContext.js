import React, { createContext, useContext, useState } from "react";

// PUBLIC_INTERFACE
const AuthContext = createContext();

/**
 * Provides authentication state and methods for the application, including:
 * - Tracking if a user is logged in
 * - The current user object and user roles
 * - Stubbed login and logout functions (to be implemented)
 */
// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  // Holds the current authenticated user, or null if not logged in
  const [user, setUser] = useState(null);
  // Holds the user roles, default to []
  const [roles, setRoles] = useState([]);

  // Stub: Call REST API here in a real application
  // PUBLIC_INTERFACE
  const login = async (username, password) => {
    // Example: Replace with real API logic
    // setUser({ username, roles: ["user"] });
    // setRoles(["user"]);
    // return true;
    return false; // Not implemented
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    setUser(null);
    setRoles([]);
  };

  // PUBLIC_INTERFACE
  const isLoggedIn = !!user;

  // PUBLIC_INTERFACE
  const hasRole = (role) => roles.includes(role);

  return (
    <AuthContext.Provider
      value={{
        user,
        roles,
        isLoggedIn,
        login,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Returns the authentication context */
  return useContext(AuthContext);
}
