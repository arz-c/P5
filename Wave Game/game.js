const controls = {
    up: {
        buttons: ["w", "ArrowUp"],
        params: [0, -1]
    },
    left: {
        buttons: ["a", "ArrowLeft"],
        params: [-1, 0]
    },
    down: {
        buttons: ["s", "ArrowDown"],
        params: [0, 1]
    },
    right: {
        buttons: ["d", "ArrowRight"],
        params: [1, 0]
    }
};

// Test Settings
/*

const gameOptions = {
    hardestStage: 5,
    stageInterval: 3,
    enemyInterval: 1,
    bossStageInterval: 2,
    bossDuration: 1
};

function mousePressed() {
    if(mouseButton == CENTER) {
        healthbar.reduce(10);
    }
}

*/

const gameOptions = {
    hardestStage: 20,
    stageInterval: 6,
    enemyInterval: 2,
    bossStageInterval: 5,
    bossDuration: 10
};

const enemyOptions = {
    minSize: 15,
    maxSize: 30,
    minSpeed: 8,
    maxSpeed: 16,
    colorFluctuation: 25,
    sizeFluctuation: 5,
    speedFluctuation: 2
};

const bossOptions = {
    minSize: 100,
    maxSize: 200,
    minSpeed: 5,
    maxSpeed: 10,
    minAS: 5,
    maxAS: 10,
};

function setStageHandler() {
    stageHandlerInterval = setInterval(function() {
        stage++;
    }, gameOptions.stageInterval * 1000);
}

function enemyHandler() {
    if(!isBoss) {
        if(stage % gameOptions.bossStageInterval == 0) {
            isBoss = true;
            clearInterval(stageHandlerInterval);

            // easiest: 255, 255, 108
            // hardest: 255, 0, 0
            let bossSize = constrain(map(
                    stage,
                    1,
                    gameOptions.hardestStage,
                    bossOptions.minSize,
                    bossOptions.maxSize),
                bossOptions.minSize,
                bossOptions.maxSize
            );

            enemies = [new Boss(
                color(
                    255,
                    constrain(map(stage, 1, gameOptions.hardestStage, 255, 0), 0, 255),
                    constrain(map(stage, 1, gameOptions.hardestStage, 108, 0), 0, 255)
                ),
                width / 2 - bossSize,
                -bossSize,
                bossSize,
                bossSize,
                constrain(map(
                        stage,
                        1,
                        gameOptions.hardestStage,
                        bossOptions.minSpeed,
                        bossOptions.maxSpeed
                    ),
                    bossOptions.minSpeed,
                    bossOptions.maxSpeed
                ),
                constrain(map(
                        stage,
                        1,
                        gameOptions.hardestStage,
                        bossOptions.minAS,
                        bossOptions.maxAS
                    ),
                    bossOptions.minAS,
                    bossOptions.maxAS
                )
            )];
            
            bossTimeout = setTimeout(function() {
                enemies[0].state = 1;
            }, gameOptions.bossDuration * 1000);

        } else {
            let r = 255;
            let g = constrain(map(
                    stage,
                    1,
                    gameOptions.hardestStage,
                    255 - enemyOptions.colorFluctuation,
                    0 + enemyOptions.colorFluctuation
                ),
                0, 255
            );
            let b = constrain(map(
                    stage,
                    1,
                    gameOptions.hardestStage, 
                    108 - enemyOptions.colorFluctuation,
                    0 + enemyOptions.colorFluctuation
                ), 
            0, 255
            );
            let a = constrain(map(
                    stage,
                    1,
                    gameOptions.hardestStage * 0.75,
                    128 + enemyOptions.colorFluctuation,
                    255 - enemyOptions.colorFluctuation
                ), 
                0, 255
            );
        
            let w = constrain(map(
                    stage,
                    1,
                    gameOptions.hardestStage,
                    enemyOptions.minSize + enemyOptions.sizeFluctuation,
                    enemyOptions.maxSize - enemyOptions.sizeFluctuation
                ),
                enemyOptions.minSize,
                enemyOptions.maxSize
            );
            let h = constrain(map(
                    stage,
                    1,
                    gameOptions.hardestStage,
                    enemyOptions.minSize + enemyOptions.sizeFluctuation,
                    enemyOptions.maxSize - enemyOptions.sizeFluctuation
                ),
                enemyOptions.minSize,
                enemyOptions.maxSize
            );
            let s = constrain(map(
                    stage,
                    1,
                    gameOptions.hardestStage,
                    enemyOptions.minSpeed + enemyOptions.speedFluctuation,
                    enemyOptions.maxSpeed - enemyOptions.speedFluctuation
                ),
                enemyOptions.minSpeed,
                enemyOptions.maxSpeed
            );
            let c = color(
                floor(random(r - enemyOptions.colorFluctuation, r + enemyOptions.colorFluctuation)),
                floor(random(g - enemyOptions.colorFluctuation, g + enemyOptions.colorFluctuation)),
                floor(random(b - enemyOptions.colorFluctuation, b + enemyOptions.colorFluctuation)),
                floor(random(a - enemyOptions.colorFluctuation, a + enemyOptions.colorFluctuation)),
            );
        
            w = floor(random(
                w - enemyOptions.sizeFluctuation,
                w + enemyOptions.sizeFluctuation
            ));
        
            h = floor(random(
                h - enemyOptions.sizeFluctuation,
                h + enemyOptions.sizeFluctuation
            ));
        
            s = floor(random(
                s - enemyOptions.speedFluctuation,
                s + enemyOptions.speedFluctuation
            ));
        
            enemies.push(new Enemy(c, random(width), random(height), w, h, s));
        }
    }
}