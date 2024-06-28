
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
numOfMoves=0;
let gameOver=false;
currentPlayer=player1;

const Board=(currentGamePlayer)=>{
    const currentPlayer=currentGamePlayer;
    let board=[['','',''],['','',''],['','','']];
    return{
        setBoardCell(position){
            board[parseInt((position-1)/3)][(position-1)%3]=currentPlayer.getMark();
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
const gameBoard= Board(currentPlayer);
boardArray=gameBoard.getBoard();
//gameOver conditions
const checkGameOver=()=>{
    
    counter=0;
      //same mark diagonally
      if((boardArray[0][0]===boardArray[1][1]) && (boardArray[0][0]===boardArray[2][2])&&boardArray[0][0]!==''){
        gameOver=true;
        console.log('been here'); 
        return;
    }
    if((boardArray[0][2]===boardArray[1][1]) && (boardArray[0][2]===boardArray[2][0])&&boardArray[0][2]!==''){
        gameOver=true;
        console.log('been here'); 
        return;
    }
    for(i=0;i<3;i++){
        //same mark in a row
        if((boardArray[i][0]===boardArray[i][1]) && (boardArray[i][0]===boardArray[i][2])&&boardArray[i][0]!==''){
            gameOver=true;
            console.log('been here'); 
            break
        }
        for(j=0;j<3;j++){
            //same mark in a column
            if((boardArray[0][j]===boardArray[1][j]) && (boardArray[0][j]===boardArray[2][j])&&boardArray[0][j]!==''){
                gameOver=true;
                console.log('been here'); 
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
            console.log('game on');
        }
        
    }
}

while(!gameOver){
    let move=prompt('input a cell reference');
    gameBoard.setBoardCell(parseInt(move));
    currentPlayer===player1?currentPlayer=player2:currentPlayer=player1;
    checkGameOver();
    console.log(boardArray);
}