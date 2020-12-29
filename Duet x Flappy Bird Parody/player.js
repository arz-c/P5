class Player {
  constructor(x, y, r, color, ms) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.ms = ms;

    this.velY = 0;
    this.history = [];
  }

  update() {
    this.y += this.velY;
    this.y = constrain(this.y, this.r, height - this.r);

    for(let i = this.history.length - 1; i >= 0; i--) {
      this.history[i].alpha -= 255 / 3;
      if(this.history[i].alpha <= 0) this.history.splice(i, 1);
    }

    this.history.push({y: this.y, alpha: 255});
  }

  show() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);

    fill(red(this.color) / 2, blue(this.color) / 2, blue(this.color) / 2);
    noStroke();
    for(let trail of this.history) {
      ellipse(this.x, trail.y, this.r * 2, this.r * 2);
    }
  }

  isCollide(pipe) {
    return (
      collideRectCircle(
        pipe.x, pipe.y1, pipe.w, pipe.h1,
        this.x, this.y,  this.r) ||
      collideRectCircle(
        pipe.x, pipe.y2, pipe.w, pipe.h2,
        this.x, this.y,  this.r)
    );
  }
}