function drawPlayer() {
    image(playerImage, playerX, playerY);
    if (playerHasGoldLeft) {
        image(twgImageLeft, playerX + 2, playerY + 1)
    }
    if (playerHasGoldRight) {
        image(twgImageRight, playerX, playerY)
    }
    if (playerHasGoldUp) {
        image(twgImageUp, playerX, playerY)
    }
    if (playerHasGoldDown) {
        image(twgImageDown, playerX + 1, playerY - 4)
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
function Shoot() {
    if ((keyIsDown(81) && playerDirection == "right")) {
        console.log("shooted")
        for (var coords of laser) {
            coords.x = playerX;
            coords.y = playerY;
            image(laserImageright, coords.x + 30, coords.y, side, side);
        }

    }
    if ((keyIsDown(81) && playerDirection == "left")) {
        console.log("shooted")
        for (var coords of laser) {
            coords.x = playerX;
            coords.y = playerY;
            image(laserImageleft, coords.x - 30, coords.y, side, side);
        }

    }
    if ((keyIsDown(81) && playerDirection == "up")) {
        console.log("shooted")
        for (var coords of laser) {
            coords.x = playerX;
            coords.y = playerY;
            image(laserImageup, coords.x, coords.y - 30, side, side);
        }

    }
    if ((keyIsDown(81) && playerDirection == "down")) {
        console.log("shooted")
        for (var coords of laser) {
            image(laserImagedown, coords.x, coords.y + 30, side, side);
        }
        coords.y += 2;
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
    if (playerHasGoldDown) {
        playerHasGoldDown = false;
    }
    if (playerHasGoldLeft) {
        playerHasGoldLeft = false;
    }
    if (playerHasGoldRight) {
        playerHasGoldRight = false;
    }
    if (playerHasGoldUp) {
        playerHasGoldUp = false;
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