import "../../styles/deploy.css";
import battleShipImg from "../../assets/battleship.svg";
import carrierImg from "../../assets/carrier.svg";
import cruiserImg from "../../assets/cruiser.svg";
import destroyerImg from "../../assets/destroyer.svg";
import submarineImg from "../../assets/submarine.svg";

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

import { createElement } from "../helper";

export default function createDeploy() {
	console.log("Deploy");
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

	const cells = Array.from({ length: 100 }, () => {
		const div = createElement("div", "cell");
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

	fleetContainer.append(orientation);

	ships.forEach((ship) => {
		const div = createElement("div", "ship");
		div.draggable = true;
		div.dataset.name = ship.name;
		div.dataset.length = ship.length;
		div.innerHTML = `
			<img class="ship-img" src=${ship.src} />
			<div class="ship-name">CARRIER</div>
		`;
		fleetContainer.appendChild(div);
	});

	buttonContainer.innerHTML = `
		<button id="random-btn">RANDOMIZE</button>
		<button id="reset-btn">RESET</button>
		<button id="confirm-btn">CONFIRM</button>
	`;

	gridContainer.append(grid, colHeader, rowHeader);
	mainContainer.append(gridContainer, fleetContainer, buttonContainer);
	container.append(pageTitle, mainContainer);
}
