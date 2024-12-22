import { Node, LinkedList } from "./linkedList.js";

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

	/*
    Create a hash with the given key
    With the hash, find the corresponding bucket
    If the bucket is empty:
        Prepend the new node to the linkedlist
    If the bucket is not empty:
        Traverse through the linkedlist
            If the current node key === the given key
                update the current node's value
            else
                add the new node to the linkedlist
            increase linkedlist size
    Increase the hashmap size
    Check if hashmap need to grow
        if current size > (capacity * loadFactor) 
            resize the hashmap
        
    */
	set = (key, value) => {
		let hash = this.hash(key);
		if (this.buckets[hash].head === null) {
			this.buckets[hash].prepend(key, value);
		} else {
			if (this.buckets[hash].head.key === key) {
				console.log("Same Key");
				this.buckets[hash].head.value = value;
			} else {
				if (this.buckets[hash].contains(key)) {
					let index = this.buckets[hash].find(key);
					this.buckets[hash].at(index).value = value;
				} else {
					this.buckets[hash].append(key, value);
				}
			}
		}

		console.log(this.buckets[hash].toString());
		this.size++;
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

	get = (key) => {};

	has = (key) => {};

	remove = (key) => {};

	length = () => {};

	keys = () => {};

	values = () => {};

	entires = () => {};
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
