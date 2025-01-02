// export const sum = (a, b) => {
// 	return a + b;
// };

export const capitalize = (word) => {
	return word[0].toUpperCase() + word.slice(1);
};

export const reverse = (string) => {
	return Array.from(string).reverse().join("");
};

export class Calculator {
	add = (a, b) => {
		return a + b;
	};

	sub = (a, b) => {
		return a - b;
	};

	divide = (a, b) => {
		if (b === 0) return "Can't divide by 0.";
		return a / b;
	};

	multiply = (a, b) => {
		return a * b;
	};
}

export const caesarCipher = (string, shift) => {
	const punctuationMarks = new Set([",", ".", "!", "?", ";", ":", "-", "(", ")", "[", "]", "{", "}", '"', "'", "...", "@", "#", "$", "%", "^", "&", "*", "+", "=", "_", "~"]);

	const isPunctuation = (char) => {
		return punctuationMarks.has(char);
	};

	let result = "";

	string.split("").forEach((char) => {
		if (isPunctuation(char) || char === " ") {
			result += char;
		} else {
			let start = char === char.toUpperCase() ? 65 : 97;
			result += String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
		}
	});

	return result;
};

export const analyzeArray = (array) => {
	let object = {};
	object.average = array.reduce((a, b) => a + b) / array.length;
	object.min = Math.min(...array);
	object.max = Math.max(...array);
	object.length = array.length;

	return object;
};
