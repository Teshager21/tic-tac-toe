
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
let move;
currentPlayer='player2';

const Board=(currentGamePlayer)=>{
    let currentPlayer=currentGamePlayer;
    let board=[['','',''],['','',''],['','','']];
    return{
        setBoardCell(position){
            if(board[parseInt((position-1)/3)][(position-1)%3]===''){
                board[parseInt((position-1)/3)][(position-1)%3]=players[currentPlayer].getMark();
                currentPlayer==="player1"?currentPlayer="player2":currentPlayer="player1";
            }
           
        },
        resetBoard(){
            board=[['','',''],
            ['','',''],
            ['','','']];
        },
        getBoard(){
            return board;
        },
        updateBoardDisplay(){
            for(i=0;i<3;i++){
                for(j=0;j<3;j++){
                    document.getElementById(`cell-${3*i+j+1}`).textContent=boardArray[i][j];
                }
            }
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
       
        return;
    }
    if((boardArray[0][2]===boardArray[1][1]) && (boardArray[0][2]===boardArray[2][0])&&boardArray[0][2]!==''){
        gameOver=true;
       
        return;
    }
    for(i=0;i<3;i++){
        //same mark in a row
        if((boardArray[i][0]===boardArray[i][1]) && (boardArray[i][0]===boardArray[i][2])&&boardArray[i][0]!==''){
            gameOver=true;
            break
        }
        for(j=0;j<3;j++){
            //same mark in a column
            if((boardArray[0][j]===boardArray[1][j]) && (boardArray[0][j]===boardArray[2][j])&&boardArray[0][j]!==''){
                gameOver=true;
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
                
            }
        }
        
    }
}


//even listeners
const boardUI=document.querySelector('.board');
boardUI.addEventListener('click',(e)=>{
    if(!gameOver){
    move=e.target.getAttribute('id').slice(-1);
    gameBoard.setBoardCell(parseInt(move));
    gameBoard.updateBoardDisplay();
    checkGameOver();
    if(gameOver) alert(`game over ${currentPlayer}won`);
}})

