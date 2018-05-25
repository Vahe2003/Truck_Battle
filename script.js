var hudImage;
var grassImage;
var playerImage;
var obstacleImage;
var goldImage;
var campImageblue;
var campImagered;
var campImagegreen;
var campImageyellow;
var twgImageLeft;
var twgImageRight;
var twgImageUp;
var twgImageDown;
var energyImage;
var laserImageright;
var laserImageleft;
var laserImageup;
var laserImagedown;
var bgImage;
var playerDirection = "right"


var power = 10;
var side = 32;

var obstacles = [];
var energy = [];
var gold = [];

for (var i = 0; i < 9; i++) {
    obstacles.push({ x: Math.floor(Math.random() * 448), y: Math.floor(Math.random() * 448) })
    energy.push({ x: Math.floor(Math.random() * 448), y: Math.floor(Math.random() * 448) })
    gold.push({ x: Math.floor(Math.random() * 448), y: Math.floor(Math.random() * 448) })
}




var campblue = [{ x: 0.5 * side, y: 13.5 * side }];
var campred = [{ x: 13.5 * side, y: 13.5 * side }];
var campgreen = [{ x: 0.5 * side, y: 0.5 * side }];
var campyellow = [{ x: 13.5 * side, y: 0.5 * side }];
var laser = [{ x: playerX, y: playerY}];


var playerX = 100;
var playerY = 450;


var playerHasGoldLeft = false;
var playerHasGoldRight = false;
var playerHasGoldUp = false;
var playerHasGoldDown = false;

function preload() {
    bgImage = loadImage('./Resources/bg.png');
    hudImage = loadImage('./Resources/hud.png');
    grassImage = loadImage('./Resources/grass.png');
    playerImage = loadImage('./Resources/player_blue_3.png');
    campImageblue = loadImage('./Resources/camp_blue.png');
    campImagered = loadImage('/Resources/camp_red.png');
    campImagegreen = loadImage('/Resources/camp_green.png');
    campImageyellow = loadImage('./Resources/camp_yellow.png');
    obstacleImage = loadImage('./Resources/obstacle.png');
    goldImage = loadImage('./Resources/gold.png');
    twgImageLeft = loadImage('./Resources/gold_1.png');
    twgImageRight = loadImage('./Resources/gold_3.png');
    twgImageUp = loadImage('./Resources/gold_2.png');
    twgImageDown = loadImage('./Resources/gold_4.png');
    energyImage = loadImage('./Resources/power.png');
    laserImageright = loadImage('./Resources/laser1_1.png');
    laserImageleft = loadImage('./Resources/laser1_3.png');
    laserImageup = loadImage('./Resources/laser1_2.png');
    laserImagedown = loadImage('./Resources/laser1_4.png');

}


function setup() {
    createCanvas(side * 16, side * 16);
}

function draw() {
    image(hudImage, 0, 0, width, height);
    image(grassImage, 16, 16, width - 32, height - 32);

    drawPlayer();

    drawCamp();

    drawResources();

    Shoot();


    if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && playerX < (width - side)) {
        playerDirection = "right"
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
                playerHasGoldRight = true;
                gold.splice(i, 1);
            }
        }
        for (var i in energy) {
            var coords = energy[i];
            if (Collision_right(coords)) {
                energy.splice(i, 1)
            }
        }
        playerX += 2;
    }
    else if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && playerX > 0) {
        playerDirection = "left"
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
                playerHasGoldLeft = true;
                gold.splice(i, 1);
            }
            for (var i in energy) {
                var coords = energy[i];
                if (Collision_left(coords)) {
                    energy.splice(i, 1)
                }
            }
        }
        playerX -= 2;
    }
    else if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && playerY > 0) {
        playerDirection = "up"
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
                playerHasGoldUp = true;
                gold.splice(i, 1);
            }
            for (var i in energy) {
                var coords = energy[i];
                if (Collision_up(coords)) {
                    energy.splice(i, 1)
                }
            }
        }
        playerY -= 2;
    }
    else if ((keyIsDown(DOWN_ARROW) || keyIsDown(83)) && playerY < (height - side)) {
        playerDirection = "down"
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
                playerHasGoldDown = true;
                gold.splice(i, 1);
            }
            for (var i in energy) {
                var coords = energy[i];
                if (Collision_down(coords)) {
                    energy.splice(i, 1)
                }
            }
        }
        playerY += 2;
    }
}