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

	insert = (value, root = this.root) => {
		if (root === null) return new Node(value);
		if (root.value === value) return root;

		if (value < root.value) {
			root.left = this.insert(value, root.left);
		} else {
			root.right = this.insert(value, root.right);
		}

		return root;
	};

	deleteItem = (value, root = this.root) => {
		if (root === null) return root;

		if (value < root.value) {
			root.left = this.deleteItem(value, root.left);
		} else if (value > root.value) {
			root.right = this.deleteItem(value, root.right);
		} else {
			if (root.left === null) return root.right;
			if (root.right === null) return root.left;

			let successor = root.right;
			while (successor.left !== null) {
				successor = successor.left;
			}
			root.value = successor.value;
			root.right = this.deleteItem(successor.value, root.right);
		}

		return root;
	};

	find = (value) => {
		let root = this.root;
		while (root) {
			if (value === root.value) return root;
			if (value < root.value) {
				root = root.left;
			} else {
				root = root.right;
			}
		}
		return null;
	};

	levelOrder = (callBack) => {
		if (typeof callBack !== "function") {
			console.error("Provided callback is not a function.");
			return null;
		}
		if (this.root === null) return;
		let queue = [];
		queue.push(this.root);

		while (queue.length > 0) {
			let node = queue.shift();
			callBack(node.value);
			if (node.left) queue.push(node.left);
			if (node.right) queue.push(node.right);
		}
	};

	inOrder = (callBack) => {
		if (typeof callBack !== "function") {
			console.error("Provided callback is not a function.");
			return null;
		}

		const inOrderTraversal = (root) => {
			if (root === null) return;
			inOrderTraversal(root.left);
			callBack(root.value);
			inOrderTraversal(root.right);
		};

		inOrderTraversal(this.root);
	};

	preOrder = (callBack) => {
		if (typeof callBack !== "function") {
			console.error("Provided callback is not a function.");
			return null;
		}

		const preOrderTravseral = (root) => {
			if (root === null) return;
			callBack(root.value);
			preOrderTravseral(root.left);
			preOrderTravseral(root.right);
		};

		preOrderTravseral(this.root);
	};

	postOrder = (callBack) => {
		if (typeof callBack !== "function") {
			console.error("Provided callback is not a function.");
			return null;
		}

		const postOrderTraversal = (root) => {
			if (root === null) return;
			postOrderTraversal(root.left);
			postOrderTraversal(root.right);
			callBack(root.value);
		};

		postOrderTraversal(this.root);
	};

	height = (value) => {
		let targetNode = this.find(value);
		if (!targetNode) {
			console.error("Node doesn't exist in the tree.");
			return null;
		}

		const findHeight = (targetNode) => {
			if (targetNode === null) return -1;
			let left = findHeight(targetNode.left);
			let right = findHeight(targetNode.right);
			return Math.max(left, right) + 1;
		};

		return findHeight(targetNode);
	};

	depth = (value) => {
		if (!this.find(value)) {
			console.error("Node doesn't exist in the tree.");
			return null;
		}

		let root = this.root;
		let depth = 0;

		while (root.value !== value) {
			if (value < root.value) {
				root = root.left;
			} else {
				root = root.right;
			}
			depth++;
		}

		return depth;
	};

	isBalance = () => {};
	rebalance = () => {};
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);

tree.insert(100);
tree.prettyPrint(tree.root);
tree.deleteItem(324);
console.log(`---------------------`);
tree.prettyPrint(tree.root);
console.log(`---------------------`);
console.log(tree.find(1));
console.log(`---------------------`);
console.log(tree.height(8));
console.log(`---------------------`);
console.log(tree.depth(8));
console.log(`-----Level Order-----`);
tree.levelOrder((node) => console.log(node));
console.log(`-------In Order-------`);
tree.inOrder((node) => console.log(node));
console.log(`-------Pre Order------`);
tree.preOrder((node) => console.log(node));
console.log(`-------Post Order-----`);
tree.postOrder((node) => console.log(node));
console.log(`---------------------`);
