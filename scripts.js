
// for the board
const GameBoard = function () {
    const board = [];
    let num = 1;
    for (let i = 0; i < 3; i++) {
        board[i] = [];

        for (let j = 0; j < 3; j++) {
            board[i][j] = num++;
        }
    }
    const getBoard = () => board;

    return { board, getBoard };
};

const gb = GameBoard();

// for the players
const CreatePlayer = (name, marker) => ({ name, marker });

//for the game
const GameController = (function () {
    const playBoard = GameBoard();
    const board = playBoard.getBoard();
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
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    function placeMark(row, col) {
        board[row][col] = activePlayer.marker;
        console.log(board);
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
        if (!/^\d$/.test(event.key)) {
            return;
        }
        const num = Number(event.key);
        const pos = findCell(num);
        if (!pos) {
            return
        };

        placeMark(pos.row, pos.col);
    }

    window.addEventListener('keydown', gameEvent);

    return { setPlayers, board };
}());

GameController.setPlayers("jeff", "mary");
