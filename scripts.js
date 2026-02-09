
// for the board
function GameBoard() {
    const board = [];
    let num = 1;
    for (let i = 0; i < 3; i++) {
        board[i] = [];

        for (let j = 0; j < 3; j++) {
            board[i][j] = num++;
        }
    }
    const getBoard = () => board;

    return { getBoard };
};

// const gb = GameBoard();

// for the players
const CreatePlayer = (name, marker) => ({ name, marker });

//for the game
function GameController() {

    const board = GameBoard().getBoard();
    console.log(board);

    let players = [];
    let activePlayer = null;

    function setPlayers(name1, name2) {
        players = [
            CreatePlayer(name1, 'X'),
            CreatePlayer(name2, 'O')
        ];
        activePlayer = players[0]
    }

    function switchPlayer() {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        console.log(activePlayer);
    }

    function placeMark(row, col) {
        board[row][col] = activePlayer.marker;
        console.log(board);
        checkWin()
        switchPlayer();
    }

    function findCell(num) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === num) {
                    console.log("row:", i);
                    console.log("col:", j);
                    return { row: i, col: j };
                }
            }
        }
        return null;
    }

    function gameEvent(event) {
        if (!/^[1-9]$/.test(event.key)) {
            return;
        }
        const num = Number(event.key);
        const pos = findCell(num);
        if (!pos) {
            return
        };

        placeMark(pos.row, pos.col);
    }

    // window.addEventListener('keydown', gameEvent);

    // check win
    function checkWin() {

        const rows = board.length;
        const cols = board[0].length;
        const isMarker = v => v === "X" || v === "O";

        // horizontals
        for (let r = 0; r < rows; r++) {
            const a = board[r][0];
            if (isMarker(a) && a === board[r][1] && a === board[r][2]) {
                console.log("Win!");
                // return true;
            }
        }
        // return false;

        // verticals
        for (let c = 0; c < cols - 1; c++) {
            const a = board[0][c];
            if (isMarker(a) && a === board[1][c] && a === board[2][c]) {
                console.log("Win!");
                // return true;
            }
        }
        // return false;

        // diagonals
        let arr1 = [];
        for (let d = 0; d < board.length; d++) {
            if (isMarker(board[d][d])) {
                arr1.push(board[d][d]);
            }
        }
        if (arr1.length == 3) {
            for (let i = 1; i < arr1.length; i++) {
                if (arr1[i] !== arr1[0]) {
                    return false;
                }
            }
            console.log("Win!");
            return true;
        }

        let arr2 = [];
        for (let d = 0; d < board.length; d++) {
            const j = board.length - 1 - d;
            if (isMarker(board[d][j])) {
                arr2.push(board[d][j]);
            }
        }
        if (arr2.length == 3) {
            for (let i = 1; i < arr2.length; i++) {
                if (arr2[i] !== arr2[0]) {
                    return false;
                }
            }
            console.log("Win!");
            return true;
        }
    }

    return { setPlayers, gameEvent, board, checkWin };
};

function ScreenDisplay() {
    const game = GameController();
    game.setPlayers("Player 1", "Player 2");
    const boardDisplay = document.querySelector(".flex-container");
    // boardDisplay.textContent = "";

    const UpdateScreen = () => {
        boardDisplay.textContent = "";
        const board = game.board;
        console.log(board);
        board.forEach(row => {
            console.log(row);
            row.forEach(cell => {
                console.log(cell);
                const boxButton = document.createElement("button");
                boxButton.classList.add("flex-item");
                boxButton.textContent = cell;
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

    UpdateScreen();

    window.addEventListener('keydown', event => {
        game.gameEvent(event);
        UpdateScreen();
    });
};

ScreenDisplay();
// GameController.setPlayers("jeff", "mary");
