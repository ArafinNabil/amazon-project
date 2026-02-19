import { formtingCurrency } from '../../scripts/utilies/money.js';

describe('test suite: formtingCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formtingCurrency(2095)).toEqual('20.95');
  });
  it('works with 0', () => {
    expect(formtingCurrency(0)).toEqual('0.00');
  });
  it('round up to nearest cent', () => {
    expect(formtingCurrency(2000.5)).toEqual('20.01');
  });
});
