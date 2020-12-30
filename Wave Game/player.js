class Player {
    constructor() {
        this.init();

        this.velStack = [{
            key: "default",
            dir: createVector(0, 0)
        }];
        this.vel = this.velStack[this.velStack.length - 1];
        this.border = 5;
    }

    init() {
        this.pos = createVector(width / 2, height / 2);
        this.s = 40;
        this.ms = 5;
    }

    update() {
        //console.log(this.velStack);
        this.vel = this.velStack[this.velStack.length - 1].dir;

        this.pos.add(this.vel);
        this.pos.x = constrain(this.pos.x, 0, width - this.s);
        this.pos.y = constrain(this.pos.y, 0, height - this.s);
    }

    show() {
        stroke(0);
        strokeWeight(this.border);
        fill(lerpColor(color(88, 214, 141), color(231, 76, 60), map(healthbar.health, 0, healthbar.max, 1, 0)));
        rect(this.pos.x + (this.border / 2), this.pos.y + (this.border / 2), this.s, this.s);
    }

    move(char, x, y) {
        this.velStack.push({
            key: char,
            dir: createVector(x * this.ms, y * this.ms)
        });
    }

    stop(char) {
        let index = this.velStack.findIndex(e => e.key == char);
        this.velStack.splice(index, 1);
    }
}