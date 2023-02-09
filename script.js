// if you only ever need one of something, use a module. if you need multiples of something, use factories

// gameboard module
let gameBoardModule = (function() { // variable that calls anonymous function
   let gameBoard = []; // declare empty array
   return {}; // braces allow us to return an object/funciton to make it public
})(); // empty parenthesis immediately invokes function

// display controller module
let displayControllerModule = (function() {
   let testVar = () => {console.log('this is a private function call inside a module')};
   return {testVar};
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