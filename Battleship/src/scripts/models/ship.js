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
		return this.numHits === Number(this.length);
	};
}

// Class of ship	  Size
// Carrier	        5
// Battleship	      4
// Cruiser		      3
// Submarine	      3
// Destroyer		   	2
