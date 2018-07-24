window.onload = Account.getAccounts(renderAccounts);

function renderAccounts(accounts) {
  const table = document.createElement('table');

  table.innerHTML = gatherAccountsHtml(accounts);
  document.body.appendChild(table);

  table.onclick = function (e) {
    const targetText = e.target.textContent;
    const accountId = e.target.parentNode.dataset.id;

    if (targetText === 'Удалить') {
      if (confirm('Вы уверены, что хотите удалить счет?')) {
        Account.deleteAccount(accountId);
      }
    }

    if (targetText === 'Подробнее' || targetText === 'Редактировать') {
      localStorage.setItem('accountId', accountId);
    }

    e.stopPropagation();
  };
}

function gatherAccountsHtml(accounts) {
  let html = '';

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

    html += accounts.reduce((markup, account) => {
      account = Account.createAccount(account);

      return (markup +=
        '<tr>' +
        '<td>' +
        account.getOwner() +
        '</td>' +
        '<td>' +
        account.getType() +
        '</td>' +
        '<td>' +
        account.getBalance() +
        '</td>' +
        '<td>' +
        account.getCurrency() +
        '</td>' +
        '<td>' +
        account.getDate() +
        '</td>' +
        '<td data-id=' +
        account.getId() +
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