export const sum = (a, b) => {
	return a + b;
};

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

export const caesarCipher = (string, factor) => {
	const isPunctuation = (string) => {
		const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
	};
};
