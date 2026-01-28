import { cart, removefromCart,calculateCartQuantity } from '../data/cart.js'
import { products } from '../data/products.js';
import { formtingCurrency } from './utilies/money.js';

let cartSummaryHtml = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if(product.id === productId) {
      matchingProduct = product;
    }
  });

cartSummaryHtml += `
  <div class="cart-item-container 
  js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Wednesday, June 15
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-deatails">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formtingCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link js-update-quantity-link link-primary"
            data-product-id="${matchingProduct.id}">
            Update
          </span>

          <input class="quantity-input">
          <span class="save-quantity-link">
            save
          </span>
          
          <span class="delete-quantity-link link-primary js-delete-quantity-link"
            data-product-id="${matchingProduct.id}">
            Delete
          </span>
          
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>

        <div class="delivery-option">
          <input type="radio" class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" checked class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
});


document.querySelector('.js-order-summary')
   .innerHTML = cartSummaryHtml;

document.querySelectorAll('.js-delete-quantity-link')
 .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removefromCart(productId);
      console.log(cart);

     let container = document.querySelector(`.js-cart-item-container-${productId}`)
     container.remove();
     // removes count checkout items
     updateCheckoutQuantity();
    });
 });

//  update the check out quantity in cart page
export function updateCheckoutQuantity() {
  const cartQuantity = calculateCartQuantity()

  let showTotal = document.querySelector('.js-return-to-home-link');
  showTotal.innerHTML = `${cartQuantity} items`;
};

updateCheckoutQuantity();

let updateElem = document.querySelectorAll('.js-update-quantity-link') 
updateElem.forEach((item) => {
  item.addEventListener('click',() => {
    const productId = item.dataset.productId;
    console.log(productId)
  });
})
