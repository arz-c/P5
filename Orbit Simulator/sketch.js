const G = 6.67 * 10 ** (-11);
const GRAVITY_POWER = -2; // Bertrand's Theorem: only 1 and -2 can closed orbits that are not circular

let sun;
let planet;
let vel;
let massSlider;

let paused;
let timeSlider;

let hue;
let hueIncreasing;

function setup() {
    colorMode(HSB, 255);
    angleMode(DEGREES);
    frameRate(60);

    createCanvas(800, 800);
    background("black")
    
    sun = createVector(400, 400);
    planet = createVector(400, 250);

    // ------ CONTROL INITIAL VELOCITY FROM HERE ------

    // Cartesian Coordinates
    //vel = createVector(50, 0);
    
    // Polar Coordinates
    let r = 20;
    let theta = 90 - 0;
    vel = createVector(r * sin(theta), r * cos(theta));

    // ------------------------------------------------

    let mass = p5.Vector.sub(planet, sun).mag() ** (-GRAVITY_POWER - 1) * vel.magSq() / G; // Circular Motion: M = r^(GRAVITY_POWER -1 ) v^2 / G
    massSlider = createSlider(mass - mass * 0.5, mass + mass * 0.5, mass, 0);

    paused = false;
    timeSlider = createSlider(1, 100, 1, 0);

    hue = 0;
    hueIncreasing = true;
}

function draw() {
    fill(hue, 255, 255);
    circle(planet.x, planet.y, 20);
    
    if(hueIncreasing)
        hue++;
    else
        hue--;

    if(hue == 255 || hue == 0)
        hueIncreasing = !hueIncreasing;

    fill("yellow");
    circle(sun.x, sun.y, 20);

    let radius = p5.Vector.sub(sun, planet);
    let accel = radius.copy();
    accel.setMag(G * massSlider.value() * radius.mag() ** GRAVITY_POWER);

    let scaledDeltaT = deltaTime / 1000 * timeSlider.value();
    vel.add(p5.Vector.mult(accel, scaledDeltaT));
    planet.add(p5.Vector.mult(vel, scaledDeltaT));
}

function pauseSimulation() {
    paused = !paused;
    if(paused)
        noLoop();
    else
        loop();
}

function clearScreen() {
    background("black");
}
