/*
Using iteration, write a function fibs which takes a number and returns an array containing that many numbers from the Fibonacci sequence. 
Using an example input of 8, this function should return the array [0, 1, 1, 2, 3, 5, 8, 13].
*/
const fibs = (num) => {
    let array = [];

    for(let i = 0; i < num; i++){
        if(i === 0) array.push(i);
        else if (i === 1) array.push(1);
        else{
            array.push(array[i - 2] + array[i - 1]);
        }
    }
    return array;
}


const fibsRec = (num) => {
   if(num === 2) return [0,1];
   let array = fibsRec(num - 1);

   array.push(array[array.length - 2] + array[array.length - 1]);
   return array;
}


console.log(fibs(8));
console.log(fibsRec(8));


