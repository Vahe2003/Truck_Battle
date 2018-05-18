var playerX = 0, playerY = 0;
var hudImage;
var grassImage;

function preload() {
    hudImage = loadImage('./Resources/hud.png');
    grassImage = loadImage('./Resources/grass.png');
}

function setup(){
    createCanvas(800, 800);
} 


function draw() {
    image(hudImage, 0, 0, width, height);
}