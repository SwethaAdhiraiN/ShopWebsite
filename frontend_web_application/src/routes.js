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

// PUBLIC_INTERFACE
const appRoutes = [
  // Home is public, but will redirect to /products if logged in (handled in component)
  { path: '/', element: <HomePage /> },

  // LOGIN & REGISTER: Only shown if NOT logged in
  {
    path: '/login',
    element: (
      <PublicOnlyRoute>
        <LoginPage />
      </PublicOnlyRoute>
    )
  },
  {
    path: '/register',
    element: (
      <PublicOnlyRoute>
        <RegisterPage />
      </PublicOnlyRoute>
    )
  },

  // PRODUCT LISTING (store), PRODUCT DETAIL, CART, ORDERS: Only for authenticated
  {
    path: '/products',
    element: (
      <PrivateRoute>
        <ProductListPage />
      </PrivateRoute>
    )
  },
  {
    path: '/products/:productId',
    element: (
      <PrivateRoute>
        <ProductDetailPage />
      </PrivateRoute>
    )
  },
  {
    path: '/cart',
    element: (
      <PrivateRoute>
        <CartPage />
      </PrivateRoute>
    )
  },
  {
    path: '/order-confirmation',
    element: (
      <PrivateRoute>
        <OrderConfirmationPage />
      </PrivateRoute>
    )
  },
  {
    path: '/orders',
    element: (
      <PrivateRoute>
        <OrdersPage />
      </PrivateRoute>
    )
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <AdminDashboardPage />
      </PrivateRoute>
    )
  },
];

export default appRoutes;
