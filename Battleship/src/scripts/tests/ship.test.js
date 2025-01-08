import { Ship } from "../models/ship";

describe("Ship class", () => {
	let ship;

	it("Ship Creation", () => {
		const ship = new Ship("submarine", 3);
		expect(ship.name).toBe("submarine");
		expect(ship.length).toBe(3);
		expect(ship.numHits).toBe(0);
		expect(ship.isSunk()).toBe(false);
	});

	beforeEach(() => {
		ship = new Ship("submarine", 3);
	});

	it("Ship took 1 hit", () => {
		ship.hits();
		expect(ship.numHits).toBe(1);
	});

	it("Ship took 3 hits and sunk", () => {
		ship.hits();
		ship.hits();
		ship.hits();
		expect(ship.numHits).toBe(3);
		expect(ship.isSunk()).toBe(true);
	});

	it("Ship took 2 hits and still a float", () => {
		ship.hits();
		ship.hits();
		expect(ship.numHits).toBe(2);
		expect(ship.isSunk()).toBe(false);
	});
});
