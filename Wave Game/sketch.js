let healthbar;
let player;
let enemies;
let stage;
let isBoss;
let enemyHandlerInterval, stageHandlerInterval, bossBulletInterval, bossTimeout;

function init() {
    healthbar = new Healthbar(0, 0, width, 10, 100);
    player.init();
    enemies = [];
    stage = 1;
    isBoss = false;

    clearInterval(bossBulletInterval);
    clearInterval(bossTimeout);
    setStageHandler();
    enemyHandlerInterval = setInterval(enemyHandler, gameOptions.enemyInterval * 1000);
}

function setup() {
    createCanvas(800, 800);
    player = new Player();
    init();
}

function draw() {
    //if(document.hidden) console.log("HIDDEN");
    background(128);

    player.update();
    player.show();
    
    for(let i = enemies.length - 1; i >= 0; i--) {
        if(enemies[i].constructor.name == "BossBullet" &&
            enemies[i].outOfScreen())
                enemies.splice(i, 1);
    } 

    for(let enemy of enemies) {
        enemy.update();   
        
        if(enemy.isCollidePlayer(player)) {
            switch(enemy.constructor.name) {
                case "Enemy":
                    healthbar.reduce(10);
                    break;
                case "BossBullet":
                    healthbar.reduce(5);
                    break;
                case "Boss":
                    healthbar.reduce(50);
                    break;
    
            }
            //console.log("HEALTH:", healthbar.health);
        }

        enemy.show();
    }

    if(isBoss) {
        //console.log(enemies[0].state);
        if(enemies[0].state == -2) {
            bossBulletInterval = setInterval(function() {
                enemies.push(new BossBullet(
                    enemies[0].fillColor,
                    enemies[0].pos.x + enemies[0].w / 2,
                    enemies[0].pos.y + enemies[0].h,
                    enemies[0].w * 0.1,
                    abs(enemies[0].vel.x) * 2 
                ));
            }, 1000 / enemies[0].attackSpeed);
            enemies[0].state = -1;
        }
        if(enemies[0].state == 2) {
            isBoss = false;
            clearInterval(bossBulletInterval);
            enemies.splice(0, 1);

            stage++;
            setStageHandler();
        }
    }

    if(healthbar.health <= 0) {
        clearInterval(stageHandlerInterval);
        clearInterval(enemyHandlerInterval);
        init();
    }

    fill(0);
    noStroke();
    textSize(64);
    textFont('Georgia');
    textAlign(RIGHT);
    text(stage, width - 10, 70);
    healthbar.show();
}

function keyPressed() {
    for(let currentKey in controls) {
        for(let button of controls[currentKey].buttons) {
            if(key == button) {
                let keyPressedParams = controls[currentKey].params;
                player.move(currentKey, keyPressedParams[0], keyPressedParams[1]);
            }
        }
    }
}

function keyReleased() {
    for(let currentKey in controls) {
        for(let button of controls[currentKey].buttons) {
            if(key == button) {
                player.stop(currentKey);
            }
        }
    }
}