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
