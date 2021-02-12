// one gameBoard… use module
// write a function that will render the contents of the gameboard array to the webpage
var gameboardModule = (function() {
    return {
        updateGameBoard: function() {
            for (let i = 1; i <= 9; i++) {
                document.getElementById(displayController.display[i-1].cell).textContent = displayController.display[i-1].content;
            }
        }
    }
})();

// one display controller… use module
var displayController = (function() {
    let xturn = true;
    const cellObj = (gridLocation) => {
        return {cell: gridLocation, content: ''}
    }
    let grid = [cellObj('a1'), cellObj('a2'), cellObj('a3'), cellObj('b1'), cellObj('b2'), cellObj('b3'), cellObj('c1'), cellObj('c2'), cellObj('c3')]
    for (let i =1; i <=9; i++) {
        document.getElementById(grid[i-1].cell).addEventListener(('click'), () => {
            if (!grid[i-1].content) {
                if (xturn) {
                    grid[i-1].content = 'X'
                    xturn = false;
                }
                else {
                    grid[i-1].content = 'O'
                    xturn = true;
                }
            }
            gameboardModule.updateGameBoard();
        })
    }
    return {
        display: grid
    }
})();

// multiple players … use factories
const player = (name) => {
    return {name};
}



// build the funcitons that allow players to add marks to a specific spot on the board,
// and then tie it to the DOM, lettin gplayers click on the gameboard to place their marker
// don’t forget the logic that keeps players from playing in spots that are already taken
// think carefully about where each bit of logic should reside. each little piece of functinaltiy should
// be able to fit in the game, player, or gameboard objects… but take care to put them in “logical” places

// build the logic that checks for when the game is over!
// should check for 3 in a row and a tie

// clean up the interface to allow players to put intheir names,
// include a button to start/ restart the game
// and add a display element that congratulates the winning player
