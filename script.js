// if you only ever need one of something, use a module. if you need multiples of something, use factories

// players factory function
let playersFactory = () => {

   // loop through two times to get player's first name, auto assign player number and marker
   for (let i = 0; i < 4; i++) { // 4 because need some tries to input information correctly before needing to manually try again
      if (gameBoardModule.playerArray.length >= 6) { // 6 because 3 object attributes for each player
         gameBoardModule.makePlayerMove();
         break;

      } else if (gameBoardModule.playerArray.length == 0) { // nothing in playerArray yet
         let playerName = prompt('What\'s your name?');
         if (playerName == '' || playerName == null) {
            alert('Name can\'t be blank.');
            continue;
         }
         let playerNumber = 1;
         let marker = 'X';
         alert('You are Player 1, your marker is X');
         gameBoardModule.playerArray.push(playerName, playerNumber, marker);

      } else if (gameBoardModule.playerArray.length !== 0) {
         let playerName = prompt('What\'s your name?');
         if (playerName == '' || playerName == null) {
            alert('Name can\'t be blank.');
            continue;
         }
         let playerNumber = 2;
         let marker = 'O';
         alert('You are Player 2, your marker is O');
         gameBoardModule.playerArray.push(playerName, playerNumber, marker);
      }
   }
};

// gameboard module
let gameBoardModule = (function() {
   let gameBoard = [];
   let playerArray = [];

   // public function to make next player move
   let makePlayerMove = () => {
      // check for two player submission and gameboard array doesn't spill over grid cells
      if (playerArray.length == 6 && gameBoard.length < 9) { // 6 means all 3 attributes for each player is loaded
         // controls for player moves
         if (gameBoard.length == 0) { // first play of the game
            alert('Player 1\'s move.')
            gameBoard.push(playerArray[2]); // item 2 is marker for player 1, X
         } else if (gameBoard[gameBoard.length - 1] == 'X') { // most recent far right item in array
            alert('Player 2\'s move.');
            gameBoard.push(playerArray[5]); // item 5 is marker for player 2, O
         } else if (gameBoard[gameBoard.length - 1] == 'O') {
            alert('Player 1\'s move.');
            gameBoard.push(playerArray[2]);
         }
      }
   }
   return {gameBoard, playerArray, makePlayerMove};
})();

// display controller module
let displayControllerModule = (function() {
   const makeMoveBtn = document.querySelectorAll('.gameboard-btn');
   
   // index anad loop through each button node
   let index = 0;
   makeMoveBtn.forEach(makeMoveBtns => {
      makeMoveBtns.dataset.linkedButton = index; // creates data attribute of linkedButton for each .gameboard-btn
      makeMoveBtns.addEventListener('click', renderArray);

      function renderArray() {
         const gameGrid = document.querySelectorAll('.cell');

         // index and loop through each grid box node
         let index = 0;
         gameGrid.forEach(gameGrids => {
            gameGrids.dataset.linkedButton = index; // same as above but for each .cell

            // render clicked play on grid cell
            if (gameGrids.getAttribute('data-linked-button') == makeMoveBtns.getAttribute('data-linked-button')) { //getAttribute searches html, so used dashes for data-linked-button instead of linkedButton
               gameGrids.textContent = gameBoardModule.gameBoard[gameBoardModule.gameBoard.length - 1]; // goes to most recent array item in gameboard
            }
         index++;
         })
      gameBoardModule.makePlayerMove(); // each time btn is clicked 
      }
   index++;
   })
   // listen for click to start game
   const startGameBtn = document.querySelector('.start-game-btn');
   startGameBtn.addEventListener('click', playersFactory);
   return {};
})();


// modal logic
// const openAddBookModal = () => {
//    addBookModal.classList.add('active');
//    overlay.classList.add('active');
// }

// const closeAddBookModal = () => {
//    addBookModal.classList.remove('active');
//    overlay.classList.remove('active');
// }

// addNewBookBtn.onclick = openAddBookModal;
// overlay.onclick = closeAddBookModal;