// ==============================
// Load cart from localStorage
// ==============================
export let cart = JSON.parse(localStorage.getItem('cart')) || [];

if (cart.length === 0) {
  cart = [
    { productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 2 },
    { productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 2 }
  ];
  saveToStorage();
}

// ==============================
// Save cart to localStorage
// ==============================
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// ==============================
// Add item to cart
// ==============================
export function addToCart(productId, quantity) {
  const matchingItem = cart.find(item => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  saveToStorage();
}

// ==============================
// Remove item from cart
// ==============================
export function removefromCart(productId) {
  const index = cart.findIndex(item => item.productId === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    saveToStorage();
  }
}

// ==============================
// Update item quantity
// ==============================
export function updateQuantity(productId, newQuantity) {
  const matchingItem = cart.find(item => item.productId === productId);
  if (matchingItem) {
    matchingItem.quantity = newQuantity;
    saveToStorage();
  }
}

// ==============================
// Calculate total quantity
// ==============================
export function calculateCartQuantity() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// ==============================
// Update cart quantity UI on pages
// ==============================
export function notifyCartQuantityChanged() {
  const cartQuantity = calculateCartQuantity();

  // Amazon page cart icon
  const cartIcon = document.querySelector('.js-cart-quantity');
  if (cartIcon) cartIcon.innerHTML = cartQuantity;

  // Checkout page top bar
  const checkoutHeader = document.querySelector('.js-return-to-home-link');
  if (checkoutHeader) checkoutHeader.innerHTML = `${cartQuantity} items`;
}
