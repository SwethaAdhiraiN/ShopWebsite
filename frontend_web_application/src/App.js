import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import appRoutes from './routes';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// PUBLIC_INTERFACE
function App() {
  /**
   * The app is wrapped with Router, AuthProvider, and CartProvider.
   * AuthProvider and CartProvider provide global auth and cart state.
   */
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main style={{ paddingTop: '72px' }}>
              <Routes>
                {appRoutes.map(({ path, element }, idx) => (
                  <Route key={path || idx} path={path} element={element} />
                ))}
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;