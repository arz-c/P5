class Enemy {
    constructor(fillColor, x, y, w, h, speed) {
        this.fillColor = fillColor;
        this.pos = createVector(x, y);
        this.w = w;
        this.h = h;
        this.speed = speed;
        this.insideEnemy = false;

        this.vel = this.angleFromWallCollision();
        this.angleDiff = 25;
        this.border = 1;
        this.alpha = 0;
        this.state = -1; // -1: init, 0: normal
    }

    update() {
        switch(this.state) {
            case -1:
                if(this.alpha < 200) {
                    this.alpha += 10;
                } else {
                    this.state = 0;
                }
                break;
            case 0:
                let wallCollisionInfo = this.isCollideWall();
                if(wallCollisionInfo) {
                    this.vel = this.angleFromWallCollision(wallCollisionInfo);
                }
        
                this.pos.add(this.vel);
                break;
        }
    }

    show() {
        stroke(0, this.alpha);
        strokeWeight(this.border);
        let r = this.fillColor.levels[0];
        let g = this.fillColor.levels[1];
        let b = this.fillColor.levels[2];
        fill(r, g, b, this.alpha);
        rect(this.pos.x + (this.border / 2), this.pos.y + (this.border / 2), this.w, this.h);
    }

    isCollidePlayer(player) {
        if(this.state != 0) return;
        if(collideRectRect(this.pos.x,   this.pos.y,   this.w,   this.h,
                           player.pos.x, player.pos.y, player.s, player.s)) {
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

    isCollideWall() {
        let returnVal = false;

        if(this.pos.x <= 0)                       returnVal = [-1, 0];  // left
        else if(this.pos.x > (width - this.w))    returnVal = [1, 0];   // right
        else if(this.pos.y <= 0)                  returnVal = [0, -1];   // up
        else if(this.pos.y > (height - this.h))   returnVal = [0, 1];    // down
        
        if(returnVal != false) {
            if(this.pos.x < 0)                  this.pos.x = 0;
            if(this.pos.y < 0)                  this.pos.y = 0;
            if(this.pos.x > (width - this.w))   this.pos.x = (width - this.w);
            if(this.pos.y > (height - this.h))  this.pos.y = (height - this.h);
            return returnVal;
        }
        return false;
    }

    angleFromWallCollision(collisionInfo) {
        let angle;

        if(!collisionInfo) {
            angle = floor(random(TWO_PI));
        } else {
            if(collisionInfo[0] == -1 && collisionInfo[1] ==  0) angle = random(0 + this.angleDiff,      180 - this.angleDiff);
            if(collisionInfo[0] ==  1 && collisionInfo[1] ==  0) angle = random(-180 + this.angleDiff,   0 - this.angleDiff);
            if(collisionInfo[0] ==  0 && collisionInfo[1] == -1) angle = random(90 + this.angleDiff,     270 - this.angleDiff);
            if(collisionInfo[0] ==  0  && collisionInfo[1] == 1) angle = random(-270 + this.angleDiff,   90 - this.angleDiff);
        }
        return createVector(cos(radians(angle)) * this.speed, sin(radians(angle)) * this.speed);
    }
}