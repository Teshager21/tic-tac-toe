
const playerFactory=(playerMark,playerScore)=>{
    let mark=playerMark;
    const score=playerScore;
    return {
    setMark(newMark){
        mark=newMark;
    },
    getMark(){
     return  mark;
    },
    setScore(newScore){
        score=newScore;
    },
    getScore(){
     return playerScore;
    }
}
};

const player1=playerFactory('',0);
const player2=playerFactory();
player1.setMark('X');
player2.setMark('O');
const players={player1:player1,player2:player2}
// console.log('ma player is ',players['player1'].getMark());

numOfMoves=0;
let gameOver=false;
currentPlayer='player2';

const Board=(currentGamePlayer)=>{
    let currentPlayer=currentGamePlayer;
    let board=[['','',''],['','',''],['','','']];
    return{
        setBoardCell(position){
            board[parseInt((position-1)/3)][(position-1)%3]=players[currentPlayer].getMark();
            currentPlayer==="player1"?currentPlayer="player2":currentPlayer="player1";
            console.log('i was setting stuff here.',board,currentPlayer);
        },
        resetBoard(){
            board=[['','',''],
            ['','',''],
            ['','','']];
        },
        getBoard(){
            return board;
        }

    } 
};
// console.log('curren player when called',players[currentPlayer].getMark());
const gameBoard= Board(currentPlayer);
boardArray=gameBoard.getBoard();
//gameOver conditions
const checkGameOver=()=>{
    
    counter=0;
      //same mark diagonally
      if((boardArray[0][0]===boardArray[1][1]) && (boardArray[0][0]===boardArray[2][2])&&boardArray[0][0]!==''){
        gameOver=true;
       alert(`game over ${currentPlayer}won`);
        return;
    }
    if((boardArray[0][2]===boardArray[1][1]) && (boardArray[0][2]===boardArray[2][0])&&boardArray[0][2]!==''){
        gameOver=true;
       alert(`game over ${currentPlayer}won`);
        return;
    }
    for(i=0;i<3;i++){
        //same mark in a row
        if((boardArray[i][0]===boardArray[i][1]) && (boardArray[i][0]===boardArray[i][2])&&boardArray[i][0]!==''){
            gameOver=true;
           alert(`game over ${currentPlayer}won`);
            break
        }
        for(j=0;j<3;j++){
            //same mark in a column
            if((boardArray[0][j]===boardArray[1][j]) && (boardArray[0][j]===boardArray[2][j])&&boardArray[0][j]!==''){
                gameOver=true;
               alert(`game over ${currentPlayer} won`);
                break
            }
            //when all cells are filled
            if(boardArray[i][j]===''){
                gameOver=false;
                break;
            }else{
                counter++;
            }
            // gameOver
            if(counter==9){
                gameOver=true;
                alert(`game over ${currentPlayer}won`);
            }
        }
        
    }
}
let move;

//display
const updateBoardDisplay=()=>{
    for(i=0;i<3;i++){
        for(j=0;j<3;j++){
            let identifier=`cell-${3*i+j+1}`;
            console.log('the id is: ',identifier)
            document.getElementById(identifier).textContent=boardArray[i][j];
        }
    }
}

//even listeners
const boardUI=document.querySelector('.board');
boardUI.addEventListener('click',(e)=>{
    // e.target.textContent= players[currentPlayer].getMark();
    // console.log(e.target.getAttribute('id').slice(-1));
    move=e.target.getAttribute('id').slice(-1);
    // console.log(move);
    gameBoard.setBoardCell(parseInt(move));
    updateBoardDisplay();
    checkGameOver();
})
console.log(boardUI);
// while(!gameOver){
//     //  move=prompt('input a cell reference');
//     console.log('you clicked the cell',move)
//     gameBoard.setBoardCell(parseInt(move));
//     console.log('current player before',players[currentPlayer].getMark());
//     checkGameOver();
//     console.log(boardArray);
// }
