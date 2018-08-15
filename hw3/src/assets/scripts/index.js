import { api } from './services/API.js';
import initSearch from './search.js';

const accountTemplate = account => `
  <div class="account-card">
    <div class="account-card__content">
      <h3 class="account-card__user">
        ${account.owner.firstname} ${account.owner.lastname}
      </h3>
      <div class="account-card__type">${account.type}</div>
      <div class="account-card__balance">
        ${account.balance} ${account.currency}
      </div>
    </div>
    <div class="account-card__controls">
      <a class="account-card__control" href="./account.html">
        <i class="account-card__icon far fa-address-card" data-action="save-item-${
          account.id
        }"></i>
        <span class="u-sr-only">Подробнее</span>
      </a>
      <a class="account-card__control" href="./edit.html">
        <i class="account-card__icon far fa-edit" data-action="save-item-${
          account.id
        }"></i>
        <span class="u-sr-only">Редактировать</span>
      </a>
      <button class="account-card__control" data-action="delete-item-${
        account.id
      }">
        <i class="far fa-trash-alt"></i>
        <span class="u-sr-only">Удалить</span>
      </button>
    </div>
  </div>  
`;

window.onload = function() {
  initSearch();
  api.getAccounts().then(result => showAccounts(result));
};

function showAccounts(accounts) {
  const outputContainer = document.getElementById('main');
  const createButtonTemplate = `
    <div class="controls">
      <a href="./create.html" class="button">Создать счет</a>
    </div>
  `;
  let accountsList;

  accountsList = getAccountsHtml(accounts);

  if (accounts.length) {
    accountsList += createButtonTemplate;
    outputContainer.innerHTML = accountsList;
  } else {
    outputContainer.innerHTML = createButtonTemplate;
  }

  outputContainer.addEventListener('click', handleAccountControl, false);
}

function handleAccountControl(e) {
  let actionType = e.target.dataset.action;
  let id;

  // Get item id from action string
  if (actionType) {
    id = actionType.substring(actionType.lastIndexOf('-') + 1);
    actionType = actionType.substring(0, actionType.lastIndexOf('-'));
  }

  if (actionType === 'delete-item') {
    if (confirm('Вы уверены, что хотите удалить счет?')) {
      api.deleteAccount(id);
    }
  }

  if (actionType === 'save-item' || actionType === 'save-item') {
    localStorage.setItem('accountId', id);
  }

  e.stopPropagation();
}

function getAccountsHtml(accounts) {
  let accountsList;

  if (accounts.length) {
    accountsList = accounts.reduce(
      (html, account) => html + accountTemplate(account),
      ''
    );

    return `<div class="accounts-list">${accountsList}</div>`;
  }
}
