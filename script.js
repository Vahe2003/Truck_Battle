var hudImage;
var grassImage;
var playerImage;
var obstacleImage;
var goldImage;
var campImageblue;
var campImagered;
var campImagegreen;
var campImageyellow;
var twgImage;

var side = 32;
var obstacles = [{ x: 10 * side, y: 10 * side }];
var gold = [{ x: 5 * side, y: 6 * side }];
var campblue = [{ x: 0.5 * side, y: 13.5 * side }];
var campred = [{ x: 13.5 * side, y: 13.5 * side }];
var campgreen = [{ x: 0.5 * side, y: 0.5 * side }];
var campyellow = [{ x: 13.5 * side, y: 0.5 * side }];


var playerX = 100;
var playerY = 100;

var playerHasGold = false;

function preload() {
    hudImage = loadImage('./Resources/hud.png');
    grassImage = loadImage('./Resources/grass.png')
    playerImage = loadImage('./Resources/player_blue_3.png')
    campImageblue = loadImage('./Resources/camp_blue.png')
    campImagered = loadImage('/Resources/camp_red.png')
    campImagegreen = loadImage('/Resources/camp_green.png')
    campImageyellow = loadImage('./Resources/camp_yellow.png')
    obstacleImage = loadImage('./Resources/obstacle.png')
    goldImage = loadImage('./Resources/gold.png')
    twgImage = loadImage('./Resources/gold_1.png')
}

function setup() {
    createCanvas(side * 16, side * 16);
}

function draw() {
    image(hudImage, 0, 0, width, height);
    image(grassImage, 16, 16, width - 32, height - 32);

    drawPlayer();

    drawResources();

    drawCamp();

    

    if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && playerX < (width - side)) {
        playerImage = loadImage('./Resources/player_blue_3.png')
        for (var coords of obstacles) {
            if (Collision_right(coords)) return;
        }
        for (var coords of campblue) {
            if (Collision_right_camp(coords)) return;
        } 
        for (var coords of campred) {
            if (Collision_right_camp(coords)) return;
        }
        for (var coords of campgreen) {
            if (Collision_right_camp(coords)) return;
        }
        for (var coords of campyellow) {
            if (Collision_right_camp(coords)) return;
        }
        for (var i in gold) {
            var coords = gold[i];
            if (Collision_right(coords)) {
                playerHasGold = true;
                gold.splice(i, 1);
            }
        }
        playerX += 2;
    }
    else if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && playerX > 0) {
        playerImage = loadImage('./Resources/player_blue_1.png')
        for (var coords of obstacles) {
            if (Collision_left(coords)) return;
        }
        for (var coords of campblue) {
            if (Collision_left_camp(coords)) return;
        }
        for (var coords of campred) {
            if (Collision_left_camp(coords)) return;
        }
        for (var coords of campgreen) {
            if (Collision_left_camp(coords)) return;
        }
        for (var coords of campyellow) {
            if (Collision_left_camp(coords)) return;
        }
        for (var i in gold) {
            var coords = gold[i];
            if (Collision_left(coords)) {
                playerHasGold = true;
                gold.splice(i, 1);
            }
        }
        playerX -= 2;
    }
    else if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && playerY > 0) {
        playerImage = loadImage('./Resources/player_blue_2.png')
        for (var coords of obstacles) {
            if (Collision_up(coords)) return;
        }
        for (var coords of campblue) {
            if (Collision_up_camp(coords)) return;
        }
        for (var coords of campred) {
            if (Collision_up_camp(coords)) return;
        }
        for (var coords of campgreen) {
            if (Collision_up_camp(coords)) return;
        }
        for (var coords of campyellow) {
            if (Collision_up_camp(coords)) return;
        }
        for (var i in gold) {
            var coords = gold[i];
            if (Collision_up(coords)) {
                playerHasGold = true;
                gold.splice(i, 1);
            }
        }
        playerY -= 2;
    }
    else if ((keyIsDown(DOWN_ARROW) || keyIsDown(83)) && playerY < (height - side)) {
        playerImage = loadImage('./Resources/player_blue_4.png')
        for (var coords of obstacles) {
            if (Collision_down(coords)) return;
        }
        for (var coords of campblue) {
            if (Collision_down_camp(coords)) return;
        }
        for (var coords of campred) {
            if (Collision_down_camp(coords)) return;
        }
        for (var coords of campgreen) {
            if (Collision_down_camp(coords)) return;
        }
        for (var coords of campyellow) {
            if (Collision_down_camp(coords)) return;
        }
        for (var i in gold) {
            var coords = gold[i];
            if (Collision_down(coords)) {
                playerHasGold = true;
                gold.splice(i, 1);
            }
        }
        playerY += 2;
    }
}