import { Computer } from "../models/computer";

describe("Computer Class", () => {
	let computer;
	beforeEach(() => {
		computer = new Computer();
	});

	it("Placing all 5 ships", () => {
		expect(computer.placeShips()).toBe(true);
	});
});
