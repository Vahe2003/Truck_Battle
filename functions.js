function drawPlayer() { 
    image(playerImage, playerX,playerY);
    if (playerHasGold) {
        image(twgImage,playerX + 2, playerY + 1)
    }
}
function drawResources() { 
    for (var coords of obstacles) {
        image(obstacleImage,coords.x, coords.y, side, side);
    }
    for (var coords of gold) {
        image(goldImage,coords.x, coords.y, side, side);
    }
}
function drawCamp() { 
    for (var coords of campblue) {
        image(campImageblue,coords.x, coords.y);
    }
    for (var coords of campred) {
        image(campImagered,coords.x, coords.y);
    }
    for (var coords of campgreen) {
        image(campImagegreen,coords.x, coords.y);
    }
    for (var coords of campyellow) {
        image(campImageyellow,coords.x, coords.y);
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
    
    var campOX = campX + (side / 2);
    var campOY = campY + (side / 2);
    
    if(campOY - playerOY <= side && campOY - playerOY >= 0) {
        
        if(Math.abs(playerOX - campOX) < side * 2) {
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

    var campOX = campX + (side / 2);
    var campOY = campY + (side / 2);

    if (playerOX - campOX <= side * 2 && playerOX - campOX >= 32) {
        if (Math.abs(playerOY - campOY) < 50) {
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

    var campOX = campX + (side / 2);
    var campOY = campY + (side / 2);

    if (playerOY - campOY <= side * 2 && playerOY - campOY >= 0) {
        if (Math.abs(playerOX - campOX) < side * 2) {
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

var campOX = campX + (side / 2);
var campOY = campY + (side / 2);

if (campOX - playerOX <= side && campOX - playerOX >= 32) {
    
    if (Math.abs(playerOY - campOY) < side * 2) {
        return true;
    }
}
return false;
}