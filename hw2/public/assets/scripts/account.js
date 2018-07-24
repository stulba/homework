window.onload = Account.getAccounts(renderAccount, localStorage.getItem('accountId'));

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
    '<td>' + account.getType() + '</td>' +
    '</tr>' +
    '<tr>' +
    '<th>Валюта</th>' +
    '<td>' + account.getCurrency() + '</td>' +
    '</tr>' +
    '<tr>' +
    '<th>Баланс</th>' +
    '<td>' + account.getBalance() + '</td>' +
    '</tr>' +
    '<tr>' +
    '<th>Создан</th>' +
    '<td>' + account.getDate() + '</td>' +
    '</tr>';

  if (account.type === 'Расчетный') {
    html += '<tr>' +
      '<th>Банк</th>' +
      '<td>' + account.getBankName() + '</td>' +
      '</tr>' +
      '<tr>' +
      '<tr>' +
      '<th>PIN</th>' +
      '<td>' + account.getPin() + '</td>' +
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
      '<td>' + account.getPlan() + '</td>' +
      '</tr>' +
      '<tr>' +
      '<tr>';
  }

  return html;
}