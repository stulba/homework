import { api } from './services/API.js';

const accountTemplate = account =>
  `<div class="account-card">
    <div class="account-card__content">
      <h3 class="account-card__user">
        ${account.owner.firstname} ${account.owner.lastname}
      </h3>
      <div class="account-card__type">${account.type}</div>
      <div class="account-card__balance">
        ${account.balance} ${account.currency}
      </div>
    </div>
  </div>`;

const initSearch = function() {
  const search = document.getElementById('search');
  const outputContainer = document.getElementById('main');
  let result;

  search.addEventListener('submit', startSearch, false);

  // Search among Currency, Username, Account Type
  function startSearch(e) {
    const searchInput = document.querySelector('.search__input');
    const term = searchInput.value.toLowerCase() || 'byn';

    e.preventDefault();

    api.getAccounts().then(accounts => {
      // Filter
      result = accounts.filter(account => {
        const currency = account.currency.toLowerCase();
        const type = account.type.toLowerCase();
        const userName = (
          account.owner.firstname + account.owner.lastname
        ).toLowerCase();

        if (
          hasTerm(currency, term) ||
          hasTerm(type, term) ||
          hasTerm(userName, term)
        ) {
          return true;
        }
      });

      showSearchResult(result);
    });
  }

  function showSearchResult(result) {
    if (result.length) {
      outputContainer.innerHTML = result.reduce(
        (html, account) => html + accountTemplate(account),
        ''
      );
    } else {
      outputContainer.innerHTML = 'К сожалению, ничего не найдено :(';
    }
  }

  function hasTerm(name, value) {
    if (name.indexOf(value) !== -1) return true;
  }
};

export default initSearch;
