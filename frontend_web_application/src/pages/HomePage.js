import React from 'react';

// PUBLIC_INTERFACE
function HomePage() {
  /** Home page for the shop website. */
  return (
    <div className="container">
      <div className="hero">
        <div className="subtitle">Welcome to ShopWebsite</div>
        <h1 className="title">Your one-stop online shop</h1>
        <div className="description">
          Browse our products, add to cart, and place orders with ease!
        </div>
      </div>
    </div>
  );
}

export default HomePage;
