import { Ship } from "./ship";

export class Gameboard {
	constructor() {
		this.board = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ({ ship: null, hit: false }))); //10x10 grid
		this.fleet = []; //ship objs
		this.shipSunk = 0;
	}

	receiveAttack = (name, [x, y]) => {};

	//0 horizontal - 1 vertical
	placeShip = (newShip, startCoordinate, orientation) => {
		if (this.fleet.some((ship) => ship.name === newShip.name)) return false;

		const [x, y] = startCoordinate;
		if (x < 0 || x >= 10 || y < 0 || y >= 10) return false;
		let ship = new Ship(newShip.name, newShip.length);

		let coordinates = this.getShipCoordinates(startCoordinate, newShip.length, orientation);

		for (const [xi, yi] of coordinates) {
			if (xi < 0 || xi >= 10 || yi < 0 || yi >= 10) return false;

			if (this.board[xi][yi].ship === null) {
				this.board[xi][yi] = { ship: ship.name, hit: false };
			} else {
				return false;
			}
		}

		this.fleet.push(ship);
		return true;
	};

	getShipCoordinates = (startCoordinate, length, orientation) => {
		const [x, y] = startCoordinate;
		let coordinates = [];

		for (let i = 0; i < length; i++) {
			if (orientation === 0) {
				coordinates.push([x + i, y]);
			} else {
				coordinates.push([x, y + i]);
			}
		}
		return coordinates;
	};

	isAllSunk = () => {
		return this.shipSunk === this.fleet.length;
	};
}
