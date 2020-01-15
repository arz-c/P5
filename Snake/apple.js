class Apple {
    constructor() {
        this.s = 1;
        this.pos = createVector(
            floor(random(width / rez - this.s)),
            floor(random(height / rez - this.s))
        );
    }

    show() {
        noStroke();
        fill(231, 76, 60);
        rect(this.pos.x, this.pos.y, this.s, this.s);
    }
}