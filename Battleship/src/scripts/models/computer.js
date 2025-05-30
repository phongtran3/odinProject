import { Player } from "./player.js";

export class Computer extends Player {
	constructor() {
		super();
		this.mustExplore = [];
		this.lastHit = null;
		this.availableMoves = new Set();
		this.shipStartCoord = [];

		this.directions = {
			up: [-1, 0],
			down: [1, 0],
			left: [0, -1],
			right: [0, 1],
		};

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
			let collision = true;
			let [x, y] = [];
			let orientation;
			while (collision) {
				orientation = Math.random() > 0.5 ? 1 : 0;
				[x, y] = this.generateCoordinates(ship.length, orientation);
				collision = !this.gameboard.placeShip(ship, [x, y], orientation);
			}
			this.shipStartCoord.push({ name: ship.name, startCoord: [x, y], orientation });
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

	launchAttack = (playerGameboard) => {
		let [x, y] = [];
		if (this.mustExplore.length <= 0) {
			[x, y] = this.generateAttackCoordinates();

			//[x, y] = [3, 5]; //Test purposes

			const hit = playerGameboard.receiveAttack([x, y]); //Return false for miss and true for hit
			if (hit) {
				this.lastHit = [x, y];
				this.mustExplore = this.getAdjacentCells([x, y], playerGameboard.board);
				return { hit, coord: [x, y] };
			}
		} else {
			[x, y] = this.mustExplore.pop();
			this.removeFromAvailableMoves(x, y);
			const hit = playerGameboard.receiveAttack([x, y]);
			const ship = playerGameboard.board[x][y].ship;
			if (ship && ship.isSunk()) {
				this.mustExplore.length = 0;
				this.lastHit = null;
				return { hit, coord: [x, y] };
			}

			if (hit) {
				const nextAttack = this.getNextAttack(this.lastHit, [x, y]);
				if (nextAttack != null) {
					this.lastHit = [x, y];
					this.mustExplore.push(nextAttack);
				}

				return { hit, coord: [x, y] };
			}
		}

		return { hit: false, coord: [x, y] };
	};

	generateAttackCoordinates = () => {
		const availableMovesArray = Array.from(this.availableMoves);
		const index = Math.floor(Math.random() * availableMovesArray.length);
		const coordinate = Array.from(this.availableMoves)[index];
		if (!coordinate) return null;

		const [x, y] = coordinate.split(",").map(Number);
		this.availableMoves.delete(coordinate);
		return [x, y];
	};

	removeFromAvailableMoves(x, y) {
		if (this.availableMoves.has(`${x},${y}`)) this.availableMoves.delete(`${x},${y}`);
	}

	getNextAttack = (firstHit, secondHit) => {
		const [x1, y1] = firstHit;
		const [x2, y2] = secondHit;
		let direction;

		if (x1 === x2) {
			direction = y2 > y1 ? "right" : "left";
		} else {
			direction = x2 > x1 ? "down" : "up";
		}

		const [dx, dy] = this.directions[direction];
		const nextX = x2 + dx;
		const nextY = y2 + dy;

		if (nextX >= 0 && nextX < 10 && nextY >= 0 && nextY < 10) {
			return [nextX, nextY];
		}
		return null;
	};

	getAdjacentCells = (coordinate, board) => {
		let [x, y] = coordinate;
		let adjacentCells = [];

		for (let dir in this.directions) {
			const [dx, dy] = this.directions[dir];
			const newX = x + dx;
			const newY = y + dy;

			if (newX >= 0 && newX < board.length && newY >= 0 && newY < board[0].length) {
				if (board[newX][newY].hit == null) {
					adjacentCells.push([newX, newY]);
				}
			}
		}
		return adjacentCells;
	};

	printBoard = (board) => {
		console.log("    " + [...Array(10).keys()].join(" ")); // Column headers
		for (let y = 0; y < 10; y++) {
			const rowDisplay = board[y]
				.map((cell) => {
					if (cell.hit && cell.ship) return "X"; // Hit ship
					if (cell.hit) return "O"; // Missed shot
					if (cell.ship) return cell.ship.name[0].toUpperCase(); // First letter of ship name
					return "-"; // Empty water
				})
				.join(" ");
			console.log(`${y} | ${rowDisplay}`);
		}
	};
}

// let computer = new Computer();
// computer.placeShips();
