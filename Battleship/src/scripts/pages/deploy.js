import "../../styles/deploy.css";
import battleShipImg from "../../assets/battleship.svg";
import carrierImg from "../../assets/carrier.svg";
import cruiserImg from "../../assets/cruiser.svg";
import destroyerImg from "../../assets/destroyer.svg";
import submarineImg from "../../assets/submarine.svg";
import { createElement } from "../helper";

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
const orientation = createElement("div", "", "orientation");
const buttonContainer = createElement("div", "button-container");

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

	orientation.innerHTML = `
		<div>HORIZONTAL</div>
	`;
	orientation.setAttribute("orientation", 1);

	fleetContainer.append(orientation);

	ships.forEach((ship) => {
		const div = createElement("div", "ship");
		div.draggable = true;
		div.dataset.name = ship.name;
		div.dataset.length = ship.length;
		div.innerHTML = `
			<img draggable="false" class="ship-img" src=${ship.src} />
			<div class="ship-name">CARRIER</div>
		`;

		div.addEventListener("dragstart", (e) => {
			e.dataTransfer.setData("ship-name", ship.name);
			e.dataTransfer.setData("ship-length", ship.length);
			currentDragEl = e.target;
		});

		fleetContainer.appendChild(div);
	});

	buttonContainer.innerHTML = `
		<button id="random-btn">RANDOMIZE</button>
		<button id="reset-btn">RESET</button>
		<button id="confirm-btn">CONFIRM</button>
	`;

	gridContainer.append(grid, colHeader, rowHeader);
	mainContainer.append(gridContainer, fleetContainer);
	container.append(pageTitle, mainContainer, buttonContainer);
}

orientation.addEventListener("click", () => {
	orientation.textContent = orientation.textContent === "VERTICAL" ? "HORIZONTAL" : "VERTICAL";
	let newOrientation = Number(orientation.getAttribute("orientation")) === 1 ? 0 : 1;
	orientation.setAttribute("orientation", newOrientation);
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

const displayDragOverEffect = (row, col) => {
	console.log(`row ${row}, col ${col}`);
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
