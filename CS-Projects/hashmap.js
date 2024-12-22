import { LinkedList } from "./linkedList.js";

class Hashmap {
	constructor() {
		this.capacity = 16;
		this.loadFactor = 0.75;
		this.buckets = Array.from({ length: this.capacity }, () => new LinkedList());
		this.size = 0;
	}

	hash = (key) => {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
		}

		return hashCode;
	};

	set = (key, value) => {
		let hash = this.hash(key);
		//If the bucket is empty: Prepend the new node to the linkedlist
		if (this.buckets[hash].head === null) {
			this.buckets[hash].prepend(key, value);
		} else {
			//If head node === key, update value
			if (this.buckets[hash].head.key === key) {
				this.buckets[hash].head.value = value;
			} else {
				//If buckets contains a key, update the value
				if (this.buckets[hash].contains(key)) {
					let index = this.buckets[hash].find(key);
					this.buckets[hash].at(index).value = value;
				} else {
					//If buckets does not contain a key, append it
					this.buckets[hash].append(key, value);
				}
			}
		}

		console.log(this.buckets[hash].toString());
		this.size++;
		//Resize buckets
		if (this.size > this.capacity * this.loadFactor) {
			this.resize();
		}
	};

	resize = () => {
		console.log("Resizing...");
		let oldBuckets = this.buckets;
		this.capacity *= 2;
		this.size = 0;
		this.buckets = Array.from({ length: this.capacity }, () => new LinkedList());

		oldBuckets.forEach((bucket) => {
			let current = bucket.head;
			while (current) {
				this.set(current.key, current.value);
				current = current.next;
			}
		});
		console.log("Resizing Done.");
	};

	get = (key) => {
		const hash = this.hash(key);
		if (this.buckets[hash].contains(key)) {
			let index = this.buckets[hash].find(key);
			return this.buckets[hash].at(index).value;
		}
		return null;
	};

	has = (key) => {
		const hash = this.hash(key);
		if (this.buckets[hash].contains(key)) return true;
		return false;
	};

	remove = (key) => {
		const hash = this.hash(key);
		if (!this.buckets[hash].contains(key)) return false;

		if (this.buckets[hash].getSize() === 1) {
			this.buckets[hash].pop();
			return true;
		}

		let index = this.buckets[hash].find(key);
		this.buckets[hash].removeAt(index);
		return true;
	};

	length = () => {
		return this.size;
	};

	clear = () => {
		this.capacity = 16;
		this.buckets = Array.from({ length: this.capacity }, () => new LinkedList());
		this.size = 0;
	};

	keys = () => {
		let array = [];
		this.buckets.forEach((bucket) => {
			if (bucket.getSize !== 0) {
				let current = bucket.head;
				while (current) {
					array.push(current.key);
					current = current.next;
				}
			}
		});
		return array;
	};

	values = () => {
		let array = [];
		this.buckets.forEach((bucket) => {
			if (bucket.getSize !== 0) {
				let current = bucket.head;
				while (current) {
					array.push(current.value);
					current = current.next;
				}
			}
		});
		return array;
	};

	entires = () => {
		let keys = this.keys();
		let values = this.values();

		return keys.map((key, index) => [key, values[index]]);
	};
}

let hashMap = new Hashmap();

hashMap.set("apple", "red");
hashMap.set("banana", "yellow");
hashMap.set("carrot", "orange");
hashMap.set("dog", "brown");
hashMap.set("elephant", "gray");
hashMap.set("frog", "green");
hashMap.set("grape", "purple");
hashMap.set("hat", "black");
hashMap.set("ice cream", "white");
hashMap.set("jacket", "blue");
hashMap.set("kite", "pink");
hashMap.set("lion", "golden");
hashMap.set("lion", "silver");

console.log("Key: dog - Value: " + hashMap.get("dog"));
console.log(hashMap.has("ice cream"));
console.log(hashMap.remove("kite"));
console.log(hashMap.length());
hashMap.set("panda", "white");
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entires());
