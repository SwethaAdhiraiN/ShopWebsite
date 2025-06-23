import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import appRoutes from './routes';
import Navbar from './components/Navbar';

// PUBLIC_INTERFACE
function App() {
  /** The app is wrapped with Router and renders a Navbar and all routes. */
  return (
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
  );
}

export default App;