export class Ship {
	constructor(name, length) {
		this.name = name;
		this.length = length;
		this.numHits = 0;
	}

	hits = () => {
		this.numHits++;
	};

	isSunk = () => {
		return this.numHits === this.length;
	};
}

// Class of ship	  Size
// Carrier	        5
// Battleship	      4
// Destroyer	      3
// Submarine	      3
// Destroyer		   	2
