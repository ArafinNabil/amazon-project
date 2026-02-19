import {formtingCurrency } from '../scripts/utilies/money.js'

console.log('test suite: fromatCurrency')

console.log('converts centes into dollars')

if ( formtingCurrency(2095) === '20.95'){
  console.log('passed');
}
else {
  console.log('failed')
}