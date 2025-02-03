import "../../styles/deploy.css";
import battleShipImg from "../../assets/battleship.svg";
import carrierImg from "../../assets/carrier.svg";
import cruiserImg from "../../assets/cruiser.svg";
import destroyerImg from "../../assets/destroyer.svg";
import submarineImg from "../../assets/submarine.svg";
import { createElement } from "../helper";
import { Player } from "../models/player";

const ships = [
	{
		name: "battleship",
		length: 5,
		src: battleShipImg,
	},
	{
		name: "carrier",
		length: 4,
		src: carrierImg,
	},
	{
		name: "cruiser",
		length: 3,
		src: cruiserImg,
	},
	{
		name: "destroyer",
		length: 3,
		src: destroyerImg,
	},
	{
		name: "submarine",
		length: 2,
		src: submarineImg,
	},
];
const container = document.getElementById("container");
const pageTitle = createElement("h4", "", "", "Deploy your fleet!");
const mainContainer = createElement("div", "main-container");
const gridContainer = createElement("div", "grid-container");
const grid = createElement("div", "grid");
const colHeader = createElement("div", "col-header");
const rowHeader = createElement("div", "row-header");
const fleetContainer = createElement("div", "fleet-container");
const orientationDiv = createElement("div", "", "orientation");
const buttonContainer = createElement("div", "button-container");
const confirmBtn = createElement("button", "disable", "confirm-btn", "CONFIRM");
const randomizeBtn = createElement("button", "", "rest-btn", "RANDOMIZE");
const resetBtn = createElement("button", "", "randomize-btn", "RESET");

const player = new Player();
let currentDragEl = null;
let currentDragCells = [];

export default function createDeployPage() {
	console.log("Deploy");

	const cells = Array.from({ length: 100 }, (_, index) => {
		const div = createElement("div", "cell");
		div.setAttribute("data-row", Math.floor(index / 10));
		div.setAttribute("data-col", index % 10);
		div.setAttribute("ship", null);
		return div;
	});
	cells.forEach((cell) => {
		grid.appendChild(cell);
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

	orientationDiv.innerHTML = `
		<div>HORIZONTAL</div>
	`;
	orientationDiv.setAttribute("orientation", 1);

	fleetContainer.append(orientationDiv);

	ships.forEach((ship) => {
		const div = createElement("div", "ship");
		const capitalizeName = ship.name.charAt(0).toUpperCase() + ship.name.slice(1);
		div.draggable = true;
		div.dataset.name = ship.name;
		div.dataset.length = ship.length;
		div.innerHTML = `
			<img draggable="false" class="ship-img" src=${ship.src} />
			<div class="ship-name">${capitalizeName}</div>
		`;

		div.addEventListener("dragstart", (e) => {
			e.dataTransfer.setData("ship-name", ship.name);
			e.dataTransfer.setData("ship-length", ship.length);
			currentDragEl = e.target;
		});

		fleetContainer.appendChild(div);
	});

	buttonContainer.append(randomizeBtn, resetBtn, confirmBtn);

	gridContainer.append(grid, colHeader, rowHeader);
	mainContainer.append(gridContainer, fleetContainer);
	container.append(pageTitle, mainContainer, buttonContainer);
}

orientationDiv.addEventListener("click", () => {
	orientationDiv.textContent = orientationDiv.textContent === "VERTICAL" ? "HORIZONTAL" : "VERTICAL";
	let newOrientation = Number(orientationDiv.getAttribute("orientation")) === 1 ? 0 : 1;
	orientationDiv.setAttribute("orientation", newOrientation);
});

grid.addEventListener("dragover", (e) => {
	e.preventDefault();
	const row = parseInt(e.target.dataset.row);
	const col = parseInt(e.target.dataset.col);
	displayDragOverEffect(row, col);
});

grid.addEventListener("dragleave", (e) => {
	clearDragOverEffect();
});

grid.addEventListener("drop", (e) => {
	e.preventDefault();
	const row = parseInt(e.target.dataset.row);
	const col = parseInt(e.target.dataset.col);
	let orientation = Number(document.getElementById("orientation").getAttribute("orientation"));
	if (!isPlaceAvailable(row, col, orientation)) {
		clearDragOverEffect();
		return;
	}
	const targetCell = e.target;

	let shipName = currentDragEl.getAttribute("data-name");
	let shipLength = parseInt(currentDragEl.getAttribute("data-length"));
	let shipObj = { name: shipName, length: shipLength };
	player.gameboard.placeShip(shipObj, [row, col], orientation);

	const shipElement = document.querySelector(`.ship[data-name="${shipName}"]`);
	shipElement.draggable = false;

	let img = shipElement.querySelector(".ship-img").cloneNode(true);

	//Remove ship image and name from fleet container
	if (shipElement) {
		shipElement.querySelector(".ship-name").style.visibility = "hidden";
		shipElement.querySelector(".ship-img").style.visibility = "hidden";
	}
	placeShipUI(targetCell, img, orientation, shipLength);

	currentDragCells.forEach((cell) => {
		cell.setAttribute("ship", shipName);
	});
	if (player.gameboard.fleet.length === 5) {
		confirmBtn.classList.remove("disable");
	}

	clearDragOverEffect();
	return;
});

const displayDragOverEffect = (row, col) => {
	let orientation = Number(document.getElementById("orientation").getAttribute("orientation"));
	let shipLength = parseInt(currentDragEl.getAttribute("data-length"));
	let cell = "";
	if (isPlaceAvailable(row, col, orientation)) {
		for (let i = 0; i < shipLength; i++) {
			if (orientation) {
				cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col + i}"]`);
			} else {
				cell = document.querySelector(`.cell[data-row="${row + i}"][data-col="${col}"]`);
			}
			if (cell) {
				currentDragCells.push(cell);
				cell.classList.add("available");
				cell.classList.remove("occupied");
			}
		}
	} else {
		for (let i = 0; i < shipLength; i++) {
			if (orientation) {
				cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col + i}"]`);
			} else {
				cell = document.querySelector(`.cell[data-row="${row + i}"][data-col="${col}"]`);
			}
			if (cell) {
				currentDragCells.push(cell);
				cell.classList.remove("available");
				cell.classList.add("occupied");
			}
		}
	}
};

