
var gameboardModule = (function() {
    return {
        updateGameBoard: function() {
            for (let i = 1; i <= 9; i++) {
                document.getElementById(displayController.display[i-1].cell).textContent = displayController.display[i-1].content;
            }
        }
    }
})();

const player = (name) => {
    return {name};
}

var displayController = (function() {
    let xturn = true;
    let twoplayer = false;
    let playing = false;
    let currentPlayerOne = player('PLAYER ONE');
    let currentPlayerTwo = player('COMPUTER');
    const cellObj = (gridLocation) => {
        return {cell: gridLocation, content: ''}
    }
    let grid = [cellObj('a1'), cellObj('a2'), cellObj('a3'), cellObj('b1'), cellObj('b2'), cellObj('b3'), cellObj('c1'), cellObj('c2'), cellObj('c3')]
    document.getElementById('playerone').textContent = currentPlayerOne.name;
    document.getElementById('playertwo').textContent = currentPlayerTwo.name;
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
            } else {
                document.getElementById('display').textContent = '';
            }
            gameboardModule.updateGameBoard();
            // functions weirdly. press once. nothing changes on screen but now you can enter names…
        } else {
            playing = false;
            xturn = true;
            for (let i=0; i < 9; i++) {
                grid[i].content = '';
            }
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
                        gameboardModule.updateGameBoard();
                        if (testGrid() === 'X') {
                            document.getElementById('display').textContent = currentPlayerOne.name + ' Wins!';
                            for (let i=0; i < 9; i++) {
                                grid[i].content = '';
                            }
                            playing = false;
                        } else if (testGrid() === 'full') {
                            document.getElementById('display').textContent = 'Draw!';
                            for (let i=0; i < 9; i++) {
                                grid[i].content = '';
                            }
                            playing = false;
                        } else {
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
                                gameboardModule.updateGameBoard();
                                if (testGrid() === 'O') {
                                    document.getElementById('display').textContent = currentPlayerTwo.name + ' Wins!';
                                    for (let i=0; i < 9; i++) {
                                        grid[i].content = '';
                                    }
                                    playing = false;
                                }
                            }
                            
                        }
                    }
                    else {
                        grid[i-1].content = 'O'
                        gameboardModule.updateGameBoard();
                        if (testGrid() === 'O') {
                            document.getElementById('display').textContent = currentPlayerTwo.name + ' Wins!';
                            for (let i=0; i < 9; i++) {
                                grid[i].content = '';
                            }
                            console.table(grid)
                            playing = false;
                        } else if (testGrid() === 'full') {
                            document.getElementById('display').textContent = 'Draw!';
                            for (let i=0; i < 9; i++) {
                                grid[i].content = '';
                            }
                            playing = false;
                        } else {
                            document.getElementById('display').textContent = currentPlayerOne.name + '’s Turn';
                        }
                        xturn = true;
                    }
                }
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
        else if (
            grid[0].content !== '' &&
            grid[1].content !== '' &&
            grid[2].content !== '' &&
            grid[3].content !== '' &&
            grid[4].content !== '' &&
            grid[5].content !== '' &&
            grid[6].content !== '' &&
            grid[7].content !== '' &&
            grid[8].content !== ''
            ) {
            return 'full';
        }
        else {
            return false
        }
    }
    return {
        display: grid
    }
})();
