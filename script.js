var socket = io();
var config = {};

var players;
var obstacles;
var energy;
var gold;
var gameStarted = false;

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
var energyImage;
var bgImage;
var playerDirection = "right"


var power = 10;
var side = 32;
var score = 0;

var obstacles = [];
var energy = [];
var gold = [];

var endup = [{x: 32, y: 0}];
var enddown = [{x: 16, y: 905}];
var endright = [{x: 1014, y: 905}];
var endleft = [{x: 0, y: 0}];

var campblue = [{ x: 16, y: 880 }];
var campgreen = [{ x: 945, y: 16}];
var campred = [{ x: 16, y: 16}];
var campyellow = [{ x: 945, y: 880}];


var playerX;
var playerY;

var playerHasGold = false;

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
    twgImage = loadImage('./Resources/gold_2.png');
    energyImage = loadImage('./Resources/power.png');

}


function setup() {
    createCanvas(side * 32, side * 30);
}

function draw() {
    if (gameStarted) {

    image(hudImage, 0, 0, width, height);
    image(grassImage, 16, 16, width - 32, height - 32);


    drawPlayer();

    drawCamp();

    drawResources();


    if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && playerX < (width - side)) {
        playerDirection = "right"
        //playerImage = loadImage('./Resources/player_blue_3.png')
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
        for (var coords of endright) {
            if (Collision_End_right(coords)) return;
        }
        for (var i in gold) {
            var coords = gold[i];
            if (Collision_right(coords)) {
                if(playerHasGold) return;
                playerHasGold = true;
                gold.splice(i, 1);
                socket.emit('splice gold', i);
            }
        }
        for (var i in energy) {
            var coords = energy[i];
            if (Collision_right(coords)) {
                energy.splice(i, 1)
                socket.emit('splice energy', i);
            }
        }
        playerX += 3;
        socket.emit('move', {x: playerX, y: playerY, color: config.color, hasGold: playerHasGold});
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
        for (var coords of endleft) {
            if (Collision_End_left(coords)) return;
        }
        for (var i in gold) {
            var coords = gold[i];
            if (Collision_left(coords)) {
                if(playerHasGold) return;
                playerHasGold = true;
                gold.splice(i, 1);
                socket.emit('splice gold', i);
            }
            }
            for (var i in energy) {
                var coords = energy[i];
                if (Collision_left(coords)) {
                    energy.splice(i, 1)
                    socket.emit('splice energy', i);
                }
            }
        playerX -= 3;
        socket.emit('move', {x: playerX, y: playerY, color: config.color, hasGold: playerHasGold});
    }
    else if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && playerY > 0) {
        playerDirection = "up"
        //playerImage = loadImage('./Resources/player_blue_2.png')
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
        for (var coords of endup) {
            if(Collision_End_up(coords)) return;
        }
        for (var i in gold) {
            var coords = gold[i];
            if (Collision_up(coords)) {
                if(playerHasGold) return;
                playerHasGold = true;
                gold.splice(i, 1);
                socket.emit('splice gold', i);
            }
            }
            for (var i in energy) {
                var coords = energy[i];
                if (Collision_up(coords)) {
                    energy.splice(i, 1)
                    socket.emit('splice energy', i);
                }
            }
        playerY -= 3;
        socket.emit('move', {x: playerX, y: playerY, color: config.color, hasGold: playerHasGold});
    }
    else if ((keyIsDown(DOWN_ARROW) || keyIsDown(83)) && playerY < (height - side)) {
        playerDirection = "down"
        //playerImage = loadImage('./Resources/player_blue_4.png')
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
        for (var coords of enddown) {
            if (Collision_End_down(coords)) return;
        }
        for (var i in gold) {
            var coords = gold[i];
            if (Collision_down(coords)) {
                if(playerHasGold) return;
                playerHasGold = true;
                gold.splice(i, 1);
                socket.emit('splice gold', i);
            }
        }
            for (var i in energy) {
                var coords = energy[i];
                if (Collision_down(coords)) {
                    energy.splice(i, 1)
                    socket.emit('splice energy', i);
                }
            }
        playerY += 3;
        socket.emit('move', {x: playerX, y: playerY, color: config.color, hasGold: playerHasGold});
    }
}
else {
        background("#acacac");
        textSize(48);
        text('Waiting for players to join the game', 30, 60);
    }

socket.on('game started', function (data) {
    gameStarted = true;
    gold = data.gold;
    energy = data.energy;
    obstacles = data.obstacles;
    players = data.players;
});

socket.on('config data', function(data) {
    config =  data;
    playerX = config.x;
    playerY = config.y;
});

socket.on('main data', function(data) {
    gold = data.gold;
    energy = data.energy;
    obstacles = data.obstacles;
    players = data.players;
});
}