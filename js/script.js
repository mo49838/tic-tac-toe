console.log("javascript linked");

//global variables
let players = ["Red","Blue"];
let colors = ["red","blue"];
let whoseTurn = "X";
let redScore = 0;
let blueScore = 0;

//find dom objects
let redScoreElem = document.getElementById("redScore");
let blueScoreElem = document.getElementById("blueScore");

function boxClicked(event){
    console.log(event);
}

//need to create 9 boxes with 3 on each row
function createBoard(){
    //find board element

    let board = document.getElementById("board");
    //add rows to board
    for (let i=0;i<3;i++){

        let newRow = document.createElement("div");
        newRow.setAttribute("class","row");
        board.appendChild(newRow);

        //add boxes to each row
        for(let j=0;j<3;j++){
            let newBox = document.createElement("div");
            newBox.setAttribute("class","box");
            newBox.addEventListener("click",boxClicked);
            newRow.appendChild(newBox);
        }
    }

}

createBoard();

function resetScore(){
    redScore = 0;
    blueScore = 0;
    redScoreElem.innerHTML = redScore;
    blueScoreElem.innerHTML = blueScore;
}

function increBlue(){
    blueScore++;
    blueScoreElem.innerHTML = blueScore;
}

function increRed(){
    redScore++;
    redScoreElem.innerHTML = redScore;
}