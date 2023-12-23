import { Checker } from './Checker';
import {PositionDoesNotExist, 
        WrongCheckerInPosition, 
        UnavailablePosition,
        WrongNewPosition } from './errors/ParsingError';
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

    moveChecker(oldPosition, newPosition) {
        const checker = this.board.getBoard()[oldPosition[0]][oldPosition[1]];
        this.replacePositionChecker(oldPosition, newPosition);
        if(newPosition[0] == 0 && checker.getPlayer() == this.board.getPlayer1()) {
            checker.setQueen();
        }
        if(newPosition[0] == 7 && checker.getPlayer() == this.board.getPlayer2()) {
            checker.setQueen();
        }

        return this.checkDeletion(oldPosition, newPosition);
    }

    replacePositionChecker(oldPosition, newPosition) {
        const checker = this.board.getBoard()[oldPosition[0]][oldPosition[1]];
        this.board.getBoard()[oldPosition[0]][oldPosition[1]] = null;
        this.board.getBoard()[newPosition[0]][newPosition[1]] = checker;
    }

    checkDeletion(oldPosition, newPosition) {
        const way = this.getWay(oldPosition, newPosition);
        for(let i = 0; i < way.length - 1; i++) {
            if(this.board.getBoard()[way[i][0], way[i][1]] !== null) {
                return this.deleteChecker(way[i][0], way[i][1]);
            }
        }
    }

    checkQueen(checkerPosition) {
        return this.board.getBoard()[checkerPosition[0]][checkerPosition[1]].getIsQueen();
    }

    checkMove(oldPosition, newPosition, notationRow, notationPositions) {
        if(oldPosition[0] > 7 || oldPosition[1] > 7 || oldPosition[0] < 0 || oldPosition[1] < 0) {
            throw new PositionDoesNotExist(notationPositions[0], notationRow);
        }
        if(newPosition[0] > 7 || newPosition[1] > 7 || newPosition[0] < 0 || newPosition[1] < 0) {
            throw new PositionDoesNotExist(notationPositions[1], notationRow);
        }
        const checker = this.board.getBoard()[oldPosition[0]][oldPosition[1]];
        if(!checker || checker.getPlayer() !== this.currentPlayer) {
            throw new WrongCheckerInPosition(notationPositions[0], notationRow);
        }

        const availablePositions = this.getAvailableMoves(oldPosition);
        const requirePositions = this.getRequireMoves(oldPosition);

        if(!availablePositions.find((position) => position[0] == newPosition[0] && position[1] == newPosition[1]) &&
        !requirePositions.find((position) => position[0] == newPosition[0] && position[1] == newPosition[1])) {
            throw new UnavailablePosition(notationPositions[1], notationRow);
        }
        
        if(availablePositions.find((position) => position[0] == newPosition[0] && position[1] == newPosition[1]) && requirePositions.length !== 0){
            throw new WrongNewPosition(notationPositions[1], notationRow);
        }

        return true;
    }

    deleteChecker(row, col) {
        const checker = this.board.getBoard()[row][col];
        this.board.getBoard()[row][col] = null;
        return checker;
    }
    
    returnDeletedChecker(checker, position) {
        this.board.getBoard()[position[0]][position[1]] = checker;
    }

    switchPlayer() {
        if (this.currentPlayer == this.board.getPlayer1()) {
            this.currentPlayer = this.board.getPlayer2();
        } else {
            this.currentPlayer = this.board.getPlayer1();
        }

        return this.currentPlayer;
    }

    checkLoss() {
        const checkers = this.getAllPlayerCheckers(this.currentPlayer);
        if(checkers.length == 0) {
            return true;
        }

        for(let i = 0; i < checkers.length; i++) {
            if(this.getAvailableMoves(checkers[i]).length !== 0 || this.getRequireMoves(checkers[i]).length !== 0) {
                return false;
            }
        }

        return true;
    }

    getAvailableMoves(checkerPosition) {
        let availableMoves = [];
        const rowIndex = checkerPosition[0];
        const colIndex = checkerPosition[1];

        if(this.board.getBoard()[rowIndex][colIndex]?.getIsQueen()) {
            return this.getAvailableMovesForQueen(checkerPosition);
        }

        if (this.currentPlayer == this.board.getPlayer1()) {
            if (this.board.getBoard()[rowIndex - 1]?.[colIndex - 1] === null) {
                availableMoves.push([rowIndex - 1, colIndex - 1]);
            }
            if (this.board.getBoard()[rowIndex - 1]?.[colIndex + 1] === null) {
                availableMoves.push([rowIndex - 1, colIndex + 1]);
            }
        }
        if (this.currentPlayer == this.board.getPlayer2()) {
            if (this.board.getBoard()[rowIndex + 1]?.[colIndex - 1] === null) {
                availableMoves.push([rowIndex + 1, colIndex - 1]);
            }
            if (this.board.getBoard()[rowIndex + 1]?.[colIndex + 1] === null) {
                availableMoves.push([rowIndex + 1, colIndex + 1]);
            }
        }

        return availableMoves;
    }

    getRequireMoves(checkerPosition) {
        let requireMoves = [];
        const rowIndex = checkerPosition[0];
        const colIndex = checkerPosition[1];

        if(this.board.getBoard()[rowIndex][colIndex]?.getIsQueen()) {
            return this.getRequireMovesForQueen(checkerPosition);
        }

        if (this.board.getBoard()[rowIndex - 1]?.[colIndex - 1] !== null && this.board.getBoard()[rowIndex - 1]?.[colIndex - 1]?.getPlayer() !== this.currentPlayer) {
            if (this.board.getBoard()[rowIndex - 2]?.[colIndex - 2] === null) {
                requireMoves.push([rowIndex - 2, colIndex - 2]);
            }
        }
        if (this.board.getBoard()[rowIndex - 1]?.[colIndex + 1] !== null && this.board.getBoard()[rowIndex - 1]?.[colIndex + 1]?.getPlayer() !== this.currentPlayer) {
            if (this.board.getBoard()[rowIndex - 2]?.[colIndex + 2] === null) {
                requireMoves.push([rowIndex - 2, colIndex + 2]);
            }
        }
        if (this.board.getBoard()[rowIndex + 1]?.[colIndex - 1] !== null && this.board.getBoard()[rowIndex + 1]?.[colIndex - 1]?.getPlayer() !== this.currentPlayer) {
            if (this.board.getBoard()[rowIndex + 2]?.[colIndex - 2] === null) {
                requireMoves.push([rowIndex + 2, colIndex - 2]);
            }
        }
        if (this.board.getBoard()[rowIndex + 1]?.[colIndex + 1] !== null && this.board.getBoard()[rowIndex + 1]?.[colIndex + 1]?.getPlayer() !== this.currentPlayer) {
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

    getRequireMovesForQueen(checkerPosition) {
        const row = checkerPosition[0];
        const col = checkerPosition[1];
        const diagonal1 = [[row - 1, col - 1], [row - 2, col - 2], [row - 3, col - 3], [row - 4, col - 4], [row - 5, col - 5], [row - 6, col - 6], [row - 7, col - 7]];
        const diagonal2 = [[row - 1, col + 1], [row - 2, col + 2], [row - 3, col + 3], [row - 4, col + 4], [row - 5, col + 5], [row - 6, col + 6], [row - 7, col + 7]];
        const diagonal3 = [[row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3], [row + 4, col + 4], [row + 5, col + 5], [row + 6, col + 6], [row + 7, col + 7]];
        const diagonal4 = [[row + 1, col - 1], [row + 2, col - 2], [row + 3, col - 3], [row + 4, col - 4], [row + 5, col - 5], [row + 6, col - 6], [row + 7, col - 7]];

        const moveForDiagonal1 = this.getRequireMovesOnDiagonal(diagonal1);
        const moveForDiagonal2 = this.getRequireMovesOnDiagonal(diagonal2);
        const moveForDiagonal3 = this.getRequireMovesOnDiagonal(diagonal3);
        const moveForDiagonal4 = this.getRequireMovesOnDiagonal(diagonal4);

        return [...moveForDiagonal1, ...moveForDiagonal2, ...moveForDiagonal3, ...moveForDiagonal4];
    }

    getRequireMovesOnDiagonal(diagonal) {
        const requireMove = [];
        for(let i = 0; i < diagonal.length; i++) {
            const cell = diagonal[i];
            if(this.board.getBoard()?.[cell[0]]?.[cell[1]] != null && 
                this.board.getBoard()?.[cell[0]]?.[cell[1]]?.getPlayer() !== this.currentPlayer && 
                this.board.getBoard()?.[diagonal[i + 1][0]]?.[diagonal[i + 1][1]] === null) {
                    requireMove.push(diagonal[i + 1]);
            }
        }

        return requireMove;
    }

    getWay(startPosition, endPosition) {
        const way = [];
        let rowStart = startPosition[0];
        let colStart = startPosition[1];
        let rowEnd = endPosition[0];
        let colEnd = endPosition[1];
        if(rowStart > rowEnd && colStart > colEnd) {
            for(let i = rowStart; i > rowEnd; i--) {
                way.push([--rowStart, --colStart])
            }
        }
        if(rowStart > rowEnd && colStart < colEnd) {
            for(let i = rowStart; i > rowEnd; i--) {
                way.push([--rowStart, ++colStart])
            }
        }
        if(rowStart < rowEnd && colStart > colEnd) {
            for(let i = rowStart; i < rowEnd; i++) {
                way.push([++rowStart, --colStart])
            }
        }
        if(rowStart < rowEnd && colStart < colEnd) {
            for(let i = rowStart; i < rowEnd; i++) {
                way.push([++rowStart, ++colStart])
            }
        }

        return way;
    }

    getBoard() {
        return this.board;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }
}