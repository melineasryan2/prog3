class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiplay = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    search(char) {
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }

    mul() {
        let found = this.search(0);
        var foundRand = random(found);

        this.multiplay++;
        if (this.multiplay >= 3 && foundRand) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 1
            let gr1 = new Grass(x, y);
            grassArr.push(gr1);
            this.multiplay = 0
        }
    }
}


class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    search(char) {
        this.getNewCoordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }

    mul() {
        let found = this.search(0);
        var foundRand = random(found);

        if (foundRand) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 2
            let newGrassEat = new GrassEater(x, y);
            grassEatArr.push(newGrassEat);
            this.energy = 2
        }

    }

    move() {
        this.energy--
        let found = this.search(0);
        var foundRand = random(found);
        if (foundRand && this.energy >= 0) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
        } else {
            this.die()
        }
    }

    eat() {
        let found = this.search(1);
        var foundRand = random(found);
        let found1 = this.search(4);
        let found1Rand = random(found1);
        let found2 = this.search(5)
        let found2Rand = random(found2)
        if (found1Rand) {
            let x = found1Rand[0];
            let y = found1Rand[1];
            matrix[y][x] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            this.mul()
            for (var i in mulBoostArr) {
                if (x == mulBoostArr[i].x && y == mulBoostArr[i].y) {
                    mulBoostArr.splice(i, 1);
                    break;
                }
            }
        }

        else if (found2Rand) {
            let x = found2Rand[0];
            let y = found2Rand[1];
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            this.die()
            for (let i in virusArr) {
                if (x == virusArr[i].x && y == virusArr[i].y) {
                   virusArr.splice(i, 1);
                    break;
                }
            }
        }

        else if (foundRand) {
            this.energy++
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 20) {
                this.mul()
            }

        }



        else {
            this.move()
        }

    }


    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassEatArr) {
            if (this.x == grassEatArr[i].x && this.y == grassEatArr[i].y) {
                grassEatArr.splice(i, 1);
                break;
            }
        }
    }

}


class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    search(char) {
        this.getNewCoordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }

    move() {
        this.energy--
        let found = this.search(0);
        var foundRand = random(found);
        if (foundRand && this.energy >= 0) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
        } else {
            this.die()
        }
    }

    mul() {
        let found = this.search(0);
        var foundRand = random(found);

        if (foundRand) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 3
            let pred = new Predator(x, y);
            predatorArr.push(pred);
            this.energy = 3
        }
    }

    eat() {
        let found = this.search(1);
        var foundRand = random(found);
        let found1 = this.search(2)
        let foundRand1 = random(found1)
        let found2 = this.search(4)
        let foundRand2 = random(found2)
        let found3 = this.search(5)
        let foundRand3 = random(found3)
        if (foundRand1) {
            this.energy++
            let x = foundRand1[0];
            let y = foundRand1[1];
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            for (var i in grassEatArr) {
                if (x == grassEatArr[i].x && y == grassEatArr[i].y) {
                    grassEatArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 40) {
                this.mul();

            }
        }

        else if (foundRand2) {
            let x = foundRand2[0];
            let y = foundRand2[1];
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            this.mul()
            for (let i in mulBoostArr) {
                if (x == mulBoostArr[i].x && y == mulBoostArr[i].y) {
                    mulBoostArr.splice(i, 1);
                    break;
                }
            }
        }

        else if (foundRand3) {
            let x = foundRand3[0];
            let y = foundRand3[1];
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            this.die()
            for (let i in virusArr) {
                if (x == virusArr[i].x && y == virusArr[i].y) {
                   virusArr.splice(i, 1);
                    break;
                }
            }
        }
        

        else if (foundRand) {
            this.energy++
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 50) {
                this.mul();

            }
        }
        else {
            this.move()
        }

    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}


class Mulboost {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    search(char) {
        this.getNewCoordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }
    move() {
        let found = this.search(0);
        var foundRand = random(found);
        if (foundRand) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
        }
    }
}


class Virus {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
    }
   
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
             [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
  
    search(char) {
        this.getNewCoordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }

    move() {
        let found = this.search(1);
        var foundRand = random(found);
        if (foundRand) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 1
            this.x = x
            this.y = y
        }
    }
}

