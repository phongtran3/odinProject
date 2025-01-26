import "../../styles/instruction.css";
import { createElement } from "../helper";

export default function createHome() {
	console.log("Creating Home");
	const container = document.getElementById("container");

	const instrucDiv = createElement("div", "instruction");
	const instructTitle = createElement("h2", "instruction-title", "", "Battleship");
	const setUpDiv = createElement("div", "setup");
	const gameplayDiv = createElement("div", "gameplay");
	const winningDiv = createElement("div", "winning");
	const btnDiv = createElement("div", "btn-container");
	const startBtn = createElement("button", "", "start-btn", "START");

	setUpDiv.innerHTML = `
		<h3>Setting Up</h3>
		<p>1.Each player has a fleet of 5 ships of different lengths that need to be placed on their grid.</p>
		<p>2.The ships can be placed either horizontally or vertically within the grid.</p>
		<p>3.The player can either place their ship randomly using the random option or place the ship on their grid manually.</p>
		<p>4.Once the player is satisfied with their ship placement, they may start the game.</p>
	`;

	gameplayDiv.innerHTML = `
		<h3>Gameplay</h3>
		<p>1.On the player's turn, select a coordinate on the opponent's grid to fire a shot.</p>
		<p>2.The opponent will then take their turn to fire a shot at your grid.</p>
		<p>3.A red 'X' will indicate a hit and a white 'X' will indicate a miss.</p>
		<p>4.If you hit a ship, continue firing to sink it.</p>
		<p>5.The opponent's ship will be revealed on the opponent's grid once it's fully sunk.</p>
	`;

	winningDiv.innerHTML = `
		<h3>Winning</h3>
		<p>The first player to sink all of their opponent's ships wins the game</p>
	`;

	btnDiv.append(startBtn);

	instrucDiv.append(instructTitle, setUpDiv, gameplayDiv, winningDiv, btnDiv);
	container.append(instrucDiv);
}
