const userName = prompt('Please, enter your name', '')

// Handle User Name
function handleUserName(name) {
  if (containsAnNumber(name)) {
    return everySecondToUpperCase(name)
  }

  return reverseString(name)
}



/* Utilities */

// Checks if a string contains a Number
function containsAnNumber(str) {
  let result = false
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(str[i])) {
      result = true
    }
  }

  return result
}

// Reverse a string
function reverseString(str) {
  return str.split('').reverse().join('')
}

// Capitalizing every even letter in a string
function everySecondToUpperCase(str) {
  let result = ''

  for (let i = 0; i < str.length; i++) {
    if (i % 2 === 0) {
      result += str[i].toUpperCase()
    } else {
      result += str[i]
    }
  }

  return result
}

document.write(handleUserName(userName))