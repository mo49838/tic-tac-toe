console.log("javascript linked");

//global variables
let players = ["Red","Blue"];
let colors = ["red","blue"];
let whoseTurn = 0;
let redScore = 0;
let blueScore = 0;
let clicks = 0; //used to track how many boxes clicked

//find dom objects
let redScoreElem = document.getElementById("redScore");
let blueScoreElem = document.getElementById("blueScore");
let whoseTurnElem = document.getElementById("whoseTurn");
let gameResultElem = document.getElementById("gameResult");


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

//called when box is clicked
function boxClicked(event){
    //reset game result
    gameResultElem.innerHTML="";
    //get currentBox
    let currBox = document.getElementById(event.target.id)
    //remove event listener so it doesn't change color again
    currBox.removeEventListener("click",boxClicked);
    //change background color
    currBox.setAttribute("style",`background:${colors[whoseTurn]}`);    
    //change whose turn it is
    changeWhoseTurn();
    //increment clicks
    clicks++;
    //check for winner
    checkForWin();
}

function checkForWin(){

    let winner = "";
    let allBoxes = Array.from(document.querySelectorAll(".box"));
    //console.log(allBoxes);

    //iterate through 8 combinations of winning numbers
    for (let i=0;i<8 && winner == "";i++){
        let boxesToCheck = [0,1,2];
        //check columns for first 3 combinations
        if (i<3){
            boxesToCheck = boxesToCheck.map(num => (i*3)+num);
        //check rows for second 3 combinations 
        }else if (i>=3 && i <6)
        {
            boxesToCheck = boxesToCheck.map(num => (i-3)+(num*3));
        //check first diagonal
        }else if (i == 6){
            boxesToCheck = [0,4,8];
        //check last diagonal
        }else{
            boxesToCheck = [2,4,6];
        }
        //console.log(boxesToCheck);
        
        //filter for boxes that we want to check
        let filteredBoxes = allBoxes.filter(box => boxesToCheck.indexOf(Number(box.id)) >= 0);
        //console.log(filteredBoxes);

        //check how many blue and red
        let redCount = filteredBoxes.filter(box => box.style.background == colors[0]).length;
        let blueCount = filteredBoxes.filter(box => box.style.background == colors[1]).length;

        //console.log(i + " red "+redCount + " blue "+ blueCount);
        if (redCount == 3){
            gameResultElem.innerHTML="RED WINS!!!!";
            gameResultElem.style.color = colors[0];
            increRed();
            clearBoard();
        }
        else if (blueCount == 3){
            gameResultElem.innerHTML="BLUE WINS!!!!";
            gameResultElem.style.color = colors[1];
            increBlue();
            clearBoard();
        }
    }

    //if no winner and all boxes clicked, show tie
    if (clicks == 9)
    {
        gameResultElem.innerHTML="Tie!";
        //clearBoard();
    }
}

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
    //reset clicks
    clicks = 0;
}

//create board
createBoard();