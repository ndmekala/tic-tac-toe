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

// multiple players … use factories
const player = (name) => {
    return {name};
}

// one display controller… use module
var displayController = (function() {
    let xturn = true;
    let twoplayer = false;
    let playing = false;
    let currentPlayerOne = player('…');
    let currentPlayerTwo = player('COMPUTER');
    let grid = [cellObj('a1'), cellObj('a2'), cellObj('a3'), cellObj('b1'), cellObj('b2'), cellObj('b3'), cellObj('c1'), cellObj('c2'), cellObj('c3')]
    document.getElementById('playerone').textContent = currentPlayerOne.name;
    document.getElementById('playertwo').textContent = currentPlayerTwo.name;
    const cellObj = (gridLocation) => {
        return {cell: gridLocation, content: ''}
    }
    // X PLAYER
    document.getElementById('playerbtnone').addEventListener(('click'), () => {
        if (!playing) {
            currentPlayerOne = player(prompt('Player One, what is your name?'));
            document.getElementById('playerone').textContent = currentPlayerOne.name;
        }
    })
    // O PLAYER
    document.getElementById('playerbtntwo').addEventListener(('click'), () => {
        if (!playing) {
            if (!twoplayer) {
                twoplayer = true;
                document.getElementById('toggle').textContent = 'One player'
            }
            currentPlayerTwo = player(prompt('Player Two, what is your name?'))
            document.getElementById('playertwo').textContent = currentPlayerTwo.name;
        }
    })
    // TWO PLAYER TOGGLE
    document.getElementById('toggle').addEventListener(('click'), () => {
        if (!playing) {
            if (twoplayer) {
                twoplayer = false;
                document.getElementById('toggle').textContent = 'two player'
                document.getElementById('playertwo').textContent = 'COMPUTER'
    
            } else {
                twoplayer = true;
                document.getElementById('toggle').textContent = 'one player'
                currentPlayerTwo = player(prompt('Player Two, what is your name?'))
                document.getElementById('playertwo').textContent = currentPlayerTwo.name;
            }
        }
    })
    // START AND RESTART
    document.getElementById('start').addEventListener(('click'), () => {
        if (!playing) {
            playing = true;
            document.getElementById('start').textContent = 'Restart'
            if (twoplayer) {
                document.getElementById('display').textContent = currentPlayerOne.name + '’s Turn';
            }
        } else {
            playing = false;
            xturn = true;
            for (let i=0; i < 9; i++) {
                grid[i].content = '';
            }
            document.getElementById('start').textContent = 'Start';
            document.getElementById('display').textContent = '';
            gameboardModule.updateGameBoard();
        }
    })
    // BOX EVENT LISTENERS
    for (let i =1; i <=9; i++) {
        document.getElementById(grid[i-1].cell).addEventListener(('click'), () => {
            if (playing) {
                if (!grid[i-1].content) {
                    if (xturn) {
                        grid[i-1].content = 'X'
                        console.log(testGrid())
                        if (twoplayer) {
                            xturn = false;
                            document.getElementById('display').textContent = currentPlayerTwo.name + '’s Turn';
                        } else {
                            let random
                            while (true) {
                                random = Math.round(Math.random()*8);
                                if (!grid[random].content) break;
                            }
                            grid[random].content = 'O'
                            console.log(testGrid())
                        }
                    }
                    else {
                        grid[i-1].content = 'O'
                        console.log(testGrid())
                        xturn = true;
                        document.getElementById('display').textContent = currentPlayerOne.name + '’s Turn';
                    }
                }
                gameboardModule.updateGameBoard();
            }
        })
    }
    function testGrid() {
        if (grid[0].content && grid[0].content === grid[1].content && grid[1].content === grid[2].content) {
            return grid[0].content;
        }
        else if (grid[3].content && grid[3].content === grid[4].content && grid[4].content === grid[5].content) {
            return grid[3].content;
        }
        else if (grid[6].content && grid[6].content === grid[7].content && grid[7].content === grid[8].content) {
            return grid[6].content;
        }
        else if (grid[0].content && grid[0].content === grid[3].content && grid[3].content === grid[6].content) {
            return grid[0].content;
        }
        else if (grid[1].content && grid[1].content === grid[4].content && grid[4].content === grid[7].content) {
            return grid[1].content;
        }
        else if (grid[2].content && grid[2].content === grid[5].content && grid[5].content === grid[8].content) {
            return grid[2].content;
        }
        else if (grid[0].content && grid[0].content === grid[4].content && grid[4].content === grid[8].content) {
            return grid[0].content;
        }
        else if (grid[2].content && grid[2].content === grid[4].content && grid[4].content === grid[6].content) {
            return grid[2].content;
        }
        else {
            return false
        }
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
