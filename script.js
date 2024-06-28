
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
player2=playerFactory();
console.log(player1);
player1.setMark('X');
player2.setMark('O');
console.log('score is: ',player1.getScore())

currentPlayer=player1;
const gameBoard=[['','',''],
                 ['','',''],
                 ['','','']];
const setBoardCell=(position)=>{
    gameBoard[parseInt((position-1)/3)][(position-1)%3]=currentPlayer.getMark();
    console.log(gameBoard);
}

setBoardCell(1);