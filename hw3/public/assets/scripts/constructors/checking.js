import Account from './account.js';

function Сhecking({ bankName, pin, ...options }) {
  Account.call(this, options);
  this.bankName = bankName;
  this.pin = pin;
}

Сhecking.prototype = Object.create(Account.prototype);
Сhecking.constructor = Сhecking;

Сhecking.prototype.setBankName = function(bankName) {
  this.bankName = bankName;
};

Сhecking.prototype.getBankName = function() {
  return this.bankName;
};

Сhecking.prototype.setPin = function(pin) {
  this.pin = pin;
};

Сhecking.prototype.getPin = function() {
  return this.pin;
};

Сhecking.prototype[Symbol.iterator] = function() {
  let step = 0;
  const self = this;

  const iterator = {
    next() {
      if (step <= 7) step++;

      switch (step) {
        case 1:
          return { value: { header: 'Владелец', value: self.getOwner() } };
        case 2:
          return { value: { header: 'Тип', value: self.getType() } };
        case 3:
          return { value: { header: 'Валюта', value: self.getCurrency() } };
        case 4:
          return { value: { header: 'Баланс', value: self.getBalance() } };
        case 5:
          return { value: { header: 'Создан', value: self.getDate() } };
        case 6:
          return { value: { header: 'Банк', value: self.getBankName() } };
        case 7:
          return { value: { header: 'PIN', value: self.getPin() } };
        default:
          return { done: true };
      }
    }
  };
  return iterator;
};

export default Сhecking;
