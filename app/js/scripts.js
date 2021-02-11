// one gameBoard… use module
// write a function that will render the contents of the gameboard array to the webpage
var gameboardModule = (function() {
    gridConverter = {
        1: 'a1',
        2: 'a2',
        3: 'a3',
        4: 'b1',
        5: 'b2',
        6: 'b3',
        7: 'c1',
        8: 'c2',
        9: 'c3',
    }
    let c3
    document.getElementById('c3').addEventListener('click', () => {
        c3 = 'X'
        gameboardModule.updateGameBoard();
    })
    let a1 = 'X'
    let a2 = 'O'
    let a3 = '!'
    let b1 = ''
    let b2 = ''
    let b3 = ''
    let c1 = ''
    let c2 = ''
    // let c3 = ''
    return {
        updateGameBoard: function() {
            let gameboardArray = [a1, a2, a3, b1, b2, b3, c1, c2, c3];
            for (let i = 1; i <= 9; i++) {
                const cell = document.getElementById(gridConverter[i]);
                cell.textContent = gameboardArray[i-1];
            }
        }
    }
})();

// one display controller… use module

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
