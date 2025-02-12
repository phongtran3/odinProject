export function createElement(tag, className, id, content) {
	const element = document.createElement(tag);
	if (className) element.classList.add(className);
	if (id) element.id = id;
	if (content) element.textContent = content;
	return element;
}

export function generateCoordinates(length, orientation) {
	let x, y;
	if (orientation) {
		x = Math.floor(Math.random() * 10);
		y = Math.floor(Math.random() * (10 - length));
	} else {
		x = Math.floor(Math.random() * (10 - length));
		y = Math.floor(Math.random() * 10);
	}

	return [x, y];
}

import battleShipImg from "../assets/battleship.svg";
import carrierImg from "../assets/carrier.svg";
import cruiserImg from "../assets/cruiser.svg";
import destroyerImg from "../assets/destroyer.svg";
import submarineImg from "../assets/submarine.svg";
export const ships = [
	{
		name: "carrier",
		length: 5,
		src: carrierImg,
	},
	{
		name: "battleship",
		length: 4,
		src: battleShipImg,
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
