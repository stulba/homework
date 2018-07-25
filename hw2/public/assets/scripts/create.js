window.onload = function () {
  let account;
  const form = document.querySelector('.js-form');
  const formContent = document.createElement('div');
  formContent.className = 'form__content';
  const button = document.querySelector('.button');
  button.disabled = true;

  // Render form fields html depending on account type
  form.type.onchange = function () {
    let html = '';

    html = `
      <div class="form__group">
        <label class="form__label" for="firstname">Имя</label>
        <input class="form__field" type="text" name="firstname" id="firstname" required>
      </div>

      <div class="form__group">
        <label class="form__label" for="lastname">Фамилия</label>
        <input class="form__field" type="text" name="lastname" id="lastname" required>
      </div>

      <div class="form__group">
        <label class="form__label" for="currency">Валюта</label>
        <select class="form__field" name="currency" id="currency" required>
          <option value="">Выбрать</option>
          <option value="BYN">BYN</option>
          <option value="RUR">RUR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
    `;

    if (form.type.value === 'Накопительный') {
      html += `
          <div class="form__group">
            <label class="form__label" for="plan">Тип депозита</label>
            <select class="form__field" name="plan" id="plan" required>
              <option value="">Выбрать</option>
              <option value="Старт">Старт</option>
              <option value="Прогрессивный">Прогрессивный</option>
              <option value="Доходный">Доходный</option>
            </select>
          </div>

          <div class="form__group">
            <label class="form__label" for="deposit">Начальный взнос</label>
            <input class="form__field" type="number" name="deposit" id="deposit" min="10000" value="10000" required>
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
      button.disabled = false;
    } else if (form.type.value === 'Расчетный') {
      html += `
          <div class="form__group">
            <label class="form__label" for="bankName">Банк</label>
            <input class="form__field" type="text" name="bankName" id="bankName" required>
          </div>

          <div class="form__group">
            <label class="form__label" for="pin">PIN</label>
            <input class="form__field" type="number" name="pin" id="pin" required>
          </div>
      `;
      button.disabled = false;
    } else {
      html = '';
      button.disabled = true;
    }

    formContent.innerHTML = html;

    if (!document.querySelector('.form__content')) {
      button.parentNode.insertBefore(formContent, button);
    }
  };

  form.onsubmit = function (e) {
    e.preventDefault();

    // Create basic Account with common props
    account = {
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
};