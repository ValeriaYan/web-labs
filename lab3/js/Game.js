import { Checkers } from './checkers';

export class Game {
    constructor(view) {
       this.activeChecker = null;
       this.checkers = null;
       this.view = view;
       this.notation = null;
    }

    getBoard() {
        return this.checkers.getBoard();
    }

    newGame() {
        this.activeChecker = null;
        this.checkers = new Checkers();
    }
    
    startNewGame() {
        this.newGame();
        this.checkers.fillBoard();
        this.view.fillHtmlBoard(this.getBoard());
    }
    
    startExampleGame() {
        this.newGame();
        this.checkers.fillExampleBoard();
        this.view.fillHtmlBoard(this.getBoard());
    }
    

    setActiveChecker(checker) {
        this.activeChecker = checker;
        this.view.setActiveChecker(checker);
        this.view.displayAvailableCells(this.getRequireMoves(checker), this.getAvailableMoves(checker));
    }

    removeActiveChecker() {
        this.view.removeActiveChecker(this.activeChecker);
        this.activeChecker = null;
    }

    getAvailableMoves(checker) {
        const checkerPosition = [+checker.parentNode.dataset.row, +checker.parentNode.dataset.col];
        const checkerType = checker.classList.contains('black') ? 'black' : 'white';
        return this.checkers.getAvailableMoves(checkerPosition, checkerType);
    }
    
    getRequireMoves(checker) {
        const checkerPosition = [+checker.parentNode.dataset.row, +checker.parentNode.dataset.col];
        const checkerType = checker.classList.contains('black') ? 'black' : 'white';
        return this.checkers.getRequireMoves(checkerPosition, checkerType)
    }
}