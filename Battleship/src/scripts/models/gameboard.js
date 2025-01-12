import { Ship } from "./ship.js";

export class Gameboard {
	constructor() {
		this.board = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ({ ship: null, hit: false }))); //10x10 grid
		this.fleet = []; //ship objs
		this.shipSunk = 0;
	}

	receiveAttack = (coordinates) => {
		const [x, y] = coordinates;
		if (x < 0 || x >= 10 || y < 0 || y >= 10) return false;

		const cell = this.board[x][y];

		if (cell.hit) return false;

		if (cell.ship === null) {
			cell.hit = true;
			return false;
		}

		cell.hit = true;
		let ship = this.fleet.find((el) => el.name === cell.ship);
		ship.hits();

		if (ship.isSunk()) this.shipSunk++;

		return true;
	};

	//0 horizontal - 1 vertical
	placeShip = (newShip, startCoordinate, orientation) => {
		if (this.fleet.some((ship) => ship.name === newShip.name)) return false;

		const [x, y] = startCoordinate;
		if (x < 0 || x >= 10 || y < 0 || y >= 10) return false;

		let ship = new Ship(newShip.name, newShip.length);
		let coordinates = this.getShipCoordinates(startCoordinate, newShip.length, orientation);

		for (const [xi, yi] of coordinates) {
			if (xi < 0 || xi >= 10 || yi < 0 || yi >= 10 || this.board[xi][yi].ship !== null) {
				return false;
			}
		}

		for (const [xi, yi] of coordinates) {
			this.board[xi][yi] = { ship: ship.name, hit: false };
		}

		this.fleet.push(ship);
		return true;
	};

	getShipCoordinates = (startCoordinate, length, orientation) => {
		const [x, y] = startCoordinate;
		let coordinates = [];

		for (let i = 0; i < length; i++) {
			if (orientation === 0) {
				coordinates.push([x + i, y]); // Horizontal placement
			} else {
				coordinates.push([x, y + i]); // Vertical placement
			}
		}
		return coordinates;
	};

	isAllSunk = () => {
		return this.shipSunk === this.fleet.length;
	};
}
