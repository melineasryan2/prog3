let matrix = generate(60, 40, 25, 10, 35, 25)

let side = 10;
let grassArr = [];
let grassEatArr = [];
let predatorArr = [];
let mulBoostArr = [];
let virusArr = [];


function generate(matLen, gr, grEat, pred, mB,virus) {
    let matrix = []
    for (let i = 0; i < matLen; i++) {
        matrix[i] = []
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }

    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }

    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }

    for (let i = 0; i < mB; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
    for (let i = 0; i < virus; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }


    return matrix
}


function setup() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                let grEat = new GrassEater(x, y)
                grassEatArr.push(grEat)
            }

            else if (matrix[y][x] == 3) {
                let pred = new Predator(x, y)
                predatorArr.push(pred)
            }
            else if (matrix[y][x] == 4) {
                let mB = new Mulboost(x, y)
                mulBoostArr.push(mB)
            }
            else if (matrix[y][x] == 5) {
                let virus = new Virus(x, y)
                virusArr.push(virus)
            }
        }
    }

    frameRate(20);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
}


function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("lightgreen");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }

            else if (matrix[y][x] == 2) {
                fill('yellow');
            }
            else if (matrix[y][x] == 3) {
                fill('darkred');
            }
            else if (matrix[y][x] == 4) {
                fill('orange');
            }
            else if (matrix[y][x] == 5) {
                fill('black');
            }
            rect(x * side, y * side, side, side);
        }
    }

    for (let i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEatArr) {
        grassEatArr[i].eat()
    }

    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for (let i in mulBoostArr) {
        mulBoostArr[i].move()
    }
    for(let i in virusArr){
        virusArr[i].move()
    }
}

