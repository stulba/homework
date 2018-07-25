const Account = function ({
  id,
  owner,
  type,
  currency,
  balance,
  created
} = {}) {
  this.id = id;
  this.owner = owner;
  this.type = type;
  this.currency = currency;
  this.balance = parseFloat(balance) || 0;
  this._created = created || new Date();
};

Account.createAccount = function (account) {
  if (account.type === 'Расчетный') {
    return new Сhecking(account);
  } else {
    return new Saving(account);
  }
};

Account.getAccounts = function (cb, id) {
  const xhr = new XMLHttpRequest();
  let url = id ? '/accounts/' + id : '/accounts';

  xhr.open('GET', url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);

      if (cb && typeof cb === 'function') {
        cb(result);
      }
    }
  };

  xhr.send();
};

Account.deleteAccount = function (id) {
  const xhr = new XMLHttpRequest();

  xhr.open('DELETE', '/accounts/' + id, true);

  xhr.onreadystatechange = () => window.location.reload();

  xhr.send();
};

Account.addAccount = function (newAccount) {
  const xhr = new XMLHttpRequest();

  newAccount = JSON.stringify(newAccount);
  xhr.open('POST', '/accounts', true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

  xhr.upload.onload = () => window.location.href = '/';

  xhr.send(newAccount);
};

Account.updateAccount = function (updatedAccount, id) {
  const xhr = new XMLHttpRequest();

  updatedAccount = JSON.stringify(updatedAccount);
  xhr.open('PUT', '/accounts/' + id, true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

  xhr.upload.onload = () => window.location.href = '/';

  xhr.send(updatedAccount);
};

Account.prototype.setId = function (id) {
  this.id = id;
};

Account.prototype.getId = function () {
  return this.id;
};

Account.prototype.setType = function (type) {
  this.type = type;
};

Account.prototype.getType = function () {
  return this.type;
};

Account.prototype.setCurrency = function (currency) {
  this.currency = currency;
};

Account.prototype.getCurrency = function () {
  return this.currency;
};

Account.prototype.getDate = function () {
  return new Date(this._created).toLocaleDateString();
};


Account.prototype.setOwner = function (owner) {
  this.owner = owner;
};

Account.prototype.getOwner = function () {
  const {
    firstname,
    lastname
  } = this.owner;
  return lastname + ' ' + firstname;
};

Account.prototype.setBalance = function (amount) {
  this.balance += parseFloat(amount, 10);
};

Account.prototype.getBalance = function () {
  return this.balance;
};




function Сhecking({
  bankName,
  pin,
  ...options
}) {
  Account.call(this, options);
  this.bankName = bankName;
  this.pin = pin;
}

Сhecking.prototype = Object.create(Account.prototype);
Сhecking.constructor = Сhecking;


Сhecking.prototype.setBankName = function (bankName) {
  this.bankName = bankName;
};

Сhecking.prototype.getBankName = function () {
  return this.bankName;
};

Сhecking.prototype.setPin = function (pin) {
  this.pin = pin;
};

Сhecking.prototype.getPin = function () {
  return this.pin;
};



function Saving({
  plan,
  term,
  ...options
}) {
  Account.call(this, options);

  this.plan = plan;
  this.term = term;
  this.RATE = 1.5;
}

Saving.prototype = Object.create(Account.prototype);
Saving.constructor = Saving;

Saving.prototype.setPlan = function (plan) {
  this.plan = plan;
};

Saving.prototype.getPlan = function () {
  return this.plan;
};

Saving.prototype.setTerm = function (term) {
  this.term = term;
};

Saving.prototype.getTerm = function () {
  let monthShape = 'месяцев';
  const term = parseFloat(this.term, 10);

  if (term === 1) {
    monthShape = 'месяц';
  } else if (term > 1 && term <= 3) {
    monthShape = 'месяца';
  }

  return term + ' ' + monthShape;
};