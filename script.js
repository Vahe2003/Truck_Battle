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


var power = 10;
setInterval(function(){
    power--
},5000);
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
    playerImage= [loadImage('./Resources/player_red_2.png'),
    loadImage('./Resources/player_blue_2.png'),
    loadImage('./Resources/player_green_2.png'), 
    loadImage('./Resources/player_yellow_2.png')]
    campImage =  [loadImage('/Resources/camp_red.png'),
    loadImage('./Resources/camp_blue.png'),
    loadImage('/Resources/camp_green.png'),
    loadImage('./Resources/camp_yellow.png')
];
    obstacleImage = loadImage('./Resources/obstacle.png');
    goldImage = loadImage('./Resources/gold.png');
    twgImage = loadImage('./Resources/gold_2.png');
    energyImage = loadImage('./Resources/power.png');

}
function main() {
    var socket = io.connect('http://localhost:3000');
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
        console.log(p)
    }

    socket.on('display message', handleMessage);

    function handleDelete() {
        chatDiv.innerHTML = '';
    }
    buttonDelete.onclick = handleDelete;
} 
window.onload = main;


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
            console.log(power)
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
                if(power < 1){
                    power = -1;
                }
                if (Collision_right(coords)) {
                    if(power > 10){
                        power = 9;
                    }
                    energy.splice(i, 1)
                    socket.emit('splice energy', i);
                    power++;
                }
            }
            if(power == 0){
                playerX += 0.5;
            }
            else{
                playerX += 3;
            }
            socket.emit('move', { x: playerX, y: playerY, color: config.color, hasGold: playerHasGold });
        }
        else if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && playerX > 0) {
            playerDirection = "left"
            console.log(power)
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
                if(power < 1){
                    power = -1;
                }
                var coords = energy[i];
                if (Collision_left(coords)) {
                    if(power > 10){
                        power = 9;
                    }
                    energy.splice(i, 1)
                    socket.emit('splice energy', i);
                    power++;
                }
            }
            if(power == 0){
                playerX -= 0.5;
            }
            else{
                playerX -= 3;
            }
            socket.emit('move', { x: playerX, y: playerY, color: config.color, hasGold: playerHasGold });
        }
        else if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && playerY > 0) {
            playerDirection = "up"
            console.log(power)
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
                if(power < 1){
                    power = -1;
                }
                var coords = energy[i];
                if (Collision_up(coords)) {
                    if(power > 10){
                        power = 9;
                    }
                    energy.splice(i, 1)
                    socket.emit('splice energy', i);
                    power++;
                }
            }
            if(power == 0){
                playerY -= 0.5;
            }
            else{
                playerY -= 3;
            }
            socket.emit('move', { x: playerX, y: playerY, color: config.color, hasGold: playerHasGold });
        }
        else if ((keyIsDown(DOWN_ARROW) || keyIsDown(83)) && playerY < (height - side)) {
            playerDirection = "down"
            console.log(power)
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
                var coords = energy[i];
                if (Collision_down(coords)) {
                    if(power > 10){
                        power = 9;
                    }

                    energy.splice(i, 1)
                    socket.emit('splice energy', i);
                    power++;
                }
            }
            if(power == 0){
                playerY += 0.5;
            }
            else{
                playerY += 3;
            }
            socket.emit('move', { x: playerX, y: playerY, color: config.color, hasGold: playerHasGold });
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