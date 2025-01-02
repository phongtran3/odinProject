import { sum, capitalize, reverse, Calculator, caesarCipher, analyzeArray } from "./jestPractice";

// it("adds 1 + 2 to equal 3", () => {
// 	expect(sum(1, 2)).toBe(3);
// });

//TEST 1
it("Capitlize first letter of string ", () => {
	expect(capitalize("pokemon")).toBe("Pokemon");
});

//TEST 2
it("Reverse a string", () => {
	expect(reverse("Attack on Titan")).toBe("natiT no kcattA");
});

//TEST 3
it("Calculator Add", () => {
	const calc = new Calculator();
	expect(calc.add(5, 5)).toBe(10);
	expect(calc.add(-5, 5)).toBe(0);
});

it("Calculator Subtract", () => {
	const calc = new Calculator();
	expect(calc.sub(7, 5)).toBe(2);
	expect(calc.sub(88, 95)).toBe(-7);
});

it("Calculator Divide", () => {
	const calc = new Calculator();
	expect(calc.divide(25, 5)).toBe(5);
	expect(calc.divide(214, 0)).toBe("Can't divide by 0.");
});

it("Calculator Multiply", () => {
	const calc = new Calculator();
	expect(calc.multiply(25, 5)).toBe(125);
	expect(calc.multiply(15, 0)).toBe(0);
});

//TEST 4
it("Caesar Cipher", () => {
	expect(caesarCipher("xyz", 3)).toBe("abc");
	expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
	expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
});

//TEST 5
it("Analyze Array", () => {
	expect(analyzeArray([1, 8, 3, 4, 2, 6])).toStrictEqual({
		average: 4,
		min: 1,
		max: 8,
		length: 6,
	});

	expect(analyzeArray([2, 16, 6, 8, 4, 12])).toStrictEqual({
		average: 8,
		min: 2,
		max: 16,
		length: 6,
	});
});
