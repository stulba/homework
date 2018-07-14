window.onload = function() {
  // Just helpers for testing purposes
  const app = {
    renderAccounts: function() {},
    putInStorage: function(itemName, key) {
      localStorage.setItem(key, JSON.stringify(itemName));
    },
    getFromStorage: function(itemName) {
      return JSON.parse(localStorage.getItem(itemName));
    },
    getCurrentLocation: function() {
      const loc = window.location.pathname;
      const lastSlashIndex = loc.lastIndexOf('/');
      return loc.substring(lastSlashIndex);
    }
  };

  if (app.getCurrentLocation() === '/index.html') {
    document.querySelector('.js-button-delete').onclick = function() {
      confirm('Вы уверены, что хотите удалить счет?');
    };
  }

  if (app.getCurrentLocation() === '/form.html') {
    const form = document.querySelector('.js-form');
    const section = document.querySelector('.js-form-section');
    const typeSelector = form.commonType;

    typeSelector.onchange = function() {
      if (typeSelector.value === 'накопительный') {
        section.classList.add('is-active');
        section.lastElementChild.textContent = Saving.getRate() + '%';
      } else {
        section.classList.remove('is-active');
      }
    };

    form.onsubmit = function(e) {
      e.preventDefault();

      let account = {
        commonType: this.commonType.value,
        term: this.term.value,
        title: this.title.value,
        currency: this.currency.value
      };

      switch (account.commonType) {
      case 'расчетный':
        new Сhecking(account);
        break;

      case 'накопительный':
        new Saving(account);
        break;

      default:
        break;
      }

      form.reset();
    };
  }

  const User = function(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.accounts = null;
  };

  const activeUser = new User("Siarhei", "Stulba"); // eslint-disable-line

  function Account(data) {
    this.id = Account.id++;
    this.commonType = data.commonType;
    this.title = data.title;
    this.balance = 0;
    this.currency = data.currency;
    this.incomingTransfers = [];
    this.outgoingTransfers = [];
    this.created = new Date();
    this.isActive = true;

    Account.addAccount(this);
  }

  Account.id = 0;
  Account.accounts = [];

  Account.getCount = function() {
    return this.accounts.length;
  };

  Account.addAccount = function(newAccount) {
    this.accounts.push(newAccount);
  };

  Account.getAccount = function(id) {
    return this.accounts.find(account => account.id === id);
  };

  Account.getAccounts = function() {
    return this.accounts;
  };

  Account.updateAccount = function(nextAccount, id) {
    const prevAccountIndex = this.accounts.findIndex(
      account => account.id === id
    );
    const prevAccount = this.accounts.find(account => account.id === id);

    this.accounts.splice(
      prevAccountIndex,
      1,
      Object.assign(prevAccount, nextAccount)
    );
  };

  Account.deleteAccount = function(id) {
    this.accounts = this.accounts.filter(account => account.id !== id);
  };

  Account.formatDate = function(date) {
    return (
      date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    );
  };

  // Common Methods
  Account.prototype.makeIncomingTrans = function(amount) {
    return this.balance + amount;
  };

  Account.prototype.makeOutgoingTrans = function(amount) {
    return this.balance - amount;
  };

  Account.prototype.getIncomingTrans = function() {
    return this.incomingTransfers;
  };

  Account.prototype.getOutgoingTrans = function() {
    return this.outgoingTransfers;
  };

  Account.prototype.getState = function() {
    return this.isActive;
  };

  function Сhecking(data) {
    Account.call(this, data);
    this.rate = Сhecking.RATE;
  }

  Сhecking.RATE = 0.3;

  Сhecking.getRate = function() {
    return this.RATE;
  };

  Сhecking.prototype = Object.create(Account.prototype);

  function Saving(data) {
    Account.call(this, data);
    this.rate = Saving.RATE;
    this.term = data.term;
  }

  Saving.RATE = 5;

  Saving.getRate = function() {
    return Saving.RATE;
  };

  Saving.prototype = Object.create(Account.prototype);
};
