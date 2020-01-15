let player;
let enemies;

function setup() {
    createCanvas(800, 800);
    player = new Player();
    enemies = [new Enemy(color(231, 76, 60), 0, 0, 10, 10, 5)];
}

function draw() {
    background(128);

    player.update();
    enemy.update();
    
    player.show();
    enemy.show();
}

function keyPressed() {
    if(key == "w" /*|| keyValue == UP_ARROW*/) {
        player.move("w", 0, -1);
    } else if(key == "a" /*|| keyValue == LEFT_ARROW*/) {
        player.move("a", -1, 0);
    } else if(key == "s" /*|| keyValue == DOWN_ARROW*/) {
        player.move("s", 0, 1);
    } else if(key == "d" /*|| keyValue == RIGHT_ARROW*/) {
        player.move("d", 1, 0);
    }
}

function keyReleased() {
    if(key == "w" || key == "a" || key == "s" || key == "d") player.stop(key);
}