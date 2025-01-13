import { Player } from "./player.js";

export class Computer extends Player {
	constructor() {
		super();
		this.mustExplore = [];
		this.lastHit = null;
		this.availableMoves = new Set();

		for (let x = 0; x < 10; x++) {
			for (let y = 0; y < 10; y++) {
				this.availableMoves.add(`${x},${y}`);
			}
		}
	}

	placeShips = () => {
		const ships = [
			{ name: "carrier", length: 5 },
			{ name: "battleship", length: 4 },
			{ name: "cruiser", length: 3 },
			{ name: "submarine", length: 3 },
			{ name: "destroyer", length: 2 },
		];

		ships.forEach((ship) => {
			let isCollsion = true;
			while (isCollsion) {
				let orientation = Math.random() > 0.5 ? 1 : 0;
				let [x, y] = this.generateCoordinates(ship.length, orientation);
				isCollsion = !this.gameboard.placeShip(ship, [x, y], orientation);
			}
		});

		// this.printBoard(this.gameboard.board);

		return true;
	};

	generateCoordinates = (length, orientation) => {
		let x, y;
		if (orientation) {
			x = Math.floor(Math.random() * 10);
			y = Math.floor(Math.random() * (10 - length));
		} else {
			x = Math.floor(Math.random() * (10 - length));
			y = Math.floor(Math.random() * 10);
		}

		return [x, y];
	};

	lanuchAttack = () => {};

	generateAttackCoordinates = () => {
		const availableMovesArray = [...this.availableMoves];
		const index = Math.floor(Math.random() * availableMovesArray.length);
		const coordinate = availableMovesArray[index];

		const [x, y] = coordinate.split(",").map(Number);
		this.availableMoves.delete(coordinate);
		return [x, y];
	};

	removeFromAvailableMoves(x, y) {
		this.availableMoves.delete(`${x},${y}`);
	}

	printBoard = (board) => {
		console.log("    " + [...Array(10).keys()].join(" ")); // Column headers
		for (let y = 0; y < 10; y++) {
			const rowDisplay = board
				.map((row) => {
					const cell = row[y]; // Get the cell at column y (index y)
					if (cell.hit && cell.ship) return "X"; // Hit ship
					if (cell.hit) return "O"; // Missed shot
					if (cell.ship) return cell.ship[0].toUpperCase(); // First letter of ship name
					return "-"; // Empty water
				})
				.join(" ");
			console.log(`${y} | ${rowDisplay}`);
		}
	};
}

let computer = new Computer();
computer.placeShips();
