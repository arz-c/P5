const LINE_WIDTH = 10;
const INNER_PIPE_GAP = 100;
const OUTER_PIPE_GAP = 200;
const PAN_SPEED = 5;
const NOISE_FACTOR = 100;
const TRAIL_WIDTH = 25;

const WIDTH = 800;
const HEIGHT = 400;

let player1;
let player2;
let leftPipes;
let rightPipes;

let dead;
let score;

let leftOff;
let rightOff;

function preload() {
  // scoreFont = loadFont('assets/!PaulMaul.ttf');
}

function init() {
  leftOff = random(NOISE_FACTOR);
  rightOff = random(NOISE_FACTOR * 10, NOISE_FACTOR * 100);

  player1 = new Player(width / 2 + 50, height / 2, 10, color(0, 0, 255), 10);
  player2 = new Player(width / 2 - 50, height / 2, 10, color(255, 0, 0), 10);
  leftPipes = [new Pipe(0, PAN_SPEED, color(0, 0, 128), leftOff)];
  rightPipes = [new Pipe(width, -PAN_SPEED, color(128, 0, 0), rightOff)];

  dead = 0;
  score = 0;
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  init();
}

function draw() {
  if(dead == 0) {
    rectMode(CORNER);
    background(0);

    // Line divider
    stroke(44, 0, 44);
    strokeWeight(LINE_WIDTH);
    line(width / 2, 0, width / 2, height);

    // Player1 updates/shows
    player1.update();
    player1.show();

    // Player2 updates/shows
    player2.update();
    player2.show();

    // Left pipes updates/shows
    for(let i = leftPipes.length - 1; i >= 0; i--) {
      leftPipes[i].update();
      leftPipes[i].show();

      if(leftPipes[i].w <= 0) {
        leftPipes.splice(i, 1);
      }

      if(player2.isCollide(leftPipes[i])) {
        dead = 1;
      }
    }

    // Right pipes updates/shows
    for(let i = rightPipes.length - 1; i >= 0; i--) {
      rightPipes[i].update();
      rightPipes[i].show();

      if(rightPipes[i].w <= 0) {
        rightPipes.splice(i, 1);
      }

      if(player1.isCollide(rightPipes[i])) {
        dead = 1;
      }
    }

    if(leftPipes[leftPipes.length - 1].x >= OUTER_PIPE_GAP) {
      //console.log(leftPipes[leftPipes.length - 1].x, '>=', PIPE_GAP)
      leftPipes.push(new Pipe(0, PAN_SPEED, color(0, 0, 128), leftOff));
      leftOff += NOISE_FACTOR;
    }

    if(rightPipes[rightPipes.length - 1].x <= width - OUTER_PIPE_GAP) {
      //console.log(rightPipes[rightPipes.length - 1].x, '<=', width - PIPE_GAP)
      rightPipes.push(new Pipe(width, -PAN_SPEED, color(128, 0, 0), rightOff));
      rightOff += NOISE_FACTOR;
    }

    if(dead == 0) {
      fill(255);
      // textFont(scoreFont);
      textSize(56);
      textAlign(RIGHT);
      //console.log(deltaTime);
      score += floor(deltaTime / 10);
      
      text(score, width - 5, height - 5);
    }
  } else if(dead == 1) {
      fill(200, 170);
      rect(0, 0, width, height);
      fill(255);
      // textFont(scoreFont);
      textSize(56);
      textAlign(CENTER)
      text(score, width / 2, height / 2);

      fill(0);
      noStroke();
      rectMode(CENTER);
      rect(width / 2, height / 2 + 100, 400, 100);
      fill(255);
      textAlign(CENTER);
      textSize(40);
      text("PRESS ANYTHING", width / 2, height / 2 + 93);
      text("TO TRY AGAIN", width / 2, height / 2 + 135);

      dead = 2;
  }
}

function keyPressed() {
  if(key == "ArrowUp") {
    player1.velY = -player1.ms;
  } else if(key == "ArrowDown") {
    player1.velY = +player1.ms;
  } else if(key == "w") {
    player2.velY = -player2.ms;
  } else if(key == "s") {
    player2.velY = +player2.ms;
  }
  
  console.log(dead);
  if(dead == 2) {
    init();
  }
}
function keyReleased(){
  if(key == "ArrowUp" || key == "ArrowDown") {
    player1.velY = 0;
  } else if(key == "w" || key == "s") {
    player2.velY = 0;
  }
}