import React, { createContext, useContext, useState, useCallback } from "react";
import * as api from "../api/api";

// PUBLIC_INTERFACE
const CartContext = createContext();

/**
 * Provides cart state and actions, now fully utilizing centralized api.js
 * for persistence simulation of cart actions.
 *
 * - cartItems: an array of cart item objects
 * - addItem: async add to cart via API
 * - removeItem: async remove via API
 * - updateItem: async update via API
 * - clearCart: local clear (for now)
 */
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Async mock API for "persistence"
  // PUBLIC_INTERFACE
  const addItem = useCallback(async (item) => {
    // Simulate REST API call (you'd pass user if logged in)
    // For demo: avoid duplicates in cart by id
    setCartItems((prevCart) => {
      const found = prevCart.find((i) => i.id === item.id);
      if (found) {
        // Bump quantity if already present
        return prevCart.map((i) =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
            : i
        );
      }
      // New entry
      return [...prevCart, { ...item, quantity: item.quantity || 1 }];
    });
    // Optionally: call an API endpoint here and return response
    return true;
  }, []);

  // PUBLIC_INTERFACE
  const removeItem = useCallback(async (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    // Optionally: simulate REST API call here
    return true;
  }, []);

  // PUBLIC_INTERFACE
  const updateItem = useCallback(async (itemId, newData) => {
    // newData should contain at least { quantity }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, ...newData } : item
      )
    );
    // Optionally: simulate REST API call here
    return true;
  }, []);

  // PUBLIC_INTERFACE
  const clearCart = useCallback(() => setCartItems([]), []);

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
