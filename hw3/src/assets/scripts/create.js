import { api } from './services/API.js';
import Saving from './constructors/saving.js';
import Checking from './constructors/checking.js';
import initSearch from './search.js';

window.onload = function() {
  const form = document.querySelector('.js-form');
  const formContent = document.createElement('div');
  const formSubmitButton = document.querySelector('.button');
  const typeInput = form.type;

  initSearch();

  formContent.className = 'form__content';
  formSubmitButton.disabled = true;

  typeInput.addEventListener('change', getFormTemplate, false);
  form.addEventListener('submit', postAccount, false);

  function getFormTemplate() {
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

    if (typeInput.value === 'Накопительный') {
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

      formSubmitButton.disabled = false;
    } else if (typeInput.value === 'Расчетный') {
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
      formSubmitButton.disabled = false;
    } else {
      html = '';
      formSubmitButton.disabled = true;
    }

    formContent.innerHTML = html;

    if (!form.contains(formContent)) {
      formSubmitButton.parentNode.insertBefore(formContent, formSubmitButton);
    }
  }

  function postAccount(e) {
    const account = gatherAccount();

    api.postAccount(account).then(() => {
      window.location = '/';
    });

    e.preventDefault();
  }

  function gatherAccount() {
    let account;
    // Create basic Account props
    account = {
      owner: {
        firstname: form.firstname.value,
        lastname: form.lastname.value
      },
      type: form.type.value,
      currency: form.currency.value
    };

    // Add specific props for every type of Account
    if (account.type === 'Расчетный') {
      account.bankName = form.bankName.value;
      account.pin = form.pin.value;
      account = new Checking(account);
    } else {
      account.plan = form.plan.value;
      account.term = form.term.value;
      account.balance = form.deposit.value;
      account = new Saving(account);
    }

    return account;
  }
};
