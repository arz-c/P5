let box_size;
let box_gap;

let board_state;
let elim_board;
let selected_box;

function setup() {
    createCanvas(850, 850);
    background(0)
    noLoop();

    box_size = width / 9;
    box_gap = box_size / 3;

    board_state = [
        [1, 2, 3, 0, 0, 0, 0, 0, 0],
        [0, 0, 4, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]; // default

    /*board_state = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [9, 1, 2, 3, 4, 5, 6, 7, 8],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5]
    ]; // << true */
    
    /*board_state = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 5, 6, 7, 8, 9]
    ]; // << vertical false */

    /*board_state = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [3, 3, 3, 3, 3, 3, 3, 3, 3],
        [4, 4, 4, 4, 4, 4, 4, 4, 4],
        [5, 5, 5, 5, 5, 5, 5, 5, 5],
        [6, 6, 6, 6, 6, 6, 6, 6, 6],
        [7, 7, 7, 7, 7, 7, 7, 7, 7],
        [8, 8, 8, 8, 8, 8, 8, 8, 8],
        [9, 9, 9, 9, 9, 9, 9, 9, 9]
    ]; // << horizontal false */

    /*board_state = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [9, 1, 2, 3, 4, 5, 6, 7, 8],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [2, 3, 4, 5, 5, 7, 8, 9, 1]
    ]; // << square false */

    elim_board = [];
    selected_box = [-1, -1];

    for(let y = 0; y < 9; y++) {
        elim_board.push([]);
        for(let x = 0; x < 9; x++) {
            elim_board[y].push([]);
            for(let i = 0; i < 10; i++) {
                elim_board[y][x].push(0);
            }

            create_box(x, y, false);
            if(board_state[y][x] != 0) {
                let val = board_state[y][x];
                elim_board[y][x][val - 1] = 3;
                elim_board[y][x][9] = val;
                
                create_text(x, y, board_state[y][x], false);
            }
        }
    }

    draw_bold_lines();

    update_selected(0, 0);
}

function draw_bold_lines() {
    strokeWeight(10);
    noFill();
    for(let y = 0; y < 9; y++) {
        if(y % 3 == 0)
            rect(0, y * box_size, width, y * box_size);
        for(let x = 0; x < 9; x++) {
            if(x % 3 == 0)
                rect(x * box_size, 0, x * box_size, height);
        }
    }
}

function create_box(x, y, is_sel) {
    strokeWeight(5);
    if(is_sel)
        fill(244, 194, 194, 100)    
    else
        fill(255);
    rect(x * box_size, y * box_size, box_size, box_size);
}

function create_text(x, y, num = -1, is_editable = true) {
    if(num != -1) {
        textSize(48);
        if(is_editable) // green - manually added numbers
            fill(0, 128, 0);
        else // red - starting board state
            fill(255, 0, 0);
        let rx = x * box_size + box_size / 2 - 48 / 3;
        let ry = y * box_size + box_size / 2 + 48 / 3;
        text(num, rx, ry);

        return;
    }
    
    if(elim_board[y][x][9] != 0) {
        for(let i = 0; i < 9; i++) {
            let val = elim_board[y][x][i];
            if(val == 2 || val == 3) {
                if(val == 2)
                    fill(0, 128, 0);
                else
                    fill(255, 0, 0);

                let rx = x * box_size + box_size / 2 - 48 / 3;
                let ry = y * box_size + box_size / 2 + 48 / 3;
                textSize(48);
                
                text(i + 1, rx, ry);
            }
        }
        return;
    }
    for(let i = 0; i < 9; i++) {
        let val = elim_board[y][x][i];
        if(val == 1) {
            let rx = x * box_size + (i % 3) * box_gap + 24 / 3;
            let ry = y * box_size + (Math.floor(i / 3)) * box_gap + box_gap - 24 / 3;
            textSize(24);
            fill(0);
            text(i + 1, rx, ry);
        }
    }
}

function update_selected(nx, ny) {
    ox = selected_box[0];
    oy = selected_box[1];

    if(ox != -1 && oy != -1) {
        // old box
        create_box(ox, oy, false);
        create_text(ox, oy);
    }

    // new box
    create_box(nx, ny, true);
    create_text(nx, ny);
    selected_box = [nx, ny];

    draw_bold_lines();
}

function mouseClicked() {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            let x = i * box_size;
            let y = j * box_size;
            if( mouseX > x && mouseX < x + box_size &&
                mouseY > y && mouseY < y + box_size     ) {
                    update_selected(i, j);
                }
        }
    }
}

