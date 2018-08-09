const Account = function({
  id,
  owner,
  type,
  currency,
  balance = 0,
  created = new Date()
} = {}) {
  this.id = id;
  this.owner = owner;
  this.type = type;
  this.currency = currency;
  this.balance = parseFloat(balance);
  this._created = created;
};

Account.prototype.setId = function(id) {
  this.id = id;
};

Account.prototype.getId = function() {
  return this.id;
};

Account.prototype.setType = function(type) {
  this.type = type;
};

Account.prototype.getType = function() {
  return this.type;
};

Account.prototype.setCurrency = function(currency) {
  this.currency = currency;
};

Account.prototype.getCurrency = function() {
  return this.currency;
};

Account.prototype.getDate = function() {
  return new Date(this._created).toLocaleDateString();
};

Account.prototype.setOwner = function(owner) {
  this.owner = owner;
};

Account.prototype.getOwner = function() {
  const { firstname, lastname } = this.owner;
  return lastname + ' ' + firstname;
};

Account.prototype.setBalance = function(amount) {
  this.balance += parseFloat(amount, 10);
};

Account.prototype.getBalance = function() {
  return this.balance;
};

export default Account;
