import { Node, LinkedList } from "./linkedList";


class Hashmap { 
    constructor(){
        this.bucket = new Array(16);
        this.loadFactor = .75;
        this.capacity = 16;
    }

    hash = (key) => {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
     
        return hashCode;
    }

    set = (key, value) => {
        let newNode = new Node(value);


    }


}