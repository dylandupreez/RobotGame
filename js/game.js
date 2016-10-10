
window.onload = function () {
    var board = document.getElementById("board");
    var boardBoundingRect = board.getBoundingClientRect();
    var robot = document.getElementById("robot");
    var maxX = boardBoundingRect.right;
    var maxY = boardBoundingRect.bottom;
    var minX = boardBoundingRect.left;
    var minY = boardBoundingRect.top;
    var placeButton = document.getElementById("place");
    var xCoOrd = document.getElementById("xCoOrd");
    var yCoOrd = document.getElementById("yCoOrd");

    placeButton.onclick = function(e){
        e.preventDefault();
        if(xCoOrd.value && yCoOrd.value){
            placeRobot(parseInt(xCoOrd.value),parseInt(yCoOrd.value));
        }
    }

    function placeRobot(x, y) {
        var squares = document.querySelectorAll(".square");
        var index = convertCoOrdsToIndex(x, y);
        var activeSquare = squares[index];
        robot.style.display = "block";
        robot.style.top = (activeSquare.offsetTop + (activeSquare.clientHeight / 2) - (robot.clientHeight / 2))  + "px";
        robot.style.left = (activeSquare.offsetLeft + (activeSquare.clientWidth / 2) - (robot.clientWidth / 2))  + "px";
    }


}

function convertCoOrdsToIndex(x, y, numRows, numCols) {
    if(!numRows){
        numRows = 5;
    }
    if(!numCols){
        numCols = 5;
    }
    if(x >= numCols){
        x = numCols - 1;
    }
    if(y >= numRows){
        y = numRows - 1;
    }
    return (((numRows - y) * numRows) - numCols) + x;
}