const isPlaceAvailable = (row, col, orientation) => {
	let shipLength = parseInt(currentDragEl.getAttribute("data-length"));
	for (let i = 0; i < shipLength; i++) {
		if (orientation) {
			// Horizontal placement
			if (col + i > 9) return false;
			const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col + i}"]`);
			if (!cell || cell.getAttribute("ship") !== "null") return false;
		} else {
			// Vertical placement
			if (row + i > 9) return false;
			const cell = document.querySelector(`.cell[data-row="${row + i}"][data-col="${col}"]`);
			if (!cell || cell.getAttribute("ship") !== "null") return false;
		}
	}
	return true;
};

const clearDragOverEffect = () => {
	currentDragCells.forEach((cell) => {
		cell.classList.remove("available");
		cell.classList.remove("occupied");
	});
	currentDragCells = [];
};

const placeShipUI = (startEl, imgEl, orientation, shipLength) => {
	const width = startEl.offsetWidth;
	const shipName = currentDragEl.getAttribute("data-name");

	imgEl.style.position = "absolute";
	imgEl.style.height = shipName === "submarine" ? "100%" : "90%";
	imgEl.style.width = `${width * shipLength}px`;

	if (orientation === 0) {
		imgEl.style.transformOrigin = "top left";
		imgEl.style.transform = `rotate(90deg) translate(0, -125%)`;
	}

	startEl.appendChild(imgEl);
};

confirmBtn.addEventListener("click", (e) => {
	if (player.gameboard.fleet.length < 5) {
		e.preventDefault();
		return;
	}
	console.log("Confirm");
});

resetBtn.addEventListener("click", () => {
	resetBtn.blur();
	if (player.gameboard.fleet.length <= 0) return;

	player.gameboard.fleet = [];
	player.gameboard.board = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ({ ship: null, hit: null })));

	const fleetContainerArr = document.querySelectorAll(".ship");
	fleetContainerArr.forEach((shipDiv) => {
		const img = shipDiv.querySelector("img");
		const nameDiv = shipDiv.querySelector("div");
		img.style.visibility = "visible";
		nameDiv.style.visibility = "visible";
		shipDiv.draggable = true;
	});

	const cells = document.querySelectorAll(".cell");
	cells.forEach((cell) => {
		const img = cell.querySelector("img");
		if (img) {
			cell.removeChild(img);
		}
		cell.setAttribute("ship", null);
	});
});
