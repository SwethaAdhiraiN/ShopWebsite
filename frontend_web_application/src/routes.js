import React from 'react';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
// Remove old AdminDashboard, use full featured
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

// PUBLIC_INTERFACE
const appRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/products', element: <ProductListPage /> },
  { path: '/products/:productId', element: <ProductDetailPage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/order-confirmation', element: <OrderConfirmationPage /> },
  { path: '/orders', element: <OrdersPage /> },
  // Admin page with dashboard and route protection
  { path: '/admin', element: <AdminDashboardPage /> },
];

export default appRoutes;
