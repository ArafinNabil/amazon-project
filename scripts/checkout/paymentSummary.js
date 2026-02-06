import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from '../deliveryOptions.js';
import { formtingCurrency } from "../utilies/money.js";

export function renderPaymentSummary() {

  let productPriceCentes = 0;
  let shippingPriceCents = 0;

 
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCentes += product.priceCents * cartItem.quantity;

    const deliveryOptions = getDeliveryOption(cartItem.deliveryOptionsId);
    shippingPriceCents += deliveryOptions.priceCents 
  });

  const totalBeforeTaxCents = productPriceCentes + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents

  const paymentSummaryHTML = `
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${formtingCurrency(productPriceCentes)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formtingCurrency(shippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formtingCurrency(totalBeforeTaxCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formtingCurrency(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formtingCurrency(totalCents)}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
  `;

  document.querySelector('.js-payment-summary')
   .innerHTML = paymentSummaryHTML;
}
