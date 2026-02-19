import { addToCart, cart} from "../../data/cart.js";

describe('test suite: add to cart', () => {
  it('adds existing product to cart', () => {
    
  });
  it('adds new product to cart', () => {
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1)
  });
});