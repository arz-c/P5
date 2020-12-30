class Button {
    constructor(fillColor, selectColor, x, y, w, h) {
        this.fillColor = fillColor;
        this.selectColor = selectColor;
        this.pos = createVector(x, y);
        this.w = w;
        this.h = h;
        this.callback = callback;

        this.border = 3;
        this.isHovered = false;
    }

    contains(x, y) {
        return (x < this.pos.x + this.w && x > this.x &&
                y < this.pos.y + this.h && y > this.y);
    }

    show() {
        if(this.isHovered) fill(this.fillColor);
        else fill(this.selectColor);
        stroke(0);
        strokeWeight(this.border);
        rect(
            this.x + (this.border / 2),
            this.y + (this.border / 2),
            this.w - (this.border / 2),
            this.h - (this.border / 2)
        );
    }
}