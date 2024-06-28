
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
while(!gameOver){
    let move=prompt('number of shit');
    gameBoard.setBoardCell(parseInt(move));
    currentPlayer===player1?currentPlayer=player2:currentPlayer=player1;
    gameOver=true;
    console.log(gameBoard.getBoard());
}