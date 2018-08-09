var Account = function (options) {
  this.id = options.id;
  this.owner = options.owner;
  this.type = options.type;
  this.currency = options.currency;
  this.balance = parseFloat(options.balance) || 0;
  this._created = options.created || new Date();
};

Account.createAccount = function (account) {
  if (account.type === 'Расчетный') {
    return new Сhecking(account);
  } else {
    return new Saving(account);
  }
};

Account.getAccounts = function (cb, id) {
  var xhr = new XMLHttpRequest();
  var url = id ? '/accounts/' + id : '/accounts';

  xhr.open('GET', url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var result = JSON.parse(xhr.responseText);

      if (cb && typeof cb === 'function') {
        cb(result);
      }
    }
  };

  xhr.send();
};

Account.deleteAccount = function (id) {
  var xhr = new XMLHttpRequest();

  xhr.open('DELETE', '/accounts/' + id, true);

  xhr.onreadystatechange = function () {
    window.location.reload();
  };

  xhr.send();
};

Account.addAccount = function (newAccount) {
  var xhr = new XMLHttpRequest();

  newAccount = JSON.stringify(newAccount);
  xhr.open('POST', '/accounts', true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

  xhr.upload.onload = function () {
    window.location.href = '/';
  };

  xhr.send(newAccount);
};

Account.updateAccount = function (updatedAccount, id) {
  var xhr = new XMLHttpRequest();

  updatedAccount = JSON.stringify(updatedAccount);
  xhr.open('PUT', '/accounts/' + id, true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

  xhr.upload.onload = function () {
    window.location.href = '/';
  };

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
  return this.owner.lastname + ' ' + this.owner.firstname;
};

Account.prototype.setBalance = function (amount) {
  this.balance += parseFloat(amount, 10);
};

Account.prototype.getBalance = function () {
  return this.balance;
};




function Сhecking(options) {
  Account.call(this, options);
  this.bankName = options.bankName;
  this.pin = options.pin;
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



function Saving(options) {
  Account.call(this, options);

  this.plan = options.plan;
  this.term = options.term;
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
  var monthShape = 'месяцев';
  var term = parseFloat(this.term, 10);

  if (term === 1) {
    monthShape = 'месяц';
  } else if (term > 1 && term <= 3) {
    monthShape = 'месяца';
  }

  return term + ' ' + monthShape;
};