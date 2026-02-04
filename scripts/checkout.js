import { cart, removefromCart, updateQuantity, notifyCartQuantityChanged, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import { formtingCurrency } from './utilies/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


import { deliveryOptions } from './deliveryOptions.js';


let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  })

const deliveryOptionsId = Number(cartItem.deliveryOptionsId);

let selectedDeliveryOption = deliveryOptions[0];

deliveryOptions.forEach(option => {
  if (option.id === deliveryOptionsId) {
    selectedDeliveryOption = option;
  }
});


  const today = dayjs();
  const deliveryDate = today.add(selectedDeliveryOption.deliveryDays, 'day');
  const dateString = deliveryDate.format('dddd, MMMM D');


  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">${matchingProduct.name}</div>
          <div class="product-price">$${formtingCurrency(matchingProduct.priceCents)}</div>

          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>

            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">Update</span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">Delete</span>

            <input type="number" min="0" max="999" class="quantity-input js-quantity-input-${matchingProduct.id}" value="${cartItem.quantity}">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
          Choose a delivery option:
        </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach(option => {
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, 'day');
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = option.priceCents === 0
      ? 'FREE'
      : `$${formtingCurrency(option.priceCents)}`;

    const selectedId = Number(cartItem.deliveryOptionsId)
    const isChecked = option.id === selectedId;


html += `
  <div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${option.id}">
    
    <input type="radio"
      ${isChecked ? 'checked' : ''}
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
      
    <div>
      <div class="delivery-option-date">${dateString}</div>
      <div class="delivery-option-price">${priceString} - Shipping</div>
    </div>
  </div>
`;

  });

  return html;
}


document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
notifyCartQuantityChanged();

// Delete item
document.querySelectorAll('.js-delete-quantity-link').forEach(link => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removefromCart(productId);
    const el = document.querySelector(`.js-cart-item-container-${productId}`);
    if (el) el.remove();
    notifyCartQuantityChanged();
  });
});

// Enter edit mode
document.querySelectorAll('.js-update-quantity-link').forEach(link => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    if (container) container.classList.toggle('is-editing-quantity');
  });
});

// Save updated quantity
document.querySelectorAll('.js-save-link').forEach(link => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    if (!quantityInput) return;
    const newQuantity = Number(quantityInput.value);

    if (newQuantity < 0 || newQuantity >= 1000 || Number.isNaN(newQuantity)) {
      alert('Quantity must be between 0 and 999');
      return;
    }

    if (newQuantity === 0) {
      removefromCart(productId);
      const el = document.querySelector(`.js-cart-item-container-${productId}`);
      if (el) el.remove();
      notifyCartQuantityChanged();
      return;
    }

    updateQuantity(productId, newQuantity);
    const label = document.querySelector(`.js-quantity-label-${productId}`);
    if (label) label.innerHTML = newQuantity;
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    if (container) container.classList.remove('is-editing-quantity');
    notifyCartQuantityChanged();
  });
});

document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = Number(element.dataset.deliveryOptionId);

      updateDeliveryOption(productId, deliveryOptionId);
    });
  });
