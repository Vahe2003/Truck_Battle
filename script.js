var socket = io();
var config = {};

var players;
var obstacles;
var energy;
var gold;
var camps;
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
var gameOver = false;
 


var power = 10;
setInterval(function () {
    power--
}, 5000);
var side = 32;
var score = 0;

var obstacles = [];
var energy = [];
var gold = [];

var endup = [{ x: 32, y: 0 }];
var enddown = [{ x: 16, y: 905 }];
var endright = [{ x: 1014, y: 905 }];
var endleft = [{ x: 0, y: 0 }];


var playerX;
var playerY;

var playerHasGold = false;

function preload() {
    bgImage = loadImage('./Resources/bg.png');
    hudImage = loadImage('./Resources/hud.png');
    grassImage = loadImage('./Resources/grass.png');
    playerImage = [loadImage('./Resources/player_red_2.png'),
    loadImage('./Resources/player_blue_2.png'),
    loadImage('./Resources/player_green_2.png'),
    loadImage('./Resources/player_yellow_2.png')]
    campImage = [loadImage('/Resources/camp_red.png'),
    loadImage('./Resources/camp_blue.png'),
    loadImage('/Resources/camp_green.png'),
    loadImage('./Resources/camp_yellow.png')
    ];
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

        
        function Score() {
            if (camps[0].x < players[0].x && players[0].x < 82
                && camps[0].y < players[0].y
                && players[0].y < 82
                && players[0].hasGold == true) {
                    players[0].hasGold = false;
                playerHasGold = false;
                score++
            }
            else if (camps[1].x <= players[1].x && players[1].x <= 82
                 && camps[1].y >= players[1].y 
                 && players[1].y >= 842
                 && players[1].hasGold == true) {
                    players[1].hasGold = false;
                    score++
                playerHasGold = false;
            }
            else if (camps[2].x > players[2].x && players[2].x >= 900
                && camps[2].y <= players[2].y
                && players[2].y < 82 
                && players[2].hasGold == true) {
                    players[2].hasGold = false;
                    score++
                playerHasGold = false;
            }
            else if (camps[3].x > players[3].x && players[3].x >= 900
                && camps[3].y >= players[3].y
                && players[3].y >= 842 
                && players[3].hasGold == true) {
                    players[3].hasGold = false;
                    score++
                playerHasGold = false;
            }
        }
        Score();

        image(hudImage, 0, 0, width, height);
        image(grassImage, 16, 16, width - 32, height - 32);


        drawPlayer();

        drawCamp();

        drawResources();
        function ShowScore(){
         text('Score: ' + score, 412, 50);
         text('Energy: ' + power,412,930)
 }
 ShowScore();

        if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && playerX < (width - side)) {
            playerDirection = "right"
            for (var coords of obstacles) {
                if (Collision_right(coords)) return;
            }
            for (var coords of camps) {
                if (Collision_right_camp(coords)) return;
            }
            for (var coords of endright) {
                if (Collision_End_right(coords)) return;
            }
            for (var i in gold) {
                var coords = gold[i];
                if (Collision_right(coords)) {
                    if (playerHasGold) return;
                    playerHasGold = true;
                    gold.splice(i, 1);
                    socket.emit('splice gold', i);
                }
            }
            for (var i in energy) {
                var coords = energy[i];
                if (power < 0) {
                    power = 0;
                }
                if (power > 10) {
                    power = 10;
                }
                if (Collision_right(coords)) {

                    energy.splice(i, 1)
                    socket.emit('splice energy', i);
                    power++;
                }
            }
            if (power == 0) {
                playerX += 1.5;
            }
            else {
                playerX += 3;
            }
            socket.emit('move', { x: playerX, y: playerY, color: config.color, hasGold: playerHasGold});
        }
        else if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && playerX > 0) {
            playerDirection = "left"
            for (var coords of obstacles) {
                if (Collision_left(coords)) return;
            }
            for (var coords of camps) {
                if (Collision_left_camp(coords)) return;
            }
            for (var coords of endleft) {
                if (Collision_End_left(coords)) return;
            }
            for (var i in gold) {
                var coords = gold[i];
                if (Collision_left(coords)) {
                    if (playerHasGold) return;
                    playerHasGold = true;
                    gold.splice(i, 1);
                    socket.emit('splice gold', i);
                }
            }
            for (var i in energy) {
                if (power < 0) {
                    power = 0;
                }
                if (power > 10) {
                    power = 10;
                }
                var coords = energy[i];
                if (Collision_left(coords)) {
                    energy.splice(i, 1)
                    socket.emit('splice energy', i);
                    power++;
                }
            }
            if (power == 0) {
                playerX -= 1.5;
            }
            else {
                playerX -= 3;
            }
            socket.emit('move', { x: playerX, y: playerY, color: config.color, hasGold: playerHasGold});
        }
        else if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && playerY > 0) {
            playerDirection = "up"
            for (var coords of obstacles) {
                if (Collision_up(coords)) return;
            }
            for (var coords of camps) {
                if (Collision_up_camp(coords)) return;
            }
            for (var coords of endup) {
                if (Collision_End_up(coords)) return;
            }
            for (var i in gold) {
                var coords = gold[i];
                if (Collision_up(coords)) {
                    if (playerHasGold) return;
                    playerHasGold = true;
                    gold.splice(i, 1);
                    socket.emit('splice gold', i);
                }
            }
            for (var i in energy) {
                if (power < 0) {
                    power = 0;
                }
                if (power > 10) {
                    power = 10;
                }
                var coords = energy[i];
                if (Collision_up(coords)) {
                    energy.splice(i, 1)
                    socket.emit('splice energy', i);
                    power++;
                }
            }
            if (power == 0) {
                playerY -= 1.5;
            }
            else {
                playerY -= 3;
            }
            socket.emit('move', { x: playerX, y: playerY, color: config.color, hasGold: playerHasGold});
        }
        else if ((keyIsDown(DOWN_ARROW) || keyIsDown(83)) && playerY < (height - side)) {
            playerDirection = "down"
            for (var coords of obstacles) {
                if (Collision_down(coords)) return;
            }
            for (var coords of camps) {
                if (Collision_down_camp(coords)) return;
            }
            for (var coords of enddown) {
                if (Collision_End_down(coords)) return;
            }
            for (var i in gold) {
                var coords = gold[i];
                if (Collision_down(coords)) {
                    if (playerHasGold) return;
                    playerHasGold = true;
                    gold.splice(i, 1);
                    socket.emit('splice gold', i);
                }
            }
            for (var i in energy) {
                if (power < 0) {
                    power = 0;
                }
                if (power > 10) {
                    power = 10;
                }
                var coords = energy[i];
                if (Collision_down(coords)) {


                    energy.splice(i, 1)
                    socket.emit('splice energy', i);
                    power++;
                }
            }
            if (power == 0) {
                playerY += 1.5;
            }
            else {
                playerY += 3;
            }
            socket.emit('move', { x: playerX, y: playerY, color: config.color, hasGold: playerHasGold});
        }

    }

    else {
        background("#acacac");
        textSize(48);
        text('Waiting for players to join the game', 80, 60);
    }

    socket.on('game started', function (data) {
        gameStarted = true;
        gold = data.gold;
        energy = data.energy;
        obstacles = data.obstacles;
        players = data.players;
        camps = data.camps
    });

    socket.on('config data', function (data) {
        config = data;
        playerX = config.x;
        playerY = config.y;
    });

    socket.on('main data', function (data) {
        gold = data.gold;
        energy = data.energy;
        obstacles = data.obstacles;
        players = data.players;
        camps = data.camps
    });
}
function main() {             
    var chatDiv = document.getElementById('text');
    var chatText = document.getElementsByTagName('p');
    var input = document.getElementById('message');
    var button = document.getElementById('submit');
    var buttonDelete = document.getElementById('delete'); 

    function handleSubmit(evt) {
        var val = input.value;
        if (val != "") {
            socket.emit("send message", val);
        }
    }
    button.onclick = handleSubmit;

    function handleMessage(msg) {
        var p = document.createElement('p');
        p.innerText = msg;
        chatDiv.appendChild(p);
        input.value = "";
    }

    socket.on('display message', handleMessage);

    function handleDelete() {
        chatDiv.innerHTML = '';
    }
    buttonDelete.onclick = handleDelete;
} 

window.onload = main;