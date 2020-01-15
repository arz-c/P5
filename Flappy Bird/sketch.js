const PIPE_DIST = 100;

let score;
let level;
let panSpeed;
let gravity;
let player;

let pipes;
let towards_pipe;
let towards_pair;
let last_pipe_height;

function setup() {
    window.canvas = createCanvas(windowWidth * 0.99, windowHeight * 0.99);

    score = 0;
    level = 1;
    panSpeed = 5;
    gravity = 0.5;
    player = new Player(canvas.width / 2, canvas.height / 2);

    last_pipe_height = floor(random(canvas.height / 2 - 100, canvas.height / 2 + 100));
    pipes = [];
    towards_pipe = new Pipe();
    towards_pair = new PipePair(towards_pipe);
    pipes.push({pipe: towards_pipe, pair: towards_pair});
}

function draw() {
    background(135, 205, 250);

    // Update Methods
    player.update();

    for(let cur_pipes of pipes) {
        cur_pipes["pipe"].update();
        cur_pipes["pair"].update();
    }

    if(pipes[pipes.length - 1]["pipe"].dist_traveled >= PIPE_DIST) {
        let pipe = new Pipe();
        pipes.push({pipe: pipe, pair: new PipePair(pipe)});
    }

    if(player.x > towards_pipe.x + towards_pipe.width) {
        if(pipes[score + 1]) {
            towards_pipe = pipes[score + 1]["pipe"];
            towards_pair = pipes[score  + 1]["pair"];
            score++;
            if(score % 10 == 0) {
                level++;
            }
        }
    }

    // Collision detection
    if( isCollide(player.x, player.y, player.size / 2, towards_pipe.x, towards_pipe.y, towards_pipe.width, towards_pipe.height) ||
        isCollide(player.x, player.y, player.size / 2, towards_pair.x, towards_pair.y, towards_pair.width, towards_pair.height)) {
            setup();
    }

    // Show methods
    player.show();
    for(let cur_pipes of pipes) {
        cur_pipes["pipe"].show();
        cur_pipes["pair"].show();
    }

    textSize(32);
    fill(0, 102, 153);
    text(score, 10, 30);
}

function keyPressed() {
    switch(key) {
        case ' ' :
            player.flap();
            break;
    }
}

function isCollide(px, py, pr, rx, ry, rw, rh) {
    if( ((px + pr) > rx) && ((px + pr) < (rx + rw)) || 
        ((px - pr) > rx) && ((px - pr) < (rx + rw))) {
        if( ((py + pr) > ry) && ((py + pr) < (ry + rh)) || 
            ((py - pr) > ry) && ((py - pr) < (ry + rh))) {
                return true;
        }
    }
    return false;
}