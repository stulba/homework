/* Utilities */

// Checks if a string contains a Number
function containsNumber(str) {
	let result = false;

	for (let i = 0; i < str.length; i++) {
		if (!isNaN(str[i])) {
			result = true;
		}
	}

	return result;
}

// Reverse a string
function reverseString(str) {
	return str.split('').reverse().join('');
}

// Capitalizing every second letter in a string
function toUpperCase(str) {
	let result = '';

	for (let i = 0; i < str.length; i++) {
		if (i % 2 === 0) {
			result += str[i].toUpperCase();
		} else {
			result += str[i];
		}
	}

	return result;
}

const userName = prompt('Please, enter your name', '');

// Handle User Name
function handleUserName(name) {
	if (containsNumber(name)) {
		return toUpperCase(name);
	}

	return reverseString(name);
}

document.write(handleUserName(userName));