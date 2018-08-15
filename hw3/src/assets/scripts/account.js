import { api } from './services/API.js';
import Saving from './constructors/saving.js';
import Checking from './constructors/checking.js';
import initSearch from './search.js';

window.onload = function() {
  const id = localStorage.getItem('accountId');

  initSearch();
  api.getAccount(id).then(account => showAccount(account));
};

function showAccount(account) {
  const outputNode = document.getElementById('main');
  const table = document.createElement('table');
  const html = getAccountHtml(account);

  table.innerHTML = html;
  outputNode.appendChild(table);
}

function getAccountHtml(account) {
  let html = '';

  if (account.type === 'Накопительный') {
    account = new Saving(account);
  } else {
    account = new Checking(account);
  }

  // Every account type have custom iterator that makes this possible
  for (const key of account) {
    html += `
      <tr>
        <th>${key.header}</th>
        <td>${key.value}</td>
      </tr>`;
  }

  return html;
}
