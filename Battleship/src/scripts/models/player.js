import { Gameboard } from "./gameboard";

export class Player {
	constructor(name = "Computer") {
		this.name = name;
		this.gameboard = new Gameboard();
	}
}
