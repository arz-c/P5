class Player {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.size = 40;
        this.velStack = [{
            key: "default",
            dir: createVector(0, 0)
        }];
        this.vel = this.velStack[this.velStack.length - 1];
    }

    update() {
        this.vel = this.velStack[this.velStack.length - 1].dir;

        this.pos.add(this.vel);
        this.pos.x = constrain(this.pos.x, 0, width - this.size);
        this.pos.y = constrain(this.pos.y, 0, height - this.size);
    }

    show() {
        noStroke();
        fill(88, 214, 141);
        rect(this.pos.x, this.pos.y, this.size, this.size);
    }

    move(char, x, y) {
        this.velStack.push({
            key: char,
            dir: createVector(x * 3, y * 3)
        });
    }

    stop(char) {
        let index = this.velStack.findIndex(e => e.key == char);
        this.velStack.splice(index, 1);
    }
}