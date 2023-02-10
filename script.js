// if you only ever need one of something, use a module. if you need multiples of something, use factories

// gameboard module
let gameBoardModule = (function() { // variable that calls anonymous function
   let gameBoard = ["X"]; // declare empty array
   return {gameBoard}; // braces allow us to return an object/funciton to make it public
})(); // empty parenthesis immediately invokes function

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
               console.log('show me makemoves linked button value: ', makeMoveBtns.dataset.linkedButton);
               console.log('show gamegrid linked button value: ', gameGrids.dataset.linkedButton);
            }
         index++;
         })
      }
   index++;
   })
})();

// players factory function
let playersFactory = (playerName, playerNumber, marker) => {
   let getPlayerName = () => {
      playerName;
      console.log('player' + playerNumber +'\'s name is: ' + playerName);
   }
   return {getPlayerName, playerName, playerNumber, marker};
};

let alex = playersFactory('Alex', 1, 'X');
let max = playersFactory('Max', 2, 'O');

displayControllerModule;

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