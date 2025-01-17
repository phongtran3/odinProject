import { Gameboard } from "../models/gameboard";
import { Ship } from "../models/ship";

describe("Gameboard Class", () => {
	let gameboard;

	beforeEach(() => {
		gameboard = new Gameboard();
	});

	it("Gameboard Creation", () => {
		expect(gameboard.fleet.length).toBe(0);
		expect(gameboard.shipSunk).toBe(0);
		expect(gameboard.board.length).toBe(10); //row
		expect(gameboard.board[0].length).toBe(10); //col
	});

	it("No ship has sunken", () => {
		gameboard.fleet.length = 5;
		expect(gameboard.isAllSunk()).toBe(false);
	});

	it("All ship has sunken", () => {
		gameboard.fleet.length = 5;
		gameboard.shipSunk = 5;
		expect(gameboard.isAllSunk()).toBe(true);
	});
});

describe("Placing Ship", () => {
	let gameboard;

	beforeEach(() => {
		gameboard = new Gameboard();
	});

	it("Placing Carrier Ship Horizontally", () => {
		expect(gameboard.getShipCoordinates([0, 0], 5, 1)).toEqual([
			[0, 0],
			[0, 1],
			[0, 2],
			[0, 3],
			[0, 4],
		]);

		expect(gameboard.placeShip({ name: "carrier", length: 5 }, [0, 0], 0)).toBe(true);
		expect(gameboard.fleet.some((ship) => ship.name === "carrier")).toBe(true);
		expect(gameboard.board[0][0]).toEqual(
			expect.objectContaining({
				ship: expect.any(Ship),
				hit: false,
			})
		);
	});

	it("Placing Battleship ship vertically", () => {
		expect(gameboard.getShipCoordinates([0, 0], 5, 0)).toEqual([
			[0, 0],
			[1, 0],
			[2, 0],
			[3, 0],
			[4, 0],
		]);
		expect(gameboard.placeShip({ name: "battleship", length: 4 }, [0, 0], 0)).toBe(true);
		expect(gameboard.fleet.some((ship) => ship.name === "battleship")).toBe(true);
		expect(gameboard.board[0][0]).toEqual(
			expect.objectContaining({
				ship: expect.any(Ship),
				hit: false,
			})
		);
	});

	it("Placing invalid Ship", () => {
		expect(gameboard.placeShip({ name: "carrier", length: 5 }, [10, 11], 0)).toBe(false);
		expect(gameboard.placeShip({ name: "carrier", length: 5 }, [-2, 5], 0)).toBe(false);
		expect(gameboard.placeShip({ name: "carrier", length: 5 }, [9, 0], 0)).toBe(false); //out of bounds horizontally
		expect(gameboard.placeShip({ name: "carrier", length: 5 }, [0, 6], 1)).toBe(false); //out of bounds vertically
	});

	it("Placing an already placed ship", () => {
		expect(gameboard.placeShip({ name: "battleship", length: 4 }, [0, 0], 0)).toBe(true);
		expect(gameboard.fleet.some((ship) => ship.name === "battleship")).toBe(true);
		expect(gameboard.board[0][0]).toEqual(
			expect.objectContaining({
				ship: expect.any(Ship),
				hit: false,
			})
		);

		expect(gameboard.placeShip({ name: "battleship", length: 4 }, [0, 0], 0)).toBe(false);
	});

	it("Placing an ship on a occupied cell", () => {
		expect(gameboard.placeShip({ name: "battleship", length: 4 }, [0, 0], 0)).toBe(true);
		expect(gameboard.fleet.some((ship) => ship.name === "battleship")).toBe(true);
		expect(gameboard.board[0][0]).toEqual(
			expect.objectContaining({
				ship: expect.any(Ship),
				hit: false,
			})
		);
		expect(gameboard.placeShip({ name: "carrier", length: 4 }, [0, 0], 0)).toBe(false);
	});

	it("Placing a ship that will cause collision", () => {
		expect(gameboard.placeShip({ name: "battleship", length: 4 }, [2, 3], 0)).toBe(true);
		expect(gameboard.placeShip({ name: "carrier", length: 5 }, [2, 0], 1)).toBe(false);
		expect(gameboard.placeShip({ name: "destroyer", length: 2 }, [1, 3], 0)).toBe(false);
	});

	it("Placing all 5 ships", () => {
		expect(gameboard.placeShip({ name: "carrier", length: 5 }, [0, 0], 1)).toBe(true);
		expect(gameboard.placeShip({ name: "battleship", length: 4 }, [1, 0], 1)).toBe(true);
		expect(gameboard.placeShip({ name: "cruiser", length: 3 }, [2, 0], 1)).toBe(true);
		expect(gameboard.placeShip({ name: "submarine", length: 3 }, [3, 0], 1)).toBe(true);
		expect(gameboard.placeShip({ name: "destroyer", length: 2 }, [4, 0], 1)).toBe(true);
	});
});

describe("Recieving Attack", () => {
	let gameboard;

	beforeEach(() => {
		gameboard = new Gameboard();
		gameboard.placeShip({ name: "carrier", length: 5 }, [0, 0], 0);
	});

	it("Attacks on Empty Cells Miss", () => {
		expect(gameboard.receiveAttack([0, 2])).toBe(false);
		expect(gameboard.receiveAttack([5, 6])).toBe(false);
		expect(gameboard.receiveAttack([5, 0])).toBe(false);
	});

	it("Attacks Landed", () => {
		expect(gameboard.receiveAttack([0, 0])).toBe(true);
		expect(gameboard.receiveAttack([1, 0])).toBe(true);
	});

	it("3 Attacks Landed and 1 Attack Missed, Ship not sunken", () => {
		expect(gameboard.receiveAttack([2, 0])).toBe(true);
		expect(gameboard.receiveAttack([3, 0])).toBe(true);
		expect(gameboard.receiveAttack([4, 0])).toBe(true);
		expect(gameboard.receiveAttack([5, 0])).toBe(false);
		expect(gameboard.isAllSunk()).toBe(false);
	});

	it("Repeated Attack on a Ship Cell", () => {
		expect(gameboard.receiveAttack([0, 0])).toBe(true);
		expect(gameboard.receiveAttack([0, 0])).toBe(false);
	});

	it("Repeated attack on empty cell", () => {
		expect(gameboard.receiveAttack([5, 6])).toBe(false);
		expect(gameboard.receiveAttack([5, 6])).toBe(false);
	});

	it("Firing attacks out of bounds", () => {
		expect(gameboard.receiveAttack([-2, 5])).toBe(false);
		expect(gameboard.receiveAttack([15, 5])).toBe(false);
	});

	it("5 Attacks landed and ship sank", () => {
		expect(gameboard.receiveAttack([0, 0])).toBe(true);
		expect(gameboard.receiveAttack([1, 0])).toBe(true);
		expect(gameboard.receiveAttack([2, 0])).toBe(true);
		expect(gameboard.receiveAttack([3, 0])).toBe(true);
		expect(gameboard.receiveAttack([4, 0])).toBe(true);
		expect(gameboard.isAllSunk()).toBe(true);
	});
});
