  
const player=(playerName,playerMark,playerScore)=>{
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
     return playerScore;
    }
}
};

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
            return;
        }
        if((board[0][2]===board[1][1]) && (board[0][2]===board[2][0])&&board[0][2]!==''){//same mark diagonally
            gameState='over';
            winner=currentPlayer;
           
            return;
        }
       outer_loop: for(i=0;i<3;i++){
            if((board[i][0]===board[i][1]) && (board[i][0]===board[i][2])&&board[i][0]!==''){   //same mark in a row
                gameState='over';
                winner=currentPlayer;
                break
            }
            for(j=0;j<3;j++){ 
                if((board[0][j]===board[1][j]) && (board[0][j]===board[2][j])&&board[0][j]!==''){  //same mark in a column
                    gameState='over';
                    winner=currentPlayer;
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
        gameState='on';
    
})
const nameInputDialog= document.querySelector('#nameInputDialog');
const closeDialogBtn= nameInputDialog.querySelector('#closeDialog')
const firstPlayerName=nameInputDialog.querySelector('#playerName1')
const secondPlayerName=nameInputDialog.querySelector('#playerName2')
const confirmNameBtn=nameInputDialog.querySelector('#confirmNameBtn')

closeDialogBtn.addEventListener('click',()=>{nameInputDialog.close();}) //close event

confirmNameBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(firstPlayerName.value!==''&&secondPlayerName.value!==''){
        nameInputDialog.close([firstPlayerName.value,secondPlayerName.value]);
        const playerNames=nameInputDialog.returnValue.split(',');
        player1.setName(playerNames[0]);
        player2.setName(playerNames[1]);
    }
   
})





