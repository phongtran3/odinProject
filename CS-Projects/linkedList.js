export class Node {
	key = null;
	value = null;
	next = null;

	constructor(key, value) {
		this.value = value;
		this.key = key;
	}
}

//[ NODE(head) ] -> [ NODE ] -> [ NODE(tail) ] -> null

export class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	append = (key, value) => {
		const newNode = new Node(key, value);

		if (this.head === null) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}

		this.size++;
	};

	prepend = (key, value) => {
		const newNode = new Node(key, value);
		newNode.next = this.head;
		this.head = newNode;
		if (!this.tail) {
			this.tail = newNode;
		}
		this.size++;
	};

	at = (index) => {
		let current = this.head;
		let i = 0;
		while (current) {
			if (i === index) return current;
			else {
				i++;
				current = current.next;
			}
		}
		return null;
	};

	contains = (value) => {
		let current = this.head;
		while (current) {
			if (current.value === value) return true;
			else current = current.next;
		}
		return false;
	};

	find = (value) => {
		let current = this.head;
		let index = 0;
		while (current) {
			if (current.value === value) {
				return index;
			} else {
				current = current.next;
				index++;
			}
		}
		return null;
	};

	pop = () => {
		let current = this.head;
		while (current) {
			if (current.next === this.tail) {
				current.next = null;
				this.tail = current;
			} else {
				current = current.next;
			}
		}
		return null;
	};

	toString = () => {
		let current = this.head;
		let output = "";
		while (current) {
			output += `${current.value} -> `;
			current = current.next;
		}
		output += "null;";
		return output;
	};

	insertAt = (value, index) => {
		if (index < 0 || index >= this.size) {
			console.error("Index out of bound");
			return;
		}

		if (index === 0) {
			this.prepend(value);
		}

		let i = 0;
		let current = this.head;
		let newNode = new Node(value);

		while (current) {
			if (i === index - 1) {
				newNode.next = current.next;
				current.next = newNode;
				this.size++;

				if (newNode.next === null) {
					this.tail = newNode;
				}

				return;
			}
			i++;
			current = current.next;
		}

		return null;
	};

	removeAt = (index) => {
		if (index < 0 || index >= this.size) {
			console.error("Index out of bound");
			return;
		}

		let i = 0;
		let current = this.head;

		while (current) {
			if (i === index - 1) {
				current.next = current.next.next;
				this.size--;

				if (current.next === null) {
					this.tail = current;
				}
				return;
			}
			i++;
			current = current.next;
		}
	};

	getSize = () => {
		return this.size;
	};

	getHead = () => {
		return this.head;
	};

	getTail = () => {
		return this.tail;
	};
}
