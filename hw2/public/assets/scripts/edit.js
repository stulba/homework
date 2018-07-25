window.onload = function () {
  const id = JSON.parse(localStorage.getItem('accountId'));
  const form = document.querySelector('.js-form');
  let nextAccount;

  Account.getAccounts(renderFields, id);

  function renderFields(account) {
    form.innerHTML = gatherFieldsHtml(account.type);

    // Filling necessary fields with current values
    for (const key in account) {
      const value = account[key];
      const field = form[key];

      if (typeof value === 'object') {
        for (const prop in value) {
          form[prop].value = value[prop];
        }
      }

      if (field) {
        field.value = value;
      }
    }

    nextAccount = Account.createAccount(account);
  }

  function gatherFieldsHtml(accountType) {
    let html = `
      <div class="form__group">
        <label class="form__label" for="firstname">Имя</label>
        <input class="form__field" type="text" name="firstname" id="firstname">
      </div>

      <div class="form__group">
        <label class="form__label" for="lastname">Фамилия</label>
        <input class="form__field" type="text" name="lastname" id="lastname">
      </div>
      <div class="form__group">
        <label class="form__label" for="currency">Валюта</label>
        <select class="form__field" name="currency" id="currency">
          <option value="BYN">BYN</option>
          <option value="RUR">RUR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
    `;

    if (accountType === 'Расчетный') {
      html += `
        <div class="form__group">
          <label class="form__label" for="bankName">Банк</label>
          <input class="form__field" type="text" name="bankName" id="bankName">
        </div>

        <div class="form__group">
          <label class="form__label" for="pin">PIN</label>
          <input class="form__field" type="number" name="pin" id="pin">
        </div>
        `;
    } else {
      html += `  
      <div class="form__group">
        <label class="form__label" for="plan">Тип депозита</label>
        <select class="form__field" name="plan" id="plan">
          <option value="Старт">Старт</option>
          <option value="Прогрессивный">Прогрессивный</option>
          <option value="Доходный">Доходный</option>
        </select>
      </div>

      <div class="form__group">
        <label class="form__label" for="term">Срок</label>
        <select class="form__field" name="term" id="term">
          <option value="1">1 месяц</option>
          <option value="3">3 месяца</option>
          <option value="6">6 месяцев</option>
          <option value="12">12 месяцев</option>
        </select>
      </div>
      `;
    }

    html += '<button class="button">Сохранить</button>';

    return html;
  }

  form.onsubmit = function (e) {
    e.preventDefault();

    nextAccount.setOwner({
      firstname: this.firstname.value,
      lastname: this.lastname.value
    });
    nextAccount.setCurrency(this.currency.value);

    if (nextAccount.type === 'Расчетный') {
      nextAccount.setBankName(this.bankName.value);
      nextAccount.setPin(this.pin.value);
    } else {
      nextAccount.setPlan(this.plan.value);
      nextAccount.setTerm(this.term.value);
    }

    Account.updateAccount(nextAccount, id);
  };
};