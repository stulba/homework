window.onload = function () {
  var id = JSON.parse(localStorage.getItem('accountId'));
  var form = document.querySelector('.js-form');
  var account;

  Account.getAccounts(function (result) {
    account = Account.createAccount(result);

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

    account.setOwner({
      firstname: this.firstname.value,
      lastname: this.lastname.value
    });
    account.setCurrency(this.currency.value);

    if (account.type === 'Расчетный') {
      account.setBankName(this.bankName.value);
      account.setPin(this.pin.value);
    } else {
      account.setPlan(this.plan.value);
      account.setTerm(this.term.value);
    }

    Account.updateAccount(account, id);
  };
};