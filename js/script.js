console.log("javascript linked");

let whoseTurn = "X";

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