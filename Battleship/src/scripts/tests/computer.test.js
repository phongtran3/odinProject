import { Computer } from "../models/computer";
import { Player } from "../models/player";

describe("Computer Class", () => {
	let computer;
	beforeEach(() => {
		computer = new Computer();
	});

	it("Placing all 5 ships", () => {
		expect(computer.placeShips()).toBe(true);
	});
});

describe("Launching Attacks", () => {
	let player;
	let computer;

	beforeEach(() => {
		player = new Player();

		computer = new Computer();

		player.gameboard.placeShip({ name: "carrier", length: 5 }, [0, 0], 1);
		player.gameboard.placeShip({ name: "battleship", length: 4 }, [1, 0], 1);
		player.gameboard.placeShip({ name: "cruiser", length: 3 }, [2, 0], 1);
		player.gameboard.placeShip({ name: "submarine", length: 3 }, [3, 0], 1);
		player.gameboard.placeShip({ name: "destroyer", length: 2 }, [4, 0], 1);
	});

	it("First shot firing hit at [0,0]", () => {
		expect(computer.launchAttack(player.gameboard)).toBe(true);
		expect(computer.mustExplore).toEqual([
			[1, 0],
			[0, 1],
		]);
		expect(computer.lastHit).toEqual([0, 0]);
	});

	it("Second shot hit at [0,1]", () => {
		expect(computer.launchAttack(player.gameboard)).toBe(true);
		expect(computer.launchAttack(player.gameboard)).toBe(true);
		expect(computer.getNextAttack([0, 0], [0, 1])).toEqual([0, 2]);
		expect(computer.mustExplore).toEqual([
			[1, 0],
			[0, 2],
		]);
		expect(computer.lastHit).toEqual([0, 1]);
	});

	it("Third shot hit at [0,2]", () => {
		expect(computer.launchAttack(player.gameboard)).toBe(true);
		expect(computer.launchAttack(player.gameboard)).toBe(true);
		expect(computer.launchAttack(player.gameboard)).toBe(true);
		expect(computer.getNextAttack([0, 1], [0, 2])).toEqual([0, 3]);
		expect(computer.mustExplore).toEqual([
			[1, 0],
			[0, 3],
		]);
		expect(computer.lastHit).toEqual([0, 2]);
	});

	it("Fourth shot hit at [0,3]", () => {
		expect(computer.launchAttack(player.gameboard)).toBe(true);
		expect(computer.launchAttack(player.gameboard)).toBe(true);
		expect(computer.launchAttack(player.gameboard)).toBe(true);
		expect(computer.launchAttack(player.gameboard)).toBe(true);
		expect(computer.getNextAttack([0, 2], [0, 3])).toEqual([0, 4]);
		expect(computer.mustExplore).toEqual([
			[1, 0],
			[0, 4],
		]);
		expect(computer.lastHit).toEqual([0, 3]);
	});

	it("Fifth shot hit at [0,4]", () => {
		expect(computer.launchAttack(player.gameboard)).toBe(true);
		expect(computer.launchAttack(player.gameboard)).toBe(true);
		expect(computer.launchAttack(player.gameboard)).toBe(true);
		expect(computer.launchAttack(player.gameboard)).toBe(true);
		expect(computer.launchAttack(player.gameboard)).toBe(true);
		expect(computer.mustExplore).toEqual([]);
		expect(computer.lastHit).toEqual(null);

		expect(player.gameboard.shipSunk).toBe(1);
	});

	// it("Firing miss shots at [0,5]", () => {
	// 	expect(computer.launchAttack(player.gameboard)).toBe(false);
	// 	expect(computer.mustExplore.length).toBe(0);
	// 	expect(computer.mustExplore).toStrictEqual([]);
	// 	expect(computer.lastHit).toBe(null);
	// 	expect(player.gameboard.board[0][5]).toEqual(
	// 		expect.objectContaining({
	// 			ship: null,
	// 			hit: false,
	// 		})
	// 	);
	// });
});
