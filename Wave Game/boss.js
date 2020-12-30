class Boss {
    constructor(fillColor, x, y, w, h, moveSpeed, attackSpeed) {
        this.fillColor = fillColor;
        this.pos = createVector(x, y);
        this.w = w;
        this.h = h;
        this.vel = createVector(0, 10);
        this.moveSpeed = moveSpeed;
        this.attackSpeed = attackSpeed;

        this.border = 5;
        this.insideEnemy = false;
        this.state = -3; // -3: init y movement, -2: waiting for bullets, -1: init x movement, 0: still going, 1: last round, 2: out of screen
    }

    update() {
        this.pos.add(this.vel);
        
        switch(this.state) {
            case -3:
                if(this.pos.y >= this.border) {
                    this.vel.y = 0;
                    this.state = -2;
                }
                break;
            case -1:
                this.vel.x = this.moveSpeed;
                this.state = 0;
            case 0:
                if(this.pos.x + this.w > width || this.pos.x < 0) {
                    this.vel.x *= -1;
                }
                break;
            case 1:
                if(this.pos.x + this.w < 0 || this.pos.x > width) {
                    this.state = 2;
                }
                break;
        }
    }

    show() {
        stroke(0);
        strokeWeight(this.border);
        fill(this.fillColor);
        rect(this.pos.x + (this.border / 2), this.pos.y + (this.border / 2), this.w, this.h);
    }

    setState(state) {
        this.state = state;
    }

    isCollidePlayer(player) {
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
}