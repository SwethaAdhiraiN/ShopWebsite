import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

/**
 * PRIVATE ROUTE - only allows access when logged in, otherwise redirects to login page
 * Usage: place <PrivateRoute> around routes needing authentication
 */
// PUBLIC_INTERFACE
export function PrivateRoute({ children, redirectTo = "/login" }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Not authenticated: redirect to login, remember where they wanted to go
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }
  return children ? children : <Outlet />;
}

/**
 * PUBLIC-ONLY ROUTE - only shows wrapped content if NOT authenticated, otherwise redirects to store
 * Usage: wrap login/register
 */
// PUBLIC_INTERFACE
export function PublicOnlyRoute({ children, redirectTo = "/products" }) {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }
  return children ? children : <Outlet />;
}
