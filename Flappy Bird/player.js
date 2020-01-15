class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velX = panSpeed;
        this.velY = 0;
        this.size = 20;
    }

    update() {
        this.velY += gravity;
        this.y = constrain(this.y + this.velY, this.size / 2, canvas.height - this.size / 2);
    }

    show() {
        noStroke();
        fill(255, 255, 0);
        ellipse(this.x, this.y, this.size);
    }

    flap() {
        this.velY = -10;
    }
}