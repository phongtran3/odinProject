const merge = (left, right) => {
    let l = 0;
    let r = 0;
    let array = [];


    return array;
}



const mergeSort = (arr) => {
    if(arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);
    
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
    console.log("Left:", left, "Right:", right);

    return merge(left, right);
}

mergeSort([3, 2, 1, 13, 8, 5, 0, 1]);