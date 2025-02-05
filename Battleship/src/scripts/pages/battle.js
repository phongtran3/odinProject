import "../../styles/battle.css";
import battleShipImg from "../../assets/battleship.svg";
import carrierImg from "../../assets/carrier.svg";
import cruiserImg from "../../assets/cruiser.svg";
import destroyerImg from "../../assets/destroyer.svg";
import submarineImg from "../../assets/submarine.svg";
import { createElement } from "../helper";
import { gridContainer as playerGrid, player, computer } from "./deploy";

const container = document.getElementById("container");
const messageContainer = createElement("div", "message-container");
const message = createElement("p", "message", "", "Your turn, Please choose your next attack...");
const gameContainer = createElement("div", "game-container");
const playerContainer = createElement("div", "player-container");
const playerGridTitle = createElement("h3", "grid-title", "", "Player Waters");
const computerContainer = createElement("div", "computer-container");
const computerGridTitle = createElement("h3", "grid-title", "", "Enemy Waters");
const computerGridContainer = createElement("div", "grid-container");
const computerGrid = createElement("div", "grid", "computer-grid");
const colHeader = createElement("div", "col-header");
const rowHeader = createElement("div", "row-header");

export default function createBattlePage() {
	const cells = Array.from({ length: 100 }, (_, index) => {
		const div = createElement("div", "cell");
		div.setAttribute("data-row", Math.floor(index / 10));
		div.setAttribute("data-col", index % 10);
		div.setAttribute("ship", null);
		return div;
	});
	cells.forEach((cell) => {
		computerGrid.appendChild(cell);
	});

	const columns = Array.from({ length: 10 }, (_, index) => {
		const div = createElement("div", "col", "", `${index}`);
		return div;
	});
	columns.forEach((col) => {
		colHeader.appendChild(col);
	});

	const rows = Array.from({ length: 10 }, (_, index) => {
		const div = createElement("div", "row", "", `${index}`);
		return div;
	});
	rows.forEach((row) => {
		rowHeader.appendChild(row);
	});

	messageContainer.append(message);
	playerContainer.append(playerGridTitle, playerGrid);
	computerGridContainer.append(computerGrid, colHeader, rowHeader);
	computerContainer.append(computerGridTitle, computerGridContainer);
	gameContainer.append(playerContainer, computerContainer);
	container.append(messageContainer, gameContainer);
}

computerGrid.addEventListener("click", (e) => {
	const row = parseInt(e.target.dataset.row);
	const col = parseInt(e.target.dataset.col);
	console.log(`${row},${col}`);
});
