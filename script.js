
const gameBoard=[['','',''],
                 ['','',''],
                 ['','','']];
const setBoardCell=(position)=>{
    gameBoard[parseInt((position-1)/3)][(position-1)%3]='X';
    console.log(gameBoard);
}

setBoardCell(1);