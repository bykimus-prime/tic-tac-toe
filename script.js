// if you only ever need one of something, use a module. if you need multiples of something, use factories

const createPlayer = (name, marker) => {
   return {name, marker};
}

const titleScreenModule = (() => {
   const startBtn = document.querySelector('.start-game-btn');
   const field = document.querySelector('.gameboard');
   const resetBtn = document.querySelector('.reset-btn');

   const openGameboard = () => {
      field.classList.add('active');
      startBtn.style.display = 'none';
      resetBtn.classList.add('active');
   }

   startBtn.addEventListener('click', openGameboard);

   resetBtn.addEventListener('click', () => {
      location.reload();
   })
   return {};
})();

// gameboard module
const gameBoardModule = (function() {

   // make board array
   let board = [];
   for (i = 0; i < 9; i++) {
      board.push('');
   }

   let gameboard = document.querySelector('.gameboard');

   // add event listeners on each square
   Array.from(gameboard.children).forEach((cell, index) => {
      cell.addEventListener('click', () => {
         // display active player marker
         cell.innerHTML = (gameControllerModule.currentPlayer.marker);
         cell.setAttribute('data', gameControllerModule.currentPlayer.marker);
         // update array value to be that of active player
         board[index] = gameControllerModule.currentPlayer.marker;
         // remove event listener from the marked index
         cell.style.pointerEvents = 'none';
         // update remaining moves
         gameControllerModule.cellsRemaining -= 1;
         // check winner
         gameControllerModule.checkWinner();
         if (gameControllerModule.winnerExists == false) {
            if (gameControllerModule.cellsRemaining > 0) {
               gameControllerModule.nextPlayer();
               gameControllerModule.displayNextPlayer();
            } else if (gameControllerModule.cellsRemaining === 0) {
            gameControllerModule.tieGame();
            }
         } else if (gameControllerModule.winnerExists == true) {
            Array.from(gameboard.children).forEach((cell) => {
               cell.style.pointerEvents = 'none';
            })
         }
      })
   });
   return {board};
})();

// game controller module
const gameControllerModule = (() => {

   // declare players
   const playerOne = createPlayer('Player 1', 'X');
   const playerTwo = createPlayer('Player 2', 'O');

   // starting point
   let currentPlayer = playerOne;
   let winnerExists = false;
   let cellsRemaining = 9;
   let dispPlayerName = document.querySelector('.disp-player-name');

   // win conditions
   const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
   ];

   // check winner
   function checkWinner() {
      winConditions.forEach((item) => { // [0, 1, 2, 3, 4, 5, 6, 7]
         if (gameBoardModule.board[item[0]] === this.currentPlayer.marker && gameBoardModule.board[item[1]] === this.currentPlayer.marker && gameBoardModule.board[item[2]] === this.currentPlayer.marker) {
            dispPlayerName.innerHTML = `${this.currentPlayer.name} wins!`;
            this.winnerExists = true;
         }
      })
   }

   function tieGame() {
      dispPlayerName.textContent = 'Tie game! No one wins, everyone lost.';
   }

   // display the next player
   function displayNextPlayer() {
      dispPlayerName.textContent = `${ this.currentPlayer.name }'s turn.`;
   }

   // next player
   function nextPlayer() {
      this.currentPlayer === playerOne ? this.currentPlayer = playerTwo : this.currentPlayer = playerOne;
   }

   return {
      currentPlayer,
      cellsRemaining,
      winnerExists,
      checkWinner,
      tieGame,
      displayNextPlayer,
      nextPlayer,
   };
})();