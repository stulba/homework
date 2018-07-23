window.onload = function () {
  // Account
  const Account = function (options) {
    this.id = options.id;
    this.owner = options.owner;
    this.type = options.type;
    this.currency = options.currency || 'BYN';
    this.balance = options.balance || 0;
    this.created = new Date();
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

    if (id) {
      xhr.open('GET', '/accounts/' + id, true);
    } else {
      xhr.open('GET', '/accounts', true);
    }

    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const result = JSON.parse(xhr.responseText);

        if (cb && typeof cb === 'function') {
          cb(result);
        }
      }
    };
  };

  Account.deleteAccount = function (id) {
    var xhr = new XMLHttpRequest();

    xhr.open('DELETE', '/accounts/' + id, true);
    xhr.send();
  };

  Account.addAccount = function (newAccount) {
    var xhr = new XMLHttpRequest();

    newAccount = JSON.stringify(newAccount);

    xhr.open('POST', '/accounts', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.upload.onload = goToHomePage;

    xhr.send(newAccount);
  };

  Account.updateAccount = function (updatedAccount, id) {
    var xhr = new XMLHttpRequest();

    updatedAccount = JSON.stringify(updatedAccount);

    xhr.open('PUT', '/accounts/' + id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.upload.onload = goToHomePage;

    xhr.send(updatedAccount);
  };

  Account.prototype.getCurrency = function () {
    return this.balance + ' ' + this.currency;
  };

  Account.prototype.getDate = function () {
    return this.created.toLocaleDateString();
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


  // Checking account
  function Сhecking(options) {
    Account.call(this, options);
    this.bankName = options.bankName;
    this.pin = options.pin;
  }

  Сhecking.prototype = Object.create(Account.prototype);
  Сhecking.constructor = Сhecking;


  // Saving account
  function Saving(options) {
    Account.call(this, options);

    this.plan = options.plan;
    this.term = options.term;
    this.RATE = 1.5;
  }

  Saving.prototype = Object.create(Account.prototype);
  Saving.constructor = Saving;

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

  var currentPage = getCurrentLocation();

  // If we on index page
  if (currentPage === '') {
    Account.getAccounts(renderAccounts);
  }

  // If we on create page
  if (currentPage === 'create.html') {
    var form = document.querySelector('.js-form');
    var checkingFields = document.querySelectorAll('.checking__fields input');
    var savingFields = document.querySelectorAll('.saving__fields select, .saving__fields input');

    // Handle fields visability and state logic
    form.type.onchange = function () {
      if (form.type.value === 'Накопительный') {
        form.className = 'form form--saving';
        swapFieldsState(savingFields, checkingFields);
      } else if (form.type.value === 'Расчетный') {
        swapFieldsState(checkingFields, savingFields);
        form.className = 'form form--checking';
      } else {
        form.className = 'form';
      }
    };

    form.onsubmit = function (e) {
      e.preventDefault();

      // Create Account with common props
      var account = Account.createAccount({
        owner: {
          firstname: this.firstname.value,
          lastname: this.lastname.value
        },
        type: this.type.value,
        currency: this.currency.value
      });

      // Adding specific fields for every type of Account
      if (account.type === 'Расчетный') {
        account.bankName = this.bankName.value;
        account.pin = this.pin.value;
      } else {
        account.plan = this.plan.value;
        account.term = this.term.value;
        account.balance = this.deposit.value;
      }

      Account.addAccount(account);
    };
  }

  // If we on info page
  if (currentPage === 'account.html') {
    var id = localStorage.getItem('accountId');
    Account.getAccounts(renderAccount, id);
  }

  function renderAccount(account) {
    var table = document.querySelector('.js-table');
    var html = gatherAccountHtml(account);

    table.innerHTML = html;
  }

  function gatherAccountHtml(account) {
    account = Account.createAccount(account);

    var html = '<tr>' +
      '<th>Владелец</th>' +
      '<td>' + account.getOwner() + '</td>' +
      '</tr>' +
      '<tr>' +
      '<th>Тип счета</th>' +
      '<td>' + account.type + '</td>' +
      '</tr>' +
      '<tr>' +
      '<th>Валюта</th>' +
      '<td>' + account.currency + '</td>' +
      '</tr>' +
      '<tr>' +
      '<th>Баланс</th>' +
      '<td>' + account.balance + '</td>' +
      '</tr>' +
      '<tr>' +
      '<th>Создан</th>' +
      '<td>' + account.getDate() + '</td>' +
      '</tr>';

    if (account.type === 'Расчетный') {
      html += '<tr>' +
        '<th>Банк</th>' +
        '<td>' + account.bankName + '</td>' +
        '</tr>' +
        '<tr>' +
        '<tr>' +
        '<th>PIN</th>' +
        '<td>' + account.pin + '</td>' +
        '</tr>' +
        '<tr>';
    } else {
      html += '<tr>' +
        '<th>Срок</th>' +
        '<td>' + account.getTerm() + '</td>' +
        '</tr>' +
        '<tr>' +
        '<tr>' +
        '<th>Тип депозита</th>' +
        '<td>' + account.plan + '</td>' +
        '</tr>' +
        '<tr>' +
        '<tr>';
    }

    return html;
  }

  // If we on edit page
  if (currentPage === 'edit.html') {
    (function () {
      var id = JSON.parse(localStorage.getItem('accountId'));
      var form = document.querySelector('.js-form');
      var account;

      Account.getAccounts(function (result) {
        account = result;

        // Filling necessary fields with current values and make them visible as well
        for (var key in account) {
          var value = account[key];
          var field = form[key];

          if (typeof value === 'object') {
            for (var prop in value) {
              form[prop].value = value[prop];
              form[prop].parentNode.style.display = 'block';
            }
          }

          if (field) {
            field.value = value;
            field.parentNode.style.display = 'block';
          }
        }
      }, id);

      form.onsubmit = function (e) {
        e.preventDefault();

        account.owner = {
          firstname: this.firstname.value,
          lastname: this.lastname.value
        };
        account.currency = this.currency.value;

        if (account.type === 'Расчетный') {
          account.bankName = this.bankName.value;
          account.pin = this.pin.value;
        } else {
          account.plan = this.plan.value;
          account.deposit = this.deposit.value;
          account.term = this.term.value;
        }

        Account.updateAccount(account, id);
      };
    })();
  }

  function renderAccounts(accounts) {
    var table = document.querySelector('.js-table');
    var html = gatherAccountsHtml(accounts);

    table.innerHTML = html;

    table.onclick = function (e) {
      var targetText = e.target.textContent;
      var accountId = e.target.parentNode.dataset.id;

      if (targetText === 'Удалить') {
        if (confirm('Вы уверены, что хотите удалить счет?')) {
          Account.deleteAccount(accountId);
          Account.getAccounts(renderAccounts);
        }
      }

      if (targetText === 'Подробнее' || targetText === 'Редактировать') {
        localStorage.setItem('accountId', accountId);
      }

      e.stopPropagation();
    };
  }

  function gatherAccountsHtml(accounts) {
    var html = '';

    if (accounts.length) {
      html +=
        '<tr>' +
        '<th>Владелец</th>' +
        '<th>Тип счета</th>' +
        '<th>Баланс</th>' +
        '<th>Валюта</th>' +
        '<th>Создан</th>' +
        '<th>Управление</th>' +
        '</tr>';

      html += accounts.reduce(function (markup, account) {
        account = Account.createAccount(account);

        return (markup +=
          '<tr>' +
          '<td>' +
          account.getOwner() +
          '</td>' +
          '<td>' +
          account.type +
          '</td>' +
          '<td>' +
          account.balance +
          '</td>' +
          '<td>' +
          account.currency +
          '</td>' +
          '<td>' +
          account.getDate() +
          '</td>' +
          '<td data-id=' +
          account.id +
          '>' +
          '<a class="button button--xs" href="./account.html">Подробнее' +
          '</a>' +
          '<a class="button button--xs" href="./edit.html">Редактировать' +
          '</a>' +
          '<button class="button button--xs button--delete">Удалить' +
          '</button>' +
          '</td>' +
          '</tr>');
      }, '');
    }

    return html;
  }

  function getCurrentLocation() {
    var loc = window.location.pathname.split('/');
    return loc[loc.length - 1];
  }

  function goToHomePage() {
    window.location.href = '/';
  }

  function swapFieldsState(fields1, fields2) {
    for (var i = 0; i < fields1.length; i++) {
      fields1[i].disabled = false;

      for (var ii = 0; ii < fields2.length; ii++) {
        fields2[ii].disabled = true;
      }
    }
  }
};