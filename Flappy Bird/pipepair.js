class PipePair {
    constructor(pair) {
        this.width = pair.width;
        this.height = canvas.height - pair.height - 200;

        this.x = pair.x;
        this.y = 0;
    }

    show() {
        fill(constrain(level * 30, 0, 255), constrain(204 - level * 30, 0, 255), 0);
        rect(this.x, 0, this.width, this.height);
    }

    update() {
        this.x -= panSpeed;
    }
}