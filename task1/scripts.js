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

function reverseString(str) {
	return str.split('').reverse().join('');
}

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