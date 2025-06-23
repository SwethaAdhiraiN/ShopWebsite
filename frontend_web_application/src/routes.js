import React from 'react';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import AdminDashboard from './pages/AdminDashboard';

// PUBLIC_INTERFACE
const appRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/orders', element: <OrdersPage /> },
  { path: '/admin', element: <AdminDashboard /> }
];

export default appRoutes;
