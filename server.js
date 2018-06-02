var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

var side = 32;
var width = 32, height = 30;

var Players = [
    {x: 128, y: 32, color: "red", hasGold: false},
    {x: 128, y: 896, color: "blue", hasGold: false},
    {x: 896, y: 32, color: "green", hasGold: false},
    {x: 896, y: 896, color: "yellow", hasGold: false}
];
var Camps = [
    { x: 16, y: 16 ,color : "red"},
    { x: 16, y: 880,color : "blue"},
    { x: 944, y: 16,color: "green"},
    { x: 944, y: 880,color :"yellow"}
];

var allCoordinates = [];
var GoldArr = [];
var EnergyArr = [];
var ObstalceArr = [];
var ScoreArr = [];

var goldCount = 50;
var energyCount = 20;
var obstacleCount = 30;


app.use(express.static('.'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(port, function() {
    console.log("Server is listening on port " + port);
});

var playerColorCounter = 0;

io.on('connection', function(socket) {

    if(playerColorCounter != 4) 
        socket.emit('config data', Players[playerColorCounter++]);
    else{
        socket.emit('no space', 'No space left, please wait until the next session');
    }
    if(playerColorCounter == 4) {
        startGame();
        console.log("GAME STARTED");
    }

    console.log("New user connected, playerCount: " + playerColorCounter);

    socket.on('move', function(data) {
        for(let i in Players) {
            if(Players[i].color == data.color) {
                Players[i] = data;
            }
        };
       
        io.sockets.emit('main data', {
            gold: GoldArr,
            energy: EnergyArr,
            obstacles: ObstalceArr,
            players: Players,
            camps : Camps,
        });
    });
    io.sockets.emit('Winner',{
        Score:ScoreArr
    });

    socket.on('disconnect', function() {
        playerColorCounter--;
    });

    socket.on('splice gold', function(index) {
        GoldArr.splice(index, 1);
    });
    socket.on('splice energy', function(index) {
        EnergyArr.splice(index, 1);
    });

});

function startGame() {
    generateMap();
    io.sockets.emit('game started', {
        gold: GoldArr,
        energy: EnergyArr,
        obstacles: ObstalceArr,
        players: Players,
        camps : Camps,
    });
}

function generateMap() {
    for(var i = 0; i < goldCount; i++) {
        var x = (2 + random(width - 4)) * side, y = (2 + random(height - 4)) * side;
        if(!allCoordinates.includes(x + '' + y)) {
            GoldArr.push({x:x, y:y})
            allCoordinates.push(x + '' + y);
        } else i--;
    }
    for(var i = 0; i < energyCount; i++) {
        var x = (2 + random(width - 4)) * side, y = (2 + random(height - 4)) * side;
        if(!allCoordinates.includes(x + '' + y)) {
            EnergyArr.push({x:x, y:y})
            allCoordinates.push(x + '' + y);
        } else i--;
    }
    for(var i = 0; i < obstacleCount; i++) {
        var x = (2 + random(width - 4)) * side, y = (2 + random(height - 4)) * side;
        if(!allCoordinates.includes(x + '' + y)) {
            ObstalceArr.push({x:x, y:y})
            allCoordinates.push(x + '' + y);
        } else i--;
    }
}

function random(max) {
    return Math.floor(Math.random() * max);
}
var messages = [];

io.on('connection', function (socket) {
    for (var i in messages) {
        io.sockets.emit("display message",messages[i]);
    }
    socket.on("send message", function (data) {
        messages.push(data);
        io.sockets.emit("display message", data);
    })
});
if(ScoreArr >= 5){
    alert("Test")
    clear();
}