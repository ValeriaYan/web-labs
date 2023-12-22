import { Checker } from './Checker';
import { Board } from './Board';

export class Checkers {
    constructor() {
        this.board = new Board();
        this.currentPlayer = this.board.player1;
    }

    fillBoard() {
        const newBoard = [
            [null, new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2())],
            [new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2()), null],
            [null, new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2())],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1()), null],
            [null, new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1())],
            [new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1()), null],
        ]
        this.board.setBoard(newBoard);
    }

    fillExampleBoard() {
        const newBoard = [
            [null, new Checker(this.board.getPlayer2()), null, null, null, null, null, null],
            [null, null, new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2()), null, null, null],
            [null, null, null, null, null, null, null, new Checker(this.board.getPlayer2())],
            [null, null, new Checker(this.board.getPlayer2()), null, null, null, null, null],
            [null, null, null, null, null, new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1())],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, new Checker(this.board.getPlayer2(), true), null, null, null, null, null],
        ]
        this.board.setBoard(newBoard);
    }

    getAvailableMoves(checkerPosition, checkerType) {
        let availableMoves = [];
        const rowIndex = checkerPosition[0];
        const colIndex = checkerPosition[1];

        if(this.board.getBoard()[rowIndex][colIndex]?.getIsQueen()) {
            return this.getAvailableMovesForQueen(checkerPosition, checkerType);
        }

        if (checkerType == this.board.getPlayer1()) {
            if (this.board.getBoard()[rowIndex - 1]?.[colIndex - 1] === null) {
                availableMoves.push([rowIndex - 1, colIndex - 1]);
            }
            if (this.board.getBoard()[rowIndex - 1]?.[colIndex + 1] === null) {
                availableMoves.push([rowIndex - 1, colIndex + 1]);
            }
        }
        if (checkerType == this.board.getPlayer2()) {
            if (this.board.getBoard()[rowIndex + 1]?.[colIndex - 1] === null) {
                availableMoves.push([rowIndex + 1, colIndex - 1]);
            }
            if (this.board.getBoard()[rowIndex + 1]?.[colIndex + 1] === null) {
                availableMoves.push([rowIndex + 1, colIndex + 1]);
            }
        }

        return availableMoves;
    }

    getRequireMoves(checkerPosition, checkerType) {
        let requireMoves = [];
        const rowIndex = checkerPosition[0];
        const colIndex = checkerPosition[1];

        if(this.board.getBoard()[rowIndex][colIndex]?.getIsQueen()) {
            return this.getRequireMovesForQueen(checkerPosition, checkerType);
        }

        if (this.board.getBoard()[rowIndex - 1]?.[colIndex - 1] !== null && this.board.getBoard()[rowIndex - 1]?.[colIndex - 1]?.getPlayer() !== checkerType) {
            if (this.board.getBoard()[rowIndex - 2]?.[colIndex - 2] === null) {
                requireMoves.push([rowIndex - 2, colIndex - 2]);
            }
        }
        if (this.board.getBoard()[rowIndex - 1]?.[colIndex + 1] !== null && this.board.getBoard()[rowIndex - 1]?.[colIndex + 1]?.getPlayer() !== checkerType) {
            if (this.board.getBoard()[rowIndex - 2]?.[colIndex + 2] === null) {
                requireMoves.push([rowIndex - 2, colIndex + 2]);
            }
        }
        if (this.board.getBoard()[rowIndex + 1]?.[colIndex - 1] !== null && this.board.getBoard()[rowIndex + 1]?.[colIndex - 1]?.getPlayer() !== checkerType) {
            if (this.board.getBoard()[rowIndex + 2]?.[colIndex - 2] === null) {
                requireMoves.push([rowIndex + 2, colIndex - 2]);
            }
        }
        if (this.board.getBoard()[rowIndex + 1]?.[colIndex + 1] !== null && this.board.getBoard()[rowIndex + 1]?.[colIndex + 1]?.getPlayer() !== checkerType) {
            if (this.board.getBoard()[rowIndex + 2]?.[colIndex + 2] === null) {
                requireMoves.push([rowIndex + 2, colIndex + 2]);
            }
        }

        return requireMoves;
    }

    getAllPlayerCheckers(player) {
        const checkers = [];
        const board = this.board.getBoard();
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                if(board[i][j]?.getPlayer() == player) {
                    checkers.push([i, j]);
                }
            }
        }

        return checkers;
    }

    getAvailableMovesForQueen(checkerPosition) {
        const row = checkerPosition[0];
        const col = checkerPosition[1];
        const diagonal1 = [[row - 1, col - 1], [row - 2, col - 2], [row - 3, col - 3], [row - 4, col - 4], [row - 5, col - 5], [row - 6, col - 6], [row - 7, col - 7]];
        const diagonal2 = [[row - 1, col + 1], [row - 2, col + 2], [row - 3, col + 3], [row - 4, col + 4], [row - 5, col + 5], [row - 6, col + 6], [row - 7, col + 7]];
        const diagonal3 = [[row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3], [row + 4, col + 4], [row + 5, col + 5], [row + 6, col + 6], [row + 7, col + 7]];
        const diagonal4 = [[row + 1, col - 1], [row + 2, col - 2], [row + 3, col - 3], [row + 4, col - 4], [row + 5, col - 5], [row + 6, col - 6], [row + 7, col - 7]];

        const movesForDiagonal1 = this.getAvailableMovesOnDiagonal(diagonal1);
        const movesForDiagonal2 = this.getAvailableMovesOnDiagonal(diagonal2);
        const movesForDiagonal3 = this.getAvailableMovesOnDiagonal(diagonal3);
        const movesForDiagonal4 = this.getAvailableMovesOnDiagonal(diagonal4);

        return [...movesForDiagonal1, ...movesForDiagonal2, ...movesForDiagonal3, ...movesForDiagonal4];
    }

    getAvailableMovesOnDiagonal(diagonal) {
        const availableMoves = [];
        for(let i = 0; i < diagonal.length; i++) {
            const cell = diagonal[i];
            if(this.board.getBoard()?.[cell[0]]?.[cell[1]] === null) {
                availableMoves.push(cell);
            } else {
                return availableMoves;
            }
        }

        return availableMoves;
    }

    getRequireMovesForQueen(checkerPosition, checkerType) {
        const row = checkerPosition[0];
        const col = checkerPosition[1];
        const diagonal1 = [[row - 1, col - 1], [row - 2, col - 2], [row - 3, col - 3], [row - 4, col - 4], [row - 5, col - 5], [row - 6, col - 6], [row - 7, col - 7]];
        const diagonal2 = [[row - 1, col + 1], [row - 2, col + 2], [row - 3, col + 3], [row - 4, col + 4], [row - 5, col + 5], [row - 6, col + 6], [row - 7, col + 7]];
        const diagonal3 = [[row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3], [row + 4, col + 4], [row + 5, col + 5], [row + 6, col + 6], [row + 7, col + 7]];
        const diagonal4 = [[row + 1, col - 1], [row + 2, col - 2], [row + 3, col - 3], [row + 4, col - 4], [row + 5, col - 5], [row + 6, col - 6], [row + 7, col - 7]];

        const moveForDiagonal1 = this.getRequireMovesOnDiagonal(diagonal1, checkerType);
        const moveForDiagonal2 = this.getRequireMovesOnDiagonal(diagonal2, checkerType);
        const moveForDiagonal3 = this.getRequireMovesOnDiagonal(diagonal3, checkerType);
        const moveForDiagonal4 = this.getRequireMovesOnDiagonal(diagonal4, checkerType);

        return [...moveForDiagonal1, ...moveForDiagonal2, ...moveForDiagonal3, ...moveForDiagonal4];
    }

    getRequireMovesOnDiagonal(diagonal, checkerType) {
        const requireMove = [];
        for(let i = 0; i < diagonal.length; i++) {
            const cell = diagonal[i];
            if(this.board.getBoard()?.[cell[0]]?.[cell[1]] != null && 
                this.board.getBoard()?.[cell[0]]?.[cell[1]]?.getPlayer() !== checkerType && 
                this.board.getBoard()?.[diagonal[i + 1][0]]?.[diagonal[i + 1][1]] === null) {
                    requireMove.push(diagonal[i + 1]);
            }
        }

        return requireMove;
    }

    getBoard() {
        return this.board;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }
}