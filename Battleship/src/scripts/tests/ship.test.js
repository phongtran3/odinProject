import { Ship } from "../models/ship";

describe("Ship class", () => {
	it("Ship Creation", () => {
		const ship = new Ship("submarine", 3);
		expect(ship.name).toBe("submarine");
		expect(ship.length).toBe(3);
		expect(ship.numHits).toBe(0);
		expect(ship.isSunk()).toBe(false);
	});
});
