class Node {
	constructor(value) {
		this.value = value;
		this.right = null;
		this.left = null;
	}
}

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

	levelOrder = (callBack) => {};
	inOrder = (callBack) => {};
	preOrder = (callBack) => {};
	postOrder = (callBack) => {};
	depth = (node) => {};
	isBalance = () => {};
	rebalance = () => {};
}