function keyPressed() {
    if(     selected_box[0] != -1   && selected_box[1] != -1
        &&  keyCode >= 49           && keyCode <= 57        ) { // number
            let sx = selected_box[0];
            let sy = selected_box[1];
            
            let sel = elim_board[sy][sx];
            if(sel[9] != 0) return;

            let k = keyCode - 48 - 1;
            
            // refresh box of old colors/text
            create_box(sx, sy, false);
            create_box(sx, sy, true);
            draw_bold_lines();     
            // ----

            if(keyIsDown(SHIFT)) {
                elim_board[sy][sx][k] = 2;
                elim_board[sy][sx][9] = k + 1; 
                board_state[sy][sx] = k + 1;
                //console.log("ADDED", board_state);
                create_text(sx, sy, k + 1, true);
            } else {
                elim_board[sy][sx][k] = !elim_board[sy][sx][k];
                create_text(sx, sy);
            }
    } else if(key == ' ') {
        let sx = selected_box[0];
        let sy = selected_box[1];
        let val = elim_board[sy][sx][9] - 1;

        if(elim_board[sy][sx][val] == 3) return;

        elim_board[sy][sx][val] = 1;
        elim_board[sy][sx][9] = 0;
        board_state[sy][sx] = 0;
        //console.log("REMOVED", board_state);

        // refresh box of old colors
        create_box(sx, sy, false);
        create_box(sx, sy, true);
        // ----

        create_text(sx, sy);

        // refresh box of old text
        draw_bold_lines();
        // ----
    } else {
        let sx = selected_box[0];
        let sy = selected_box[1];
        switch(keyCode) {
            case UP_ARROW:
                if(selected_box[1] > 0)
                    update_selected(sx, sy - 1);
                break;
            case DOWN_ARROW:
                if(selected_box[1] < 8)
                    update_selected(sx, sy + 1);
                break;
            case RIGHT_ARROW:
                if(selected_box[0] < 8)
                    update_selected(sx + 1, sy);
                break;
            case LEFT_ARROW:
                if(selected_box[0] > 0)
                    update_selected(sx - 1, sy);
                break;
        }
    }
}

function eval_button_onclick() {
    console.log(evaluate_board());
}

function evaluate_board() {
    let avail;

    // horizontal
    for(let y = 0; y < 9; y++) {
        avail = [1, 1, 1, 1, 1, 1, 1, 1, 1];
        for(let val of board_state[y]) {
            if(val == 0) // found emtpy box
                return false;
            if(avail[val - 1] == 1)
                avail[val - 1] = 0;
            else
                return false; // found repeating num
        }
    }

    // vertical
    for(let x = 0; x < 9; x++) {
        avail = [1, 1, 1, 1, 1, 1, 1, 1, 1];
        for(let y = 0; y < 9; y++) {
            let val = board_state[y][x];
            if(val == 0) // found emtpy box
                return false;
            if(avail[val - 1] == 1)
                avail[val - 1] = 0;
            else
                return false; // found repeating num
        }
    }

    // square
    for(let j = 0; j < 3; j++) {
        for(let i = 0; i < 3; i++) {
            avail = [1, 1, 1, 1, 1, 1, 1, 1, 1];
            for(let y = 0; y < 3; y++) {
                avail = [1, 1, 1, 1, 1, 1, 1, 1, 1];
                for(let x = 0; x < 3; x++) {
                    let val = board_state[y + j * 3][x + i * 3];
                    if(val == 0) // found emtpy box
                        return false;
                    if(avail[val - 1] == 1)
                        avail[val - 1] = 0;
                    else
                        return false; // found repeating num
                }
            }
        }
    }
    return true;
}