function API() {
  this.URL = 'http://localhost:3000/accounts';
}

API.prototype.getAccounts = function() {
  return fetch(`${this.URL}`).then(response => response.json());
};

API.prototype.getAccount = function(id) {
  return fetch(`${this.URL}/${id}`).then(response => response.json());
};

API.prototype.postAccount = function(body) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body)
  };

  return fetch(`${this.URL}`, options);
};

API.prototype.deleteAccount = function(id) {
  const options = {
    method: 'DELETE'
  };

  return fetch(`${this.URL}/${id}`, options).then(() =>
    window.location.reload()
  );
};

API.prototype.updateAccount = function(id, body) {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body)
  };

  return fetch(`${this.URL}/${id}`, options).then(
    () => (window.location = '/')
  );
};

export const api = new API();
