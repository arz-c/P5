class Pipe {
  constructor(x, panSpeed, color, xoff) {
    this.panSpeed = panSpeed;
    this.gap = INNER_PIPE_GAP;
    this.color = color;

    this.x = x;
    this.w = 25;
    
    // this.h1 = floor(random(0, height - this.gap));
    this.h1 = floor(noise(xoff) * (height - this.gap));
    this.y1 = 0;

    this.h2 = height - this.h1 - this.gap;
    this.y2 = height - this.h2;

    this.isDying = false;
  }

  update() {
    if(!this.isDying) {
      this.x += this.panSpeed;
    } else {
      this.w -= abs(this.panSpeed);
    }

    let lineW;
    if(this.panSpeed > 0) {
      lineW = -LINE_WIDTH / 2;
    } else if(this.panSpeed < 0) {
      lineW = +LINE_WIDTH / 2;
    }
    
    if(this.x == width / 2 + lineW) {
      this.isDying = true;
    }
  }

  show() {
    fill(this.color);
    noStroke();
    rect(this.x, this.y1, this.w, this.h1);
    rect(this.x, this.y2, this.w, this.h2);
  }
}