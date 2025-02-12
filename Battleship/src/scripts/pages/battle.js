import "../../styles/battle.css";
import { createElement, ships } from "../helper";
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

const handleAttackAI = (e) => {
	const attackCell = e.target.closest(".cell");
	const row = parseInt(e.target.dataset.row);
	const col = parseInt(e.target.dataset.col);
	if (!attackCell || isNaN(row) || isNaN(col)) return;

	if (checkAlreadyAttack(row, col)) {
		message.textContent = "You have already attack this cell. Please choose a differnt cell";
		return;
	}
	let shot = createElement("span", "shot", "", "X");
	attackCell.append(shot);
	// attackCell.classList.add("miss");
	let hitLanded = computer.gameboard.receiveAttack([row, col]);

	if (hitLanded) {
		shot.classList.add("hit");
		const enemyShip = computer.gameboard.board[row][col].ship;
		if (enemyShip.isSunk()) {
			placeShipUI(enemyShip);
		}

		if (computer.gameboard.isAllSunk()) {
			//Shot sanked the final ship
			//Display congrats dialog
			return;
		}

		console.log(hitLanded);
	} else {
		shot.classList.add("miss");
	}
};

const checkAlreadyAttack = (row, col) => {
	let cpuBoard = computer.gameboard.board;
	if (cpuBoard[row][col].hit !== null) {
		return true;
	}
	return false;
};

//document.querySelector(`.cell[data-row="${row}"][data-col="${col + i}"]`)
const placeShipUI = (enemyShip) => {
	const imgSrc = ships.find((ship) => ship.name === enemyShip.name).src;
	const shipData = computer.shipStartCoord.find((ship) => ship.name === enemyShip.name);
	const { startCoord, orientation } = shipData;
	const startEl = document.querySelector(`#computer-grid .cell[data-row="${startCoord[0]}"][data-col="${startCoord[1]}"]`);
	const width = startEl.offsetWidth;

	const imgEl = createElement("img", "ship-img");
	imgEl.src = imgSrc;
	imgEl.style.position = "absolute";
	imgEl.style.height = enemyShip.name === "submarine" ? "100%" : "90%";
	imgEl.style.width = `${width * enemyShip.length}px`;

	if (orientation === 0) {
		imgEl.style.transformOrigin = "top left";
		imgEl.style.transform = `rotate(90deg) translate(0, ${enemyShip.name === "submarine" ? "-110%" : "-125%"})`;
	}

	startEl.appendChild(imgEl);
};

computerGrid.addEventListener("click", handleAttackAI);
