class Healthbar {
    constructor(x, y, w, h, max) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.max = max;
        this.health = max; 

        this.border = 10;
    }

    reduce(amount) {
        this.health -= amount;
    }

    show() {
        // Background
        stroke(0);
        strokeWeight(this.border)
        fill(0);
        rect(this.x + (this.border / 2), this.y + (this.border / 2), this.w - this.border, this.h);

        // Bar
        noStroke();
        fill(lerpColor(color(88, 214, 141), color(231, 76, 60), map(this.health, 0, this.max, 1, 0)));
        rect(this.x + (this.border / 2), this.y + (this.border / 2), this.w * (this.health / this.max) - this.border, this.h);

        // Increments
        for(let i = 10; i < this.max; i += 10) {
            stroke(0);
            strokeWeight(3);
            noFill();
            let mappedX = map(i, 0, this.max, 0, this.w);
            line(mappedX, this.border / 2, mappedX, (this.border / 2) + this.h);
        }
    }
}