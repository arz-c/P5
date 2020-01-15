const rez = 20;
let music, move, eat, death;
let player;
let apple;

function init() {
    player = new Player();
    apple = new Apple();
}

function setup() {
    createCanvas(800, 800);
    frameRate(7);

    init();
    music = loadSound("Sounds/ambient_music.mp3", function() {
        music.setVolume(0.5);
        music.loop();
    });
    move = loadSound("Sounds/move.mp3", () => move.setVolume(0.5));
    eat = loadSound("Sounds/eat.mp3", () => eat.setVolume(0.5));
    death = loadSound("Sounds/death.mp3", () => death.setVolume(0.5));
}

function draw() {
    scale(rez);
    background(0);

    if(player.canEat(apple)) {
        apple = new Apple();
        player.extendTail();
        if(eat.isLoaded()) eat.play();
    }
    
    player.update();
    player.show();
    apple.show();

    if(player.isDead()) {
        init();
        if(death.isLoaded()) death.play();
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