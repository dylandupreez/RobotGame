
window.onload = function () {
    var board = document.getElementById("board");
    var robot = document.getElementById("robot");
    var robotX = 0;
    var robotY = 0;
    var robotAngle = 0;
    var robotPlaced = false;
    var maxX = board.offsetLeft + board.offsetWidth;
    var maxY = board.offsetTop + board.offsetHeight;
    var minX = board.offsetLeft;
    var minY = board.offsetTop;
    var placeButton = document.getElementById("place");
    var xCoOrd = document.getElementById("xCoOrd");
    var yCoOrd = document.getElementById("yCoOrd");
    var facing = document.getElementById("facing");
    var forward = document.getElementById("forward");
    var left = document.getElementById("left");
    var right = document.getElementById("right");

    var keys = {
        UP: 38,
        RIGHT: 39,
        LEFT: 37
    }

    placeButton.onclick = function (e) {
        e.preventDefault();
        if (xCoOrd.value && yCoOrd.value) {
            placeRobot(parseInt(xCoOrd.value), parseInt(yCoOrd.value), parseInt(facing.value));
        }
    }

    document.onkeyup = function (e) {
        switch (e.which) {
            case keys.UP:
                moveRobotForward();
                break;
            case keys.LEFT:
                rotateLeft();
                break;
            case keys.RIGHT:
                rotateRight();
                break;
        }
        console.log("angle", robotAngle, "x", robotX, "y", robotY);

    }

    forward.onclick = function (e) {
        e.preventDefault();
        moveRobotForward();
    }

    left.onclick = function (e) {
        e.preventDefault();
        rotateLeft();
    }

    right.onclick = function (e) {
        e.preventDefault();
        rotateRight();
    }

    function rotateLeft() {
        if (robotPlaced) {
            var angle = robotAngle;
            angle -= 90;
            rotateRobot(angle);
        }
    }

    function rotateRight() {
        if (robotPlaced) {
            var angle = robotAngle;
            angle += 90;
            if (angle > 360) {
                angle = 360 - angle;
            }else if(angle < -360){
                angle = 360 + angle;
            }
            rotateRobot(angle);
        }
    }


    function rotateRobot(angle) {
        robotAngle = angle;
        moveRobot(angle, robotX, robotY);
    }

    function moveRobotForward() {
        robotX = robot.offsetLeft;
        robotY = robot.offsetTop;
        if (isSafeMove()) {
            switch (robotAngle) {
                case 0:
                case 360:
                case -360:
                    robotY -= 100;
                    break;
                case 90:
                case -270:
                    robotX += 100;
                    break;
                case 180:
                case -180:
                    robotY += 100;
                    break;
                case 270:
                case -90:
                    robotX -= 100;
                    break;
            }
            moveRobot(robotAngle, robotX, robotY);
        }
        else {
            alert("If I move in this direction I will fall off the table!!");
        }
        console.log("angle", robotAngle, "x", robotX, "y", robotY);
    }

    function isSafeMove() {
        var robotOffsetTop = robot.offsetTop;
        var robotOffsetLeft = robot.offsetLeft;
        if (robotPlaced) {
            switch (robotAngle) {
                case 0:
                case 360:
                case -360:
                    return (robotOffsetTop - 100) > minY;
                case 90:
                case -270:
                    return (robotOffsetLeft + 100) < maxX;
                case 180:
                case -180:
                    return (robotOffsetTop + 100) < maxY;
                case 270:
                case -90:
                    return (robotOffsetLeft - 100) > minX;
            }
        }
        return false;
    }

    function moveRobot(angle, x, y) {
        robot.style.transform = "rotate(" + angle + "deg)";
        robot.style.left = x + "px";
        robot.style.top = y + "px";
    }

    function placeRobot(x, y, angle) {
        robotAngle = angle;
        var squares = document.querySelectorAll(".square");
        var index = convertCoOrdsToIndex(x, y);
        var activeSquare = squares[index];
        
        robotY = (activeSquare.offsetTop + (activeSquare.clientHeight / 2)) - (robot.clientHeight / 2);
        robotX = (activeSquare.offsetLeft + (activeSquare.clientWidth / 2)) - (robot.clientWidth / 2);
        robot.style.top = robotY + "px";
        robot.style.left = + robotX + "px";
        robot.style.transform = "rotate(" + angle + "deg)";
        robot.style.visibility = "visible";
        robotPlaced = true;
    }


}

function convertCoOrdsToIndex(x, y, numRows, numCols) {
    if (!numRows) {
        numRows = 5;
    }
    if (!numCols) {
        numCols = 5;
    }
    if (x >= numCols) {
        x = numCols - 1;
    }
    if (y >= numRows) {
        y = numRows - 1;
    }
    return (((numRows - y) * numRows) - numCols) + x;
}


