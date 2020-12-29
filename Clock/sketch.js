const ORIGIN_X = 350;
const ORIGIN_Y = 350;
const ELLIPSE_W_R = 250;
const ELLIPSE_H_R = 340;

const TIME_TEXT = document.getElementById("time");

function setup() {
    angleMode(DEGREES);
    noLoop();
    createCanvas(700, 700);
    background(222)
   
    draw_now_clock();
    window.setInterval(draw_now_clock, 1000);
}

function draw_now_clock() {
    let d = (new Date()).toUTCString()
    let t = d.substring(d.indexOf(":") - 2, d.indexOf("GMT") - 1).split(":");
    let hrs = (int(t[0]) - 5) % 24;
    t[0] = str(hrs);
    if(hrs < 10)
        t[0] = "0" + t[0];
    TIME_TEXT.innerHTML = t[0] + ":" + t[1] + ":" + t[2];
    // console.log(t);
    draw_clock(hrs, int(t[1]), int(t[2]));
    
}

function draw_clock(hours, mins, secs) {
    // clock
    background(222);

    stroke(0);
    strokeWeight(1);
    ellipse(ORIGIN_X, ORIGIN_Y, ELLIPSE_W_R * 2, ELLIPSE_H_R * 2);

    strokeWeight(10);
    stroke(255, 0, 0);
    point(ORIGIN_X, ORIGIN_Y);

    // hand
    draw_hour_hand(hours, mins, secs);
    draw_min_hand(mins, secs);
    draw_sec_hand(secs);

    // ticks
    for(let theta = 0; theta < 360; theta += 360 / 12) {
        // console.log(theta);
        let coords1 = return_hand(theta);
        let coords2 = return_hand(theta, (20 / (300 * 200)) * ELLIPSE_W_R * ELLIPSE_H_R);
        stroke(255, 0, 0);
        strokeWeight(5);
        line(coords1.x, coords1.y, coords2.x, coords2.y);
    }
}

function return_hand(theta, rf = 0) {
    let r = (ELLIPSE_W_R * ELLIPSE_H_R) / (sqrt((ELLIPSE_W_R + rf) ** 2 * sin(theta) ** 2 + (ELLIPSE_H_R + rf) ** 2 * cos(theta) ** 2))
    let x = cos(theta) * r;
    let y = sin(theta) * r;
    // console.log("x", x, "y", y);
    // console.log("x", ORIGIN_X - x, "y", ORIGIN_Y + y);
    return({x: ORIGIN_X + x, y: ORIGIN_Y + y});
}

function draw_hour_hand(hours, mins, secs) {
    let total_hours = hours + mins / 60 + secs / 60 / 60;
    // console.log(total_hours);
    let theta = 360 * (total_hours / 12) - 90;
    // console.log("hours", total_hours, "theta", theta);
    let coords = return_hand(theta, 200);
    stroke(0);
    strokeWeight(6);
    line(ORIGIN_X, ORIGIN_Y, coords.x, coords.y);
}

function draw_min_hand(mins, secs) {
    let total_mins = mins + secs / 60;
    let theta = 360 * (total_mins / 60) - 90;
    let coords = return_hand(theta, 5);
    stroke(0);
    strokeWeight(3);
    line(ORIGIN_X, ORIGIN_Y, coords.x, coords.y);
}

function draw_sec_hand(secs) {
    let theta = 360 * (secs / 60) - 90;
    let coords = return_hand(theta, 5);
    stroke(0);
    strokeWeight(1);
    line(ORIGIN_X, ORIGIN_Y, coords.x, coords.y);
}