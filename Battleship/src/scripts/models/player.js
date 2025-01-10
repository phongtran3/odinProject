import { Gameboard } from "./gameboard";

export class Player {
	constructor(type = "Computer") {
		this.type = type;
		this.gameboard = new Gameboard();
	}
}
