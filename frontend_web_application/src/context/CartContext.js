import React, { createContext, useContext, useState } from "react";

// PUBLIC_INTERFACE
const CartContext = createContext();

/**
 * Provides cart state and actions:
 * - cartItems: an array of cart item objects
 * - addItem: function to add an item to the cart
 * - removeItem: function to remove an item by id
 * - updateItem: function to update item quantity or data
 */
// PUBLIC_INTERFACE
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // PUBLIC_INTERFACE
  const addItem = (item) => {
    // Stub: Add item logic (real logic may check for existing)
    setCartItems((prev) => [...prev, item]);
  };

  // PUBLIC_INTERFACE
  const removeItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // PUBLIC_INTERFACE
  const updateItem = (itemId, newData) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, ...newData } : item
      )
    );
  };

  // PUBLIC_INTERFACE
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useCart() {
  /** Returns the cart context */
  return useContext(CartContext);
}
