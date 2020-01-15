class Enemy {
    constructor(fillColor, x, y, w, h, speed) {
        this.fillColor = fillColor;
        this.pos = createVector(x, y);
        this.w = w;
        this.h = h;
        this.speed = speed;

        this.vel = this._newDir(1, 1);
    }

    update() {
        let xDir = 0
        let yDir = 0;

        if(this.pos.x < this.w) xDir = 1;
        if(this.pos.x > width - this.w) xDir = -1;
        if(this.pos.y < this.h) yDir = 1;
        if(this.pos.y > height - this.h) yDir = -1;

        if(xDir || yDir) this.vel = this._newDir(xDir, yDir);

        this.pos.add(this.vel);
    }

    show() {
        noStroke();
        fill(this.fillColor);
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }

    _newDir(x, y) {
        let newX, newY;
        
        if(x > 0) {
            newX = floor(random(this.speed));
        } else if(x < 0) {
            newX = floor(random(-this.speed, 0));
        } else {
            if(floor(random(2))) {
                newX = floor(random(this.speed));
            } else {
                newX = floor(random(-this.speed, 0));
            }
        }
        
        if(y > 0) {
            newY = this.speed - abs(newX);
        } else if(y < 0) {
            newY = -(this.speed - abs(newX));
        } else {
            if(floor(random(2))) {
                newY = this.speed - abs(newX);
            } else {
                newY = -(this.speed - abs(newX));
            }
        }
    
        return createVector(newX, newY);
    }
}