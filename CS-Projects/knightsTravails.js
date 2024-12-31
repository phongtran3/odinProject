class Node {
    constructor(coordinates, path){
        this.coordinates = coordinates;
        this.path = path;
    }
}

const possibleMoves = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
]

const isValid = (coordinates) => {
    let x = coordinates[0];
    let y = coordinates[1];
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}


const knightMoves = (start, end) => {
    if(!isValid(start) || !isValid(end)){
        console.log("Invalid Coordinates");
        return;
    }

    if(start[0] === end[0] && start[1] === end[1]){
        console.log("Starting Coordniates match. 0 moves required");
        return;
    }

    const vistedNodes = new Set();
    let queue = [];
    queue.push(new Node(start, [start]));

    while(queue.length > 0){
        let current = queue.shift();
        let [x,y] = current.coordinates;
        let path = current.path;

        if(x === end[0] && y === end[1]){
            let steps = path.length - 1;
            console.log(`You made it in ${steps} moves! Here's your path: `)
            path.forEach(path => console.log(path));
            console.log("---------")
            return;
        }

        for(const [dx, dy] of possibleMoves){
            let newX = dx + x;
            let newY = dy + y;
            let newCoord = [newX, newY];
            let coordKey = `${newX},${newY}`
            
            if(isValid(newCoord) && !vistedNodes.has(coordKey)){
                vistedNodes.add(coordKey);
                queue.push(new Node(newCoord, [...path, newCoord]));
            }

        }

    }
}

knightMoves([3,3],[6,3]);
knightMoves([3,3],[3,3]);
knightMoves([0,0],[6,6]);
knightMoves([0,0],[7,0]);

