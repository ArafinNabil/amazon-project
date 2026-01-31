import { addToCart, notifyCartQuantityChanged } from '../data/cart.js';
import { products } from '../data/products.js';
import { formtingCurrency } from './utilies/money.js';

let productsHtml = '';

// Generate product cards
products.forEach(product => {
  productsHtml += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>
      <div class="product-name limit-text-to-2-lines">${product.name}</div>
      <div class="product-rating-container">
        <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">${product.rating.count}</div>
      </div>
      <div class="product-price">$${formtingCurrency(product.priceCents)}</div>
      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          ${Array.from({ length: 10 }, (_, i) => `<option value="${i+1}">${i+1}</option>`).join('')}
        </select>
      </div>
      <div class="product-spacer"></div>
      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png"> Added
      </div>
      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHtml;

// Added-to-cart message logic
const addedMessageTimeouts = {};
function showAddedMessage(productId) {
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  if (!addedMessage) return;

  addedMessage.classList.add('added-to-cart-display');
  if (addedMessageTimeouts[productId]) clearTimeout(addedMessageTimeouts[productId]);

  addedMessageTimeouts[productId] = setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-display');
  }, 1000);
}

// Add-to-cart button
document.querySelectorAll('.js-add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    addToCart(productId, quantity);
    notifyCartQuantityChanged();
    showAddedMessage(productId);
  });
});

// Initial cart icon update
notifyCartQuantityChanged();
