import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { login as apiLogin, register as apiRegister } from "../api/api";

// PUBLIC_INTERFACE
const AuthContext = createContext();

/**
 * Provides authentication state and methods for the application, including:
 * - Tracking if a user is logged in
 * - The current user object and user roles
 * - Login/register/logout with persistence (localStorage).
 */
// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  // Holds the current authenticated user, or null if not logged in
  const [user, setUser] = useState(
    () => JSON.parse(window.localStorage.getItem("authUser") || "null")
  );
  // Holds the user roles, default to []
  const [roles, setRoles] = useState(
    () => JSON.parse(window.localStorage.getItem("authRoles") || "[]")
  );

  // PUBLIC_INTERFACE
  const login = useCallback(async (username, password) => {
    const result = await apiLogin(username, password);
    if (result.success) {
      setUser(result.user);
      setRoles(result.roles || []);
      window.localStorage.setItem("authUser", JSON.stringify(result.user));
      window.localStorage.setItem("authRoles", JSON.stringify(result.roles || []));
      return { success: true, user: result.user, roles: result.roles };
    }
    logout();
    return { success: false, error: result.error };
  }, []);

  // PUBLIC_INTERFACE
  const tryRegister = useCallback(async (username, password) => {
    const result = await apiRegister(username, password);
    if (result.success) {
      setUser(result.user);
      setRoles(result.roles || []);
      window.localStorage.setItem("authUser", JSON.stringify(result.user));
      window.localStorage.setItem("authRoles", JSON.stringify(result.roles || []));
      return { success: true, user: result.user, roles: result.roles };
    }
    // Don't clear login on failed register
    return { success: false, error: result.error };
  }, []);

  // PUBLIC_INTERFACE
  const logout = useCallback(() => {
    setUser(null);
    setRoles([]);
    window.localStorage.removeItem("authUser");
    window.localStorage.removeItem("authRoles");
  }, []);

  // PUBLIC_INTERFACE
  const isLoggedIn = !!user;

  // PUBLIC_INTERFACE
  const hasRole = (role) => roles?.includes(role);

  // Keep localStorage in sync if user is changed from other tab (optional)
  useEffect(() => {
    function syncAuthStates(e) {
      if (e.key === "authUser") {
        setUser(JSON.parse(e.newValue || "null"));
      }
      if (e.key === "authRoles") {
        setRoles(JSON.parse(e.newValue || "[]"));
      }
    }
    window.addEventListener("storage", syncAuthStates);
    return () => window.removeEventListener("storage", syncAuthStates);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        roles,
        isLoggedIn,
        login,
        tryRegister,
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
