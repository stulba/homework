const userName = prompt('Please, enter your name', '');

function handleUserName(name) {
  if (hasNumber(name)) {
    return toUpperCase(name);
  }

  return reverseString(name);
}

document.write(handleUserName(userName));




/* Utilities */

function hasNumber(str) {
  let result = false;

  for (let i = 0; i < str.length; i++) {
    if (!isNaN(str[i])) {
      result = true;
    }
  }

  return result;
}

function isEven(num) {
  return num % 2 === 0;
}

function reverseString(str) {
  return str.split('').reverse().join('');
}

function toUpperCase(str) {
  let result = '';

  for (let i = 0; i < str.length; i++) {
    if (isEven(i)) {
      result += str[i].toUpperCase();
    } else {
      result += str[i];
    }
  }

  return result;
}