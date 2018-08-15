import Account from './account.js';

function Saving({ plan, term, ...options }) {
  Account.call(this, options);

  this.plan = plan;
  this.term = term;
  this.RATE = 1.5;
}

Saving.prototype = Object.create(Account.prototype);
Saving.constructor = Saving;

Saving.prototype.setPlan = function(plan) {
  this.plan = plan;
};

Saving.prototype.getPlan = function() {
  return this.plan;
};

Saving.prototype.setTerm = function(term) {
  this.term = term;
};

Saving.prototype.getTerm = function() {
  let monthShape = 'месяцев';
  const term = parseFloat(this.term, 10);

  if (term === 1) {
    monthShape = 'месяц';
  } else if (term > 1 && term <= 3) {
    monthShape = 'месяца';
  }

  return term + ' ' + monthShape;
};

Saving.prototype[Symbol.iterator] = function() {
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
          return { value: { header: 'План', value: self.getPlan() } };
        case 7:
          return { value: { header: 'Срок', value: self.getTerm() } };
        default:
          return { done: true };
      }
    }
  };
  return iterator;
};

export default Saving;
