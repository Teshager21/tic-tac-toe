  const Game=(()=>{
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
    const player1=player('','X',0);
    const player2=player('','O',0);
    const players={player1:player1,player2:player2}
    let gameState='';
    let move;
    let currentPlayer='player1';
    let gameOutCome='';
    let entries=[['','',''],['','',''],['','','']];

    const resetEntries=()=>{entries=[['','',''],['','',''],['','','']];}

   const resetGame=()=>{
        resetEntries();
        numberOfRounds=0;
        player1.setScore(0);
        player2.setScore(0);
        gameOutCome='';
    }
    recordEntry=(position)=>{
        if(entries[parseInt((position-1)/3)][(position-1)%3]===''){
            entries[parseInt((position-1)/3)][(position-1)%3]=players[currentPlayer].getMark();
        }
       
    }
    const gameBoard=(()=>{

        const container=document.querySelector('.container');
        const result=container.querySelector('.result');
        const board=container.querySelector('.board');
        const playBtn=container.querySelector('.play');
        const nameInputDialog= container.querySelector('#nameInputDialog');
        const closeDialogBtn= nameInputDialog.querySelector('#closeDialog')
        const confirmNameBtn=nameInputDialog.querySelector('#confirmNameBtn')
    
        const displayArray=()=>{
            for(i=0;i<3;i++){
                for(j=0;j<3;j++){
                    board.querySelector(`#cell-${3*i+j+1}`).textContent=entries[i][j];
                }
            } 
        }
    
       updateBoardDisplay=()=>{
            
            const firstDisplayName=container.querySelector('.first-player-name');
            const secondDisplayName=container.querySelector('.second-player-name');
            const firstDisplayScore=container.querySelector('.first-player-score');
            const secondDisplayScore=container.querySelector('.second-player-score');
    
            firstDisplayName.innerText=player1.getName();
            secondDisplayName.textContent=player2.getName();
            firstDisplayScore.textContent=player1.getScore();
            secondDisplayScore.textContent=player2.getScore();
            result.textContent=gameOutCome;
            displayArray();
        } 
        const showModal=()=>{
            nameInputDialog.showModal(); 
        }
        const closeModal=()=>{
            nameInputDialog.close();  
        }
    const bindEvents=()=>{
                board.addEventListener('click',gameController);
                playBtn.addEventListener('click',gameController);//play
                closeDialogBtn.addEventListener('click',gameController) //close event
                confirmNameBtn.addEventListener('click',gameController);
            } 
    const captureDialogReturnValue=(e)=>{
        const firstPlayerName=nameInputDialog.querySelector('#playerName1');
        const secondPlayerName=nameInputDialog.querySelector('#playerName2'); 
        // e.preventDefault();
        if(firstPlayerName.value!==''&&secondPlayerName.value!==''){
            nameInputDialog.close([firstPlayerName.value,secondPlayerName.value]);
            return nameInputDialog.returnValue;
        }
        
    }  
        return{updateBoardDisplay,bindEvents,captureDialogReturnValue,showModal,closeModal} 
    })();

    const gameController=(e)=>{
        if(e.target.getAttribute('id')==='new_game'){
            gameBoard.showModal();
        }
        if(e.target.getAttribute('id')==='closeDialog'){
            gameBoard.closeModal();
        }
        if(e.target.getAttribute('id')==='confirmNameBtn'){
            readPlayerNames(e);
        }
        if(e.target.getAttribute('class')==='cell'){
            // alert('whaaat?')
            handleCellSelection(e);
        }


        const play=(e)=>{
            move=parseInt(e.target.getAttribute('id').slice(-1));
            recordEntry(move);
            runGameLogic();
            updateBoardDisplay(); 
            currentPlayer==="player1"?currentPlayer="player2":currentPlayer="player1";
        }
        readPlayerNames=(e)=>{
            e.preventDefault();
            if(gameBoard.captureDialogReturnValue()){
                const playerNames=gameBoard.captureDialogReturnValue().split(',');
                player1.setName(playerNames[0]);
                player2.setName(playerNames[1]);
                resetGame();
                gameBoard.updateBoardDisplay();
                gameState='on';
            } 
        } 
    
        handleCellSelection=(e)=>{
            if(gameState==='on') play(e);
            if(gameState==='continue'){
                gameBoard.updateBoardDisplay();
                resetEntries()
                gameState='on'; 
                gameOutcome='';
            }
            else if(gameState==='over') {
                    if(player1.getScore()===player2.getScore()) gameOutCome=`Game over! It's a tie`;
                    else if(player1.getScore()>player2.getScore()) gameOutCome=`Game over! ${player1.getName()} won`;
                    else gameOutCome=`Game over! ${player2.getName()} won`;
                }
                else{ gameOutCome =`${players[currentPlayer].getName()}'s turn`;}

            if(gameState!==''){
                gameOutcome='';
                gameBoard.updateBoardDisplay(); 
            }
        }    
    }
    
    runGameLogic=()=>{
        counter=0;
          
          if((entries[0][0]===entries[1][1]) && (entries[0][0]===entries[2][2])&&entries[0][0]!==''){ //same mark diagonally
            if(numberOfRounds<3){
                gameState='continue'
            }else {
                gameState='over';
            }
            
            numberOfRounds++;
            
            const newScore=players[currentPlayer].getScore()+1;
            players[currentPlayer].setScore(newScore);
            return;
        }
        if((entries[0][2]===entries[1][1]) && (entries[0][2]===entries[2][0])&&entries[0][2]!==''){//same mark diagonally
            (numberOfRounds<3)?gameState='continue':gameState='over';
            numberOfRounds++;
            players[currentPlayer].setScore(players[currentPlayer].getScore()+1);
            return;
        }
       outer_loop: for(i=0;i<3;i++){
            if((entries[i][0]===entries[i][1]) && (entries[i][0]===entries[i][2])&&entries[i][0]!==''){   //same mark in a row
                (numberOfRounds<3)?gameState='continue':gameState='over';
                numberOfRounds++;
                players[currentPlayer].setScore(players[currentPlayer].getScore()+1);
                break
            }
            for(j=0;j<3;j++){ 
                if((entries[0][j]===entries[1][j]) && (entries[0][j]===entries[2][j])&&entries[0][j]!==''){  //same mark in a column
                    (numberOfRounds<3)?gameState='continue':gameState='over';
                    numberOfRounds++;
                    players[currentPlayer].setScore(players[currentPlayer].getScore()+1);
                    break outer_loop;
            }
                //when all cells are filled
                if(entries[i][j]===''){
                    gameState='on';
                    break;
                }else{
                    counter++;
                }
                // gameOver
                if(counter==9){
                    (numberOfRounds<3)?gameState='continue':gameState='over';
                      numberOfRounds++;  
                }
            }
            
        }
    }
    gameBoard.bindEvents();
    
    })();
