class Node {
	constructor(value) {
		this.value = value;
		this.right = null;
		this.left = null;
	}
}

class Tree {
	constructor(array) {
		if (array.length === 0) throw new Error("Empty Array");

		this.array = [...new Set(array.sort((a, b) => a - b))];
		this.root = this.buildTree(this.array);
	}

	prettyPrint = (node, prefix = "", isLeft = true) => {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
		}
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
		if (node.left !== null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
		}
	};

	buildTree = (array, start = 0, end = array.length - 1) => {
		if (start > end) return null;

		let mid = Math.floor((start + end) / 2);
		let root = new Node(array[mid]);

		root.left = this.buildTree(array, start, mid - 1);
		root.right = this.buildTree(array, mid + 1, end);
		return root;
	};

	insert = (value, current = this.root) => {
		if (current === null) return new Node(value);
		if (current.value === value) return current;

		if (value < current.value) {
			current.left = this.insert(value, current.left);
		} else {
			current.right = this.insert(value, current.right);
		}

		return current;
	};

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

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
console.log(tree.root);
tree.prettyPrint(tree.root);
