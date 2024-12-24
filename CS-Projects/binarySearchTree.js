import { Node } from "./linkedList.js";

class Tree {
	constructor(array) {
		this.array = [...new Set(array.sort((a, b) => a - b))];
		this.root = this.buildTree(this.array);
	}

	buildTree = (array, start = 0, end = array.length - 1) => {
		if (array.length === 0) throw new Error("Empty Array");
	};

	insert = (value) => {};

	deleteItem = (value) => {};

	find = (value) => {};
}
