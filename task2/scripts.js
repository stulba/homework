const btn1 = document.querySelector('.js-get');
const btn2 = document.querySelector('.js-show-image');
const btn3 = document.querySelector('.js-create-human');

btn1.onclick = function () {
  window.location = 'https://www.google.com/';
};

btn2.onclick = function () {
  document.write('<img src="./image.jpg" alt="Red cat" />');
};

btn3.onclick = function () {
  const human = {
    firstname: 'Siarhei',
    lastname: 'Stulba',
    email: 'placeholder@mail.com',
    age: 13,
    married: false,
  };

  const list = document.createElement('ul');

  for (const key in human) {
    const listItem = document.createElement('li');
    const content = `${key}: ${human[key]}`;

    listItem.textContent = content;
    list.appendChild(listItem);

    console.log(content); // eslint-disable-line no-console
  }

  document.body.appendChild(list);
};