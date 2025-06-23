import React from 'react';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import AdminDashboard from './pages/AdminDashboard';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

// PUBLIC_INTERFACE
const appRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  // Use our custom ProductListPage for /products (removing old stub)
  { path: '/products', element: <ProductListPage /> },
  // Param route for viewing single product
  { path: '/products/:productId', element: <ProductDetailPage /> },
  { path: '/cart', element: <CartPage /> },
  // Order confirmation route -- show after successful order placement
  { path: '/order-confirmation', element: <OrderConfirmationPage /> },
  { path: '/orders', element: <OrdersPage /> },
  { path: '/admin', element: <AdminDashboard /> },
];

export default appRoutes;
