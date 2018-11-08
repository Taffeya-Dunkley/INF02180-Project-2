//INFO 2180 PROJECT 2
// Extra feature:
// Mutiple background 

 







var initialState = [];
var x = 0;
var y = 0;
var t = 0;
var l = 0;
var increment = 1;
var blank = ["300px", "300px"]; 

window.onload = function(){
    var state = start();
    var puzzle = getpieces();
    selectBackground();
    var items = $("form")[0].elements;

    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function(){
            changeImage(this.value)
        });
    }









    document.getElementById("shufflebutton").onclick = function() {
        shuffle(puzzle);
        image_shuffle();
        puzzle = getpieces();

    }

    for (var i = 0; i < puzzle.length; i++) {
        puzzle[i].addEventListener("mouseover", function() {
            if (ismovable(this)) {
                this.className = "puzzlepiece movablepiece";
            }
        });

        puzzle[i].addEventListener("mouseleave", function() {
            this.className = "puzzlepiece";
        });

        puzzle[i].addEventListener("click", function() {
            if (this.className.includes("movablepiece")) {
                switcher(this, true, state, puzzle);
                moves++;
            }
        });
    }
}









//Checks if the puzzle piece is movable
function start(){
    var puzzleArea = document.getElementById("puzzlearea").childNodes;

    for (let k = 0; k < puzzleArea.length; k++) {
        if (puzzleArea[k].nodeName == "DIV") {
            initialState.push([t.toString() + "px", l.toString() + "px"]);
            puzzleArea[k].className += "puzzlepiece";
            puzzleArea[k].setAttribute("style", `background-position: ${x}px ${y}px; top: ${t}px; left: ${l}px;`);
            x = x-100;
            l= l+100;

            if (increment % 4 == 0) {
                y = y-100;
                t = t + 100;
                l = 0
            }
            increment += 1;

        }
    }

    return initialState
}

//Checks if the puzzle piece is movable
function ismovable(piece) {
    return parseInt(piece.style.top) + 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) - 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) - 100 === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) + 100 === parseInt(blank[1])
}












//switches piece with blank space
function switcher(piece, animate) {
    btop = piece.style.top;
    bleft = piece.style.left;

    if (animate) {
        var winning_state = arguments[2];
        var pieces = arguments[3];
        $(piece).animate({ "top": blank[0], "left": blank[1] } ); 

    } else {
        piece.style.top = blank[0];
        piece.style.left = blank[1];
    }
    blank = [btop, bleft];
}

//shuffle the pieces in the maze
function shuffle(pieces) {
    var pLength = pieces.length;
    var piece;
    var rand;

    for (var index = 0; index < pLength; index++) {
        rand = Math.floor(Math.random() * pieces.length);
        piece = pieces.splice(rand, 1);
        switcher(piece[0], false);
    }
}












//Prompts users to select a background image
function selectBackground() {
    var form = "<form align='center'>\
    <p align='left'> <b> Please select a PUZZLE theme </b> <p>\
    <div class='custom-select' style='width:200px'>\
      <select>\
        <option value=''> <b> KOALA </b></option>\
        <option value='1'><b> HORSE</b> </option>\
        <option value='2'<b> CAT</b> </option>\
        <option value='3'<b> DOG </b> </option>\
        <option value='4'<b> BEAR </b> </option>\
        <option value='5'<b> GOAT </b></option>\
         </select>\
    </div>\
    </form>";

    $("#overall").before(form);

}

//Returns all maze pieces
function getpieces() {
    return $(".puzzlepiece");
}

//shuffles the  background image selected
function image_shuffle(){
    var val = Math.floor(Math.random()*4)
    if(val === 0){
        val = "";
    }
 changeImage(val); 
}







//allows background image to be changed
function changeImage(val) {
    var p = getpieces();

    for (var i = 0; i < p.length; i++){
        p[i].style.backgroundImage = `url('background${val}.jpg')`;
    }
}

