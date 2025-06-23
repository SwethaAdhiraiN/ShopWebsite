import React from 'react';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

import { PrivateRoute, PublicOnlyRoute } from './ProtectedRoutes';

/**
 * PUBLIC_INTERFACE
 * Route config: 
 * - Only guests can access /login and /register (redirect logged-in to /products)
 * - Only authenticated users can access shop, cart, orders, admin, or order-confirmation
 * - Home "/" is public but instantly redirects to /products if logged in (by component logic)
 */
const appRoutes = [
  // HOME is public (component does redirect), root entry for all
  { path: '/', element: <HomePage /> },

  // AUTH: Only public for NOT logged-in; redirect logged-in to store
  {
    path: '/login',
    element: (
      <PublicOnlyRoute>
        <LoginPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicOnlyRoute>
        <RegisterPage />
      </PublicOnlyRoute>
    ),
  },

  // PROTECTED ROUTES: shop pages only for authenticated users
  {
    path: '/products',
    element: (
      <PrivateRoute>
        <ProductListPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/products/:productId',
    element: (
      <PrivateRoute>
        <ProductDetailPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/cart',
    element: (
      <PrivateRoute>
        <CartPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/order-confirmation',
    element: (
      <PrivateRoute>
        <OrderConfirmationPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/orders',
    element: (
      <PrivateRoute>
        <OrdersPage />
      </PrivateRoute>
    ),
  },
  // ADMIN DASHBOARD: only authenticated (admin subpages handled inside dashboard)
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <AdminDashboardPage />
      </PrivateRoute>
    ),
  },
  // Fallback: could add 404/NotFound
];

export default appRoutes;
