class Node {
	value = null;
	next = null;

	constructor(value) {
		this.value = value;
	}
}

//[ NODE(head) ] -> [ NODE ] -> [ NODE(tail) ] -> null

class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	appened = (value) => {
		const newNode = new Node(value);

		if (this.head === null) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}

		this.size++;
	};

	prepend = (value) => {
		const newNode = new Node(value);
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

	insertAt = (value, index) => {};

	removeAt = (index) => {};

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

const list = new LinkedList();
list.appened(0);
list.appened(1);
list.appened(2);
list.appened(3);
list.appened(4);
list.appened(5);

console.log(`Size: ` + list.getSize());
console.log(list.toString());
console.log(list.find(4));
console.log(list.find(8));
console.log(list.at(4));
list.pop();
console.log(list.toString());
console.log(list.contains(4));
