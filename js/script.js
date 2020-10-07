console.log("javascript linked");

//global variables
let players = ["Red","Blue"];
let colors = ["red","blue"];
let whoseTurn = 0;
let redScore = 0;
let blueScore = 0;

//find dom objects
let redScoreElem = document.getElementById("redScore");
let blueScoreElem = document.getElementById("blueScore");
let whoseTurnElem = document.getElementById("whoseTurn");

//called when box is clicked
function boxClicked(event){
    
    //change background color
    event.target.style.background = colors[whoseTurn];
    //remove event listener so it doesn't change color again
    document.getElementById(event.target.id).removeEventListener("click",boxClicked);
    //change whose turn it is
    changeWhoseTurn();
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
            //adding unique id for each box
            newBox.setAttribute("id",(i*3)+j); 
            newBox.addEventListener("click",boxClicked);
            newRow.appendChild(newBox);
        }
    }

    //used to display whose turn initially
    changeWhoseTurn();
}

createBoard();

function changeWhoseTurn(){
    whoseTurn = (whoseTurn+1)%2;
    whoseTurnElem.innerHTML=`${players[whoseTurn]}'s turn!`;
    whoseTurnElem.style.color = colors[whoseTurn];
}

function resetGame(){
    redScore = 0;
    blueScore = 0;
    redScoreElem.innerHTML = redScore;
    blueScoreElem.innerHTML = blueScore;
    clearBoard();
}

function increBlue(){
    blueScore++;
    blueScoreElem.innerHTML = blueScore;
}

function increRed(){
    redScore++;
    redScoreElem.innerHTML = redScore;
}

function clearBoard(){
    for (let i=0;i<9;i++){
        let currBox = document.getElementById(i);
        currBox.addEventListener("click",boxClicked);
        currBox.style.background = "#EFE7BC";
    }
}