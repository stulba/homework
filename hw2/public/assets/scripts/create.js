window.onload = function () {
  const form = document.querySelector('.js-form');

  // Handle fields visability and state logic
  form.type.onchange = function () {
    const checkingFields = document.querySelectorAll('.checking__fields input');
    const savingFields = document.querySelectorAll(
      '.saving__fields select, .saving__fields input'
    );

    if (form.type.value === 'Накопительный') {
      form.className = 'form form--saving';
      swapFieldsState(savingFields, checkingFields);
    } else if (form.type.value === 'Расчетный') {
      form.className = 'form form--checking';
      swapFieldsState(checkingFields, savingFields);
    } else {
      form.className = 'form';
    }
  };

  form.onsubmit = function (e) {
    e.preventDefault();

    // Create basic Account with common props
    const account = {
      owner: {
        firstname: this.firstname.value,
        lastname: this.lastname.value
      },
      type: this.type.value,
      currency: this.currency.value
    };

    // Add specific fields for every type of Account
    if (account.type === 'Расчетный') {
      account.bankName = this.bankName.value;
      account.pin = this.pin.value;
    } else {
      account.plan = this.plan.value;
      account.term = this.term.value;
      account.balance = this.deposit.value;
    }

    Account.addAccount(Account.createAccount(account));
  };

  function swapFieldsState(fields1, fields2) {
    for (let i = 0; i < fields1.length; i++) {
      fields1[i].disabled = false;

      for (let ii = 0; ii < fields2.length; ii++) {
        fields2[ii].disabled = true;
      }
    }
  }
};