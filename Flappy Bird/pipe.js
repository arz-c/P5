class Pipe {
    constructor() { 
        this.dist_traveled = 0;
        this.width = 100;
        this.x = canvas.width + this.width;

        let level_max = floor(constrain(level * (canvas.height / 10), 0, canvas.height - 0));
        let level_min = floor(level_max - (canvas.height / 20));
        let dir = floor(random(0, 2)) ? 1 : -1;
        let randomness = floor(random(level_min, level_max)) * dir;
        
        if((last_pipe_height + randomness <= canvas.height - 200) && (last_pipe_height + randomness >= 0)) {
            this.height = last_pipe_height + randomness;
        } else if((last_pipe_height - randomness <= canvas.height - 200) && (last_pipe_height - randomness >= 0)) {
            this.height = last_pipe_height - randomness;
        } else {
            this.height = (dir > 0) ? canvas.height - 200 : 0;
        }
        
        this.y = canvas.height - this.height;
        //console.log(level_min, level_max, dir, randomness, last_pipe_height, this.height);

        last_pipe_height = this.height;
    }

    show() {
        fill(constrain(level * 30, 0, 255), constrain(204 - level * 30, 0, 255), 0);
        rect(this.x, canvas.height - this.height, this.width, this.height);
    }

    update() {
        this.x -= panSpeed;
        this.dist_traveled++;
    }
}

/*

min_height = max(100, prev_height * (100 - level * 10) / 100))
max_height = min(canvas.height - 0, prev_height * (100 + level * 10) / 100))

canvas.height = 1000
level       level_max       level_min
1           100             50
2           200             150
3           300             250
8           800             350
9           800             450

level_max = constrain(level * (canvas.height / 10), 0, canvas.height - 0);
level_min = level_max - (canvas.height / 20);
dir = floor(random(0, 1)) ? 1 : -1;
randomness = floor(random(level_min, level_max)) * dir;

last_pipe_height        level_max           dir     new
700                     400                 +       700 - 400
500                     350                 -       500 + 350

if((last_pope_height + randomness <= canvas.height - 0) && (last_pipe_height + randomness >= 0)) {
    this.height = last_pope_height + randomness;
} else if((last_pope_height - randomness <= canvas.height - 0) && (last_pipe_height - randomness >= 0)) {
    this.height = last_pope_height - randomness;
} else {
    this.height = dir ? canvas.height - 0 : 0;
}


*/