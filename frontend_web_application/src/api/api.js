//
// Centralized API layer with mock implementations for authentication, products, orders, and admin CRUD.
//

// Simple in-memory mock "database" objects for demo/mock mode (will be replaced by REST API later)
const mockUsers = [
  { id: 1, username: "admin", password: "admin123", roles: ["admin"] },
  { id: 2, username: "user", password: "user123", roles: ["user"] },
];

let lastProductId = 4;
let mockProducts = [
  { id: 1, name: "Product A", price: 29.99, image: null, description: "Short description for Product A" },
  { id: 2, name: "Product B", price: 39.99, image: null, description: "Short description for Product B" },
  { id: 3, name: "Product C", price: 14.95, image: null, description: "Short description for Product C" },
  { id: 4, name: "Product D", price: 49.99, image: null, description: "Short description for Product D" },
];

// In-memory orders
let lastOrderId = 1001;
let mockOrders = [];

// --- AUTH ---

// PUBLIC_INTERFACE
export async function login(username, password) {
  /**
   * Attempts login with mock credentials. Returns: { success: boolean, user, roles, error }
   */
  await simulateNetworkDelay();
  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    // Copy object, never return password
    return {
      success: true,
      user: { id: user.id, username: user.username, roles: user.roles },
      roles: user.roles,
    };
  }
  return { success: false, error: "Invalid credentials" };
}

// PUBLIC_INTERFACE
export async function register(username, password) {
  /**
   * Registers a new mock user if username not taken. Returns { success, user, error }
   */
  await simulateNetworkDelay();
  if (mockUsers.some((u) => u.username === username)) {
    return { success: false, error: "Username already exists" };
  }
  const newUser = {
    id: mockUsers.length + 1,
    username,
    password,
    roles: ["user"],
  };
  mockUsers.push(newUser);
  return {
    success: true,
    user: { id: newUser.id, username: newUser.username, roles: newUser.roles },
    roles: newUser.roles,
  };
}

// --- PRODUCTS ---

// PUBLIC_INTERFACE
export async function fetchProducts() {
  /**
   * Returns array of all mock products.
   */
  await simulateNetworkDelay();
  return mockProducts;
}

// PUBLIC_INTERFACE
export async function fetchProductDetail(productId) {
  /**
   * Fetches single product by id.
   */
  await simulateNetworkDelay();
  return mockProducts.find((p) => `${p.id}` === `${productId}`) || null;
}

// --- ORDERS ---

// PUBLIC_INTERFACE
export async function createOrder(orderData) {
  /**
   * Places a new mock order (orderData: { items, userId, ... })
   * Returns { success, order }
   */
  await simulateNetworkDelay();
  const order = {
    id: lastOrderId++,
    ...orderData,
    createdAt: new Date().toISOString(),
  };
  mockOrders.push(order);
  return { success: true, order };
}

// --- ADMIN CRUD (products) ---

// PUBLIC_INTERFACE
export async function adminListProducts() {
  /**
   * Returns all products (same as fetchProducts for mock).
   */
  await simulateNetworkDelay();
  return mockProducts;
}

// PUBLIC_INTERFACE
export async function adminCreateProduct(product) {
  /**
   * Adds a new product. Returns created object.
   */
  await simulateNetworkDelay();
  const newProd = { ...product, id: ++lastProductId };
  mockProducts.push(newProd);
  return newProd;
}

// PUBLIC_INTERFACE
export async function adminUpdateProduct(id, updates) {
  /**
   * Updates product by id.
   */
  await simulateNetworkDelay();
  const idx = mockProducts.findIndex((p) => `${p.id}` === `${id}`);
  if (idx === -1) return null;
  mockProducts[idx] = { ...mockProducts[idx], ...updates };
  return mockProducts[idx];
}

// PUBLIC_INTERFACE
export async function adminDeleteProduct(id) {
  /**
   * Deletes product by id.
   */
  await simulateNetworkDelay();
  const idx = mockProducts.findIndex((p) => `${p.id}` === `${id}`);
  if (idx === -1) return false;
  mockProducts.splice(idx, 1);
  return true;
}

// --- Utility (simulate network) ---
function simulateNetworkDelay(ms = 350) {
  return new Promise((res) => setTimeout(res, ms));
}
