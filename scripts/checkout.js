import { cart, removefromCart, updateQuantity, notifyCartQuantityChanged } from '../data/cart.js';
import { products } from '../data/products.js';
import { formtingCurrency } from './utilies/money.js';

let cartSummaryHtml = '';

// Generate checkout HTML
cart.forEach(cartItem => {
  const product = products.find(p => p.id === cartItem.productId);

  cartSummaryHtml += `
    <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
      <div class="delivery-date">Delivery date: Wednesday, June 15</div>
      <div class="cart-item-details-grid">
        <img class="product-image" src="${product.image}">
        <div class="cart-item-details">
          <div class="product-name">${product.name}</div>
          <div class="product-price">$${formtingCurrency(product.priceCents)}</div>
          <div class="product-quantity">
            <span>Quantity: <span class="quantity-label js-quantity-label-${cartItem.productId}">${cartItem.quantity}</span></span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${cartItem.productId}">Update</span>
            <input class="quantity-input js-quantity-input-${cartItem.productId}" type="number" min="0">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${cartItem.productId}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${cartItem.productId}">Delete</span>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;
notifyCartQuantityChanged();

// Delete item
document.querySelectorAll('.js-delete-quantity-link').forEach(link => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removefromCart(productId);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    notifyCartQuantityChanged();
  });
});

// Enter edit mode
document.querySelectorAll('.js-update-quantity-link').forEach(link => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
  });
});

// Save updated quantity
document.querySelectorAll('.js-save-link').forEach(link => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    const newQuantity = Number(quantityInput.value);

    if (newQuantity < 0 || newQuantity >= 1000) {
      alert('Quantity must be between 0 and 999');
      return;
    }

    if (newQuantity === 0) {
      removefromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      notifyCartQuantityChanged();
      return;
    }

    updateQuantity(productId, newQuantity);
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
    notifyCartQuantityChanged();
  });
});
