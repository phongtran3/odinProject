import { Node, LinkedList } from "./linkedList";


class Hashmap { 
    constructor(){
        this.capacity = 16;
        this.loadFactor = .75;
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
    }

    /*
    Create a new node with the given value
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
        let newNode = new Node(value);
        let hash = this.hash(key);




    }


}