
// for the board
function GameBoard() {
    let board = [];
    const createBoard = () => {
        board = [];
        let num = 1;
        for (let i = 0; i < 3; i++) {
            board[i] = [];

            for (let j = 0; j < 3; j++) {
                board[i][j] = num++;
            }
        }
    }
    const getBoard = () => board;
    const resetBoard = () => createBoard();
    createBoard();

    return { getBoard, resetBoard };
};

// for the players
const CreatePlayer = (name, marker) => ({ name, marker });


let title = document.querySelector(".title-div");
title.textContent = "New Game";
let win = false;
let gameButton = document.querySelector(".flex-item");

//for the game
function GameController() {

    const gameBoard = GameBoard();
    let gb = gameBoard.getBoard();

    let players = [];
    let activePlayer = null;

    function setPlayers(name1, name2) {
        players = [
            CreatePlayer(name1, 'X'),
            CreatePlayer(name2, 'O')
        ];
        activePlayer = players[0];
    }

    function switchPlayer() {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    function placeMark(row, col) {
        gb[row][col] = activePlayer.marker;
        checkWin();
        if (!win) {
            switchPlayer();
            title.textContent = activePlayer.name + "'s" + " turn";
        }
    }

    function findCell(num) {
        for (let i = 0; i < gb.length; i++) {
            for (let j = 0; j < gb[i].length; j++) {
                if (gb[i][j] == num) {
                    return { row: i, col: j };
                }
            }
        }
        return null;
    }

    function gameEvent(event) {
        if (!/^[1-9]$/.test(event.target.value)) {
            return;
        }
        const num = Number(event.target.value);
        const pos = findCell(num);
        if (!pos) {
            return
        };

        placeMark(pos.row, pos.col);
    }

    function resetGame() {
        gameBoard.resetBoard();
        gb = gameBoard.getBoard();
        activePlayer = players[0];
    }

    function checkWin() {
        const rows = gb.length;
        const cols = gb[0].length;
        const isMarker = v => v === "X" || v === "O";

        // horizontals
        for (let r = 0; r < rows; r++) {
            const a = gb[r][0];
            if (isMarker(a) && a === gb[r][1] && a === gb[r][2]) {
                win = true;
                title.textContent = activePlayer.name + " Wins!!!";
            }
        }

        // verticals
        for (let c = 0; c < cols; c++) {
            const a = gb[0][c];
            if (isMarker(a) && a === gb[1][c] && a === gb[2][c]) {
                win = true;
                title.textContent = activePlayer.name + " Wins!!!";
            }
        }

        // diagonals
        if (isMarker(gb[0][2])) {
            if (gb[0][2] === gb[1][1] && gb[1][1] === gb[2][0]) {
                win = true;
                title.textContent = activePlayer.name + " Wins!!!";
            };
        };

        if (isMarker(gb[0][0])) {
            if (gb[0][0] === gb[1][1] && gb[1][1] === gb[2][2]) {
                win = true;
                title.textContent = activePlayer.name + " Wins!!!";
            };
        };

    }

    return { setPlayers, gameEvent, checkWin, resetGame, getBoard: () => gb };
};

function ScreenDisplay() {
    const game = GameController();
    console.log(game);
    const playerOne = document.querySelector("#playerone");
    const playerTwo = document.querySelector("#playertwo");
    const boardDisplay = document.querySelector(".flex-container");
    boardDisplay.classList.add("hidden");

    const headerDisplay = document.querySelector(".header");
    const start = document.querySelector("#start");
    const startButton = document.createElement("button");
    startButton.textContent = "Start Game!";

    start.appendChild(startButton);
    headerDisplay.append(start);

    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset!";
    headerDisplay.append(resetButton);

    const UpdateScreen = () => {
        boardDisplay.textContent = "";
        const board = game.getBoard();
        console.log(board);
        board.forEach(row => {
            row.forEach(cell => {
                const boxButton = document.createElement("button");
                boxButton.classList.add("flex-item");
                boxButton.textContent = cell;
                boxButton.value = cell;
                if (cell === "X") {
                    boxButton.classList.add("flex-x");
                }
                if (cell === "O") {
                    boxButton.classList.add("flex-o");
                }
                boardDisplay.appendChild(boxButton);
            });
        });
    }

    startButton.addEventListener("click", () => {
        game.setPlayers(playerOne.value, playerTwo.value);
        boardDisplay.classList.remove("hidden");
        UpdateScreen();
        title.textContent = playerOne.value + "'s" + " turn";
    });


    resetButton.addEventListener('click', event => {
        game.resetGame();
        title.textContent = "New Game";
        win = false;
        UpdateScreen();
    });

    boardDisplay.addEventListener('click', event => {
        game.gameEvent(event);
        UpdateScreen();
    });
};

ScreenDisplay();
