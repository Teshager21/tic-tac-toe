  
const player=(playerName='',playerMark='',playerScore=0)=>{
    let mark=playerMark;
    let score=playerScore;
    let name=playerName;
    return {
    setName(newName){
        name=newName;
    },
    getName(){
        return name;
    },
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
     return score;
    }
}
};

let numberOfRounds=0;
const player1=player();
const player2=player();
player1.setMark('X');
player2.setMark('O');
const players={player1:player1,player2:player2}

numOfMoves=0;
let gameState='';
let winner='';
let move;
currentPlayer='player1';

const container=document.querySelector('.container');
const result=container.querySelector('.result');





const gameBoard=(()=>{
    const boardUI=container.querySelector('.board');
    let board=[['','',''],['','',''],['','','']];
    const clickHandler=(e)=>{
        if(gameState==='on'){
            move=parseInt(e.target.getAttribute('id').slice(-1));
            setBoardCell(move);
            updateBoardDisplay();
            runGameLogic();
            updateBoardDisplay(); 
            currentPlayer==="player1"?currentPlayer="player2":currentPlayer="player1";  

    }}
    setBoardCell=(position)=>{
        if(board[parseInt((position-1)/3)][(position-1)%3]===''){
            board[parseInt((position-1)/3)][(position-1)%3]=players[currentPlayer].getMark();
        }
       
    }
    updateBoardDisplay=()=>{
        
        const firstDisplayName=container.querySelector('.first-player-name');
        const secondDisplayName=container.querySelector('.second-player-name');
        const firstDisplayScore=container.querySelector('.first-player-score');
        const secondDisplayScore=container.querySelector('.second-player-score');
        console.log(player1.getScore());
        firstDisplayName.textContent=`${player1.getName()} [${player1.getMark()}]`;
        secondDisplayName.textContent=`${player2.getName()} [${player2.getMark()}]`
        firstDisplayScore.textContent=player1.getScore();
        secondDisplayScore.textContent=player2.getScore();
        for(i=0;i<3;i++){
            for(j=0;j<3;j++){
                boardUI.querySelector(`#cell-${3*i+j+1}`).textContent=board[i][j];
            }
        }
        if(gameState==='over') {
            if(winner==='tie') result.textContent=`Game over! It's a tie`;
            else result.textContent=`Game over! ${players[currentPlayer].getName()} won`;
        }
    }
    runGameLogic=()=>{
        counter=0;
          
          if((board[0][0]===board[1][1]) && (board[0][0]===board[2][2])&&board[0][0]!==''){ //same mark diagonally
            gameState='over';
            winner=currentPlayer;
            numberOfRounds++;
            
            const newScore=players[currentPlayer].getScore()+1;
            console.log('before win: ',players[currentPlayer].getScore(),newScore);
            players[currentPlayer].setScore(newScore);
            console.log('after win: ',players[currentPlayer].getScore());

            return;
        }
        if((board[0][2]===board[1][1]) && (board[0][2]===board[2][0])&&board[0][2]!==''){//same mark diagonally
            gameState='over';
            winner=currentPlayer;
            numberOfRounds++;
            players[currentPlayer].setScore(players[currentPlayer].getScore()+1);
            return;
        }
       outer_loop: for(i=0;i<3;i++){
            if((board[i][0]===board[i][1]) && (board[i][0]===board[i][2])&&board[i][0]!==''){   //same mark in a row
                gameState='over';
                winner=currentPlayer;
                numberOfRounds++;
                players[currentPlayer].setScore(players[currentPlayer].getScore()+1);
                break
            }
            for(j=0;j<3;j++){ 
                if((board[0][j]===board[1][j]) && (board[0][j]===board[2][j])&&board[0][j]!==''){  //same mark in a column
                    gameState='over';
                    winner=currentPlayer;
                    numberOfRounds++;
                    players[currentPlayer].setScore(players[currentPlayer].getScore()+1);
                    break outer_loop;
            }
                //when all cells are filled
                if(board[i][j]===''){
                    gameState='on';
                    break;
                }else{
                    counter++;
                }
                // gameOver
                if(counter==9){
                    gameState='over';
                    winner='tie';
                      numberOfRounds++;  
                }
            }
            
        }
    }
    return{setBoardCell,updateBoardDisplay,runGameLogic
        ,
        resetBoard(){
            board=[['','',''],
            ['','',''],
            ['','','']];
            updateBoardDisplay();
        },
        getBoard(){
            return board;
        },
         
        bindEvent(){
            boardUI.addEventListener('click',clickHandler,false);
        }


    } 
})();

gameBoard.bindEvent();

//dialog
const playBtn=document.querySelector('.play');
playBtn.addEventListener('click',()=>{   
        nameInputDialog.showModal();
        gameBoard.resetBoard();
        gameState='on';
    
})
const nameInputDialog= container.querySelector('#nameInputDialog');
const closeDialogBtn= nameInputDialog.querySelector('#closeDialog')
const firstPlayerName=nameInputDialog.querySelector('#playerName1')
const secondPlayerName=nameInputDialog.querySelector('#playerName2')
const confirmNameBtn=nameInputDialog.querySelector('#confirmNameBtn')

closeDialogBtn.addEventListener('click',()=>{nameInputDialog.close();}) //close event
const captureDialogReturnValue=(e)=>{

    e.preventDefault();
    if(firstPlayerName.value!==''&&secondPlayerName.value!==''){
        nameInputDialog.close([firstPlayerName.value,secondPlayerName.value]);
        const playerNames=nameInputDialog.returnValue.split(',');
        player1.setName(playerNames[0]);
        player2.setName(playerNames[1]);
        gameBoard.updateBoardDisplay();
    }
   
}

confirmNameBtn.addEventListener('click',captureDialogReturnValue)







