const rez = 20;
let player;
let apple;

function setup() {
    createCanvas(800, 800);
    frameRate(7);
    player = new Player();
    apple = new Apple();
}

function draw() {
    scale(rez);
    background(0);

    if(player.canEat(apple)) {
        apple = new Apple();
        player.extendTail();
    }
    
    player.update();
    player.show();
    apple.show();

    if(player.isDead()) {
        setup();
    }
}

function keyPressed() {
    if(keyCode == UP_ARROW || key == "w") {
        player.setDir(0, -1);
    } else if(keyCode == RIGHT_ARROW || key == "d") {
        player.setDir(1, 0);
    } else if(keyCode == DOWN_ARROW || key == "s") {
        player.setDir(0, 1);
    } else if(keyCode == LEFT_ARROW || key == "a") {
        player.setDir(-1, 0);
    }
}