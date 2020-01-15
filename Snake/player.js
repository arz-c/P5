class Player {
    constructor() {
        this.body = [createVector(0, 0)];
        this.head = this.body[this.body.length - 1];
        this.vel = createVector(0, 0);
        this.s = 1;
    }

    update() {
        let old_head = this.body[this.body.length - 1];
        let new_head = createVector(old_head.x, old_head.y);
        this.body.shift();
        new_head.add(this.vel);
        this.body.push(new_head);
        
        this.head = new_head;
    }

    show() {
        noStroke();
        for(let part of this.body) {
            if(part.x == this.head.x && part.y == this.head.y) fill(39, 174, 96)
            else fill(46, 204, 113);
            rect(part.x, part.y, this.s, this.s);
        }
    }

    setDir(x, y) {
        if(this.body.length == 1) {
            this.vel.x = x;
            this.vel.y = y;
            return;
        } else {
            if(this.vel.x != -x) this.vel.x = x;
            if(this.vel.y != -y) this.vel.y = y;
        }    
    }

    canEat(apple) {
        if(this.head.x == apple.pos.x && this.head.y == apple.pos.y)
            return true;
        return false;
    }

    extendTail() {
        let temp_head = createVector(this.head.x, this.head.y);
        temp_head.add(this.vel);
        this.body.unshift(temp_head);
    }

    isDead() {
        if((
            this.head.x < 0 ||
            this.head.x > width / rez ||
            this.head.y < 0 ||
            this.head.y > height / rez)) {
                return true;
        }
        
        for(let i = 0; i < this.body.length - 1; i++) {
            let part = this.body[i];
            if(this.head.x == part.x && this.head.y == part.y)
                return true;
        }
        
        return false;
    }
}