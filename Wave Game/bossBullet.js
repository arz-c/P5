class BossBullet {
    constructor(fillColor, x, y, size, speed) {
        this.fillColor = fillColor;
        this.pos = createVector(x, y);
        this.size = size;
        this.speed = speed;

        this.vel = createVector(0, speed);
        this.insideEnemy = false;
        this.border = 1;
    }

    update() {
        this.pos.add(this.vel);
    }

    show() {
        stroke(0);
        strokeWeight(this.border);
        fill(this.fillColor);
        rect(this.pos.x + (this.border / 2), this.pos.y + (this.border / 2), this.size, this.size);
    }

    outOfScreen() {
        return (this.pos.y + this.size > width);
    }

    isCollidePlayer(player) {
        if(collideRectRect(this.pos.x,   this.pos.y,   this.size, this.size,
                           player.pos.x, player.pos.y, player.s,  player.s)) {
            if(!this.insideEnemy) {
                this.insideEnemy = true;
                return true;
            } else {
                return false;
            }
        } else {
            this.insideEnemy = false;
        }
    }
}