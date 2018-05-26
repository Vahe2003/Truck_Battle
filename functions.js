function drawPlayer() {
    //image(playerImage, playerX, playerY);
    for(var i in players) {
        fill(players[i].color);
        if(players[i].color == "blue"){
            image(playerImage[0],players[0].x, players[0].y, side, side);
        }
        if(players[i].color == "red"){
            image(playerImage[1],players[1].x, players[1].y, side, side);
        }
        if(players[i].color == "green"){
            image(playerImage[2],players[2].x, players[2].y, side, side);
        }
        if(players[i].color == "yellow"){
            image(playerImage[3],players[3].x, players[3].y, side, side);
        }
    
        if (players[i].hasGold) {
            image(twgImage, playerX, playerY)
        }
    }

}

function drawResources() {

    for (var coords of obstacles) {
        image(obstacleImage, coords.x, coords.y, side, side);
    }
    for (var coords of gold) {
        image(goldImage, coords.x, coords.y, side, side);
    }
    for (var coords of energy) {
        image(energyImage, coords.x, coords.y, side, side);
    }
}

function drawCamp() {
    for (var coords of campblue) {
        image(campImageblue, coords.x, coords.y);
    }
    for (var coords of campred) {
        image(campImagered, coords.x, coords.y);
    }
    for (var coords of campgreen) {
        image(campImagegreen, coords.x, coords.y);
    }
    for (var coords of campyellow) {
        image(campImageyellow, coords.x, coords.y);
    }
}
function ScoreUp() {
    if (playerHasGold) {
    }
}


function Collision_right(coords) {
    var obstacleX = coords.x;
    var obstacleY = coords.y;

    var playerOX = playerX + (side / 2);
    var playerOY = playerY + (side / 2);

    var objectOX = obstacleX + (side / 2);
    var objectOY = obstacleY + (side / 2);

    if (objectOX - playerOX <= side && objectOX - playerOX >= 0) {
        if (Math.abs(playerOY - objectOY) < side) {
            return true;
        }
    }
    return false;
}

function Collision_left(coords) {
    var obstacleX = coords.x;
    var obstacleY = coords.y;

    var playerOX = playerX + (side / 2);
    var playerOY = playerY + (side / 2);

    var objectOX = obstacleX + (side / 2);
    var objectOY = obstacleY + (side / 2);

    if (playerOX - objectOX <= side && playerOX - objectOX >= 0) {
        if (Math.abs(playerOY - objectOY) < side) {
            return true;
        }
    }
    return false;
}

function Collision_up(coords) {
    var obstacleX = coords.x;
    var obstacleY = coords.y;

    var playerOX = playerX + (side / 2);
    var playerOY = playerY + (side / 2);

    var objectOX = obstacleX + (side / 2);
    var objectOY = obstacleY + (side / 2);

    if (playerOY - objectOY <= side && playerOY - objectOY >= 0) {
        if (Math.abs(playerOX - objectOX) < side) {
            return true;
        }
    }
    return false;
}

function Collision_down(coords) {
    var obstacleX = coords.x;
    var obstacleY = coords.y;

    var playerOX = playerX + (side / 2);
    var playerOY = playerY + (side / 2);

    var objectOX = obstacleX + (side / 2);
    var objectOY = obstacleY + (side / 2);

    if (objectOY - playerOY <= side && objectOY - playerOY >= 0) {
        if (Math.abs(playerOX - objectOX) < side) {
            return true;
        }
    }
    return false;
}
//camp collision 

function Collision_down_camp(coords) {
    var campX = coords.x;
    var campY = coords.y;

    var playerOX = playerX + (side / 2);
    var playerOY = playerY + (side / 2);

    var campOX = campX + side;
    var campOY = campY + side;

    if (campOY - playerOY <= 48 && campOY - playerOY >= 0) {

        if (Math.abs(playerOX - campOX) < 48) {
            ScoreUp();
            return true;
        }
    }
    return false;
}



function Collision_left_camp(coords) {
    var campX = coords.x;
    var campY = coords.y;

    var playerOX = playerX + (side / 2);
    var playerOY = playerY + (side / 2);

    var campOX = campX + (side);
    var campOY = campY + (side);

    if (playerOX - campOX <= 48 && playerOX - campOX >= 0) {
        if (Math.abs(playerOY - campOY) < 48) {
            ScoreUp();
            return true;
        }
    }

    return false;
}

function Collision_up_camp(coords) {
    var campX = coords.x;
    var campY = coords.y;

    var playerOX = playerX + (side / 2);
    var playerOY = playerY + (side / 2);

    var campOX = campX + (side);
    var campOY = campY + (side);

    if (playerOY - campOY <= 48 && playerOY - campOY >= 0) {
        if (Math.abs(playerOX - campOX) < 48) {
            ScoreUp();
            return true;
        }
    }
    return false;
}

function Collision_right_camp(coords) {
    var campX = coords.x;
    var campY = coords.y;

    var playerOX = playerX + (side / 2);
    var playerOY = playerY + (side / 2);

    var campOX = campX + (side);
    var campOY = campY + (side);

    if (campOX - playerOX <= 48 && campOX - playerOX >= 0) {
        if (Math.abs(playerOY - campOY) < 48) {
            ScoreUp();
            return true;
        }
    }
    return false;
}

//////////////////////////////////////////////////////////////

function Collision_End_up(coords) {
    var endX = coords.x;
    var endY = coords.y;

    var playerOX = playerX + (side / 2);
    var playerOY = playerY + (side / 2);

    var endOX = endX + side;
    var endOY = endY + side;

    if (playerOY - endOY <= 10  && endOY - playerOY >= 0) {
        if (Math.abs(playerOX - endOX) < 1024) {
            return true;
        }
    }
    return false;
}

function Collision_End_down(coords) {
    var endX = coords.x;
    var endY = coords.y;

    var playerOX = playerX + (side / 2);
    var playerOY = playerY + (side / 2);

    var endOX = endX + side;
    var endOY = endY + side;

    if (endOY - playerOY <= 10 && endOY - playerOY >= 0) {

        if (Math.abs(playerOX - endOX) < 1024) {
            return true;
        }
    }
    return false;
}
function Collision_End_right(coords) {
    var endX = coords.x;
    var endY = coords.y;

    var playerOX = playerX + (side / 2);
    var playerOY = playerY + (side / 2);

    var endOX = endX + side;
    var endOY = endY + side;

    if (endOX - playerOX <= 58 && endOX - playerOX >= 0) {
        if (Math.abs(playerOY - endOY) < 1024) {
            return true;
        }
    }
    return false;
}
function Collision_End_left(coords) {
    var endX = coords.x;
    var endY = coords.y;

    var playerOX = playerX + (side / 2);
    var playerOY = playerY + (side / 2);

    var endOX = endX + (side);
    var endOY = endY + (side);

    if (endOX - playerOX <= 1008 && endOX - playerOX >= 0) {
        if (Math.abs(playerOY - endOY) < 1024) {
            return true;
        }
    }
    return false;
}