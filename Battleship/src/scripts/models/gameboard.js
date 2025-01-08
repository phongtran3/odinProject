import { Ship } from "./ship";

export class Gameboard {
	constructor() {
		this.board = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ({ ship: null, hit: false })));
		this.fleet = []; //{ship: "", hit: int}
		this.shipSunk = 0;
	}

	receiveAttack = (name, [x, y]) => {};

	placeShip = (name, startCoordinate, orientation) => {};

	isFullySunk = () => {
		return this.shipSunk === this.fleet.length;
	};
}
