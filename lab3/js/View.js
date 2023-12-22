import { HTMLElements } from "./HTMLElements";

export class View {
    constructor() {}

    fillHtmlBoard(board) {
        this.clearBoard();
        for(let i = 0; i < board.getBoard().length; i++) {
            for(let j = 0; j < board.getBoard()[i].length; j++) {
                if(board.getBoard()[i][j]?.getPlayer() == board.getPlayer1()) {
                    const checker = this.createCheckerImg(board.getPlayer1())
                    HTMLElements.htmlCells[i * 8 + j].append(checker);
                    if(board.getBoard()[i][j]?.getIsQueen()) {
                        this.turnIntoQueen(checker);
                    }
                } 
                if(board.getBoard()[i][j]?.getPlayer() == board.getPlayer2()) {
                    const checker = this.createCheckerImg(board.getPlayer2());
                    HTMLElements.htmlCells[i * 8 + j].append(checker);
                    if(board.getBoard()[i][j]?.getIsQueen()) {
                        this.turnIntoQueen(checker);
                    }
                } 
            }
        }
    }

    clearBoard() {
        HTMLElements.htmlCells.forEach((cell) => {
            const child = cell.children[0];
            cell.classList.remove('require');
            cell.classList.remove('available');
            cell.classList.remove('checked');
            if(child) {
                cell.removeChild(child);
            }
        });
    }

    createCheckerImg(typePlayer) {
        const img = document.createElement('img');
        img.className = 'board__checker';
        if(typePlayer == 'white') {
            img.src = '../../assets/checker__white.png';
            img.classList.add('white');
        }
        if(typePlayer == 'black') {
            img.src = '../../assets/checker__black.png';
            img.classList.add('black');
        }
        img.dataset.isActive = false;
        img.dataset.isMoved = false;
    
        return img;
    }

    turnIntoQueen(checker) {
        checker.classList.contains('white') ? checker.src = '../../assets/checker__white-queen.png' : checker.src = '../../assets/checker__black-queen.png';
        checker.classList.add('queen');
    }

    displayAvailableCells(requireMoves, availableMoves) {
        this.removeAvailableCells();
        if(requireMoves != 0) {
            for(let i = 0; i < requireMoves.length; i++) {
                const indexCell = requireMoves[i][0] * 8 + requireMoves[i][1];
                HTMLElements.htmlCells[indexCell].classList.add('require');
            }
        } else {
            for(let i = 0; i < availableMoves.length; i++) {
                const indexCell = availableMoves[i][0] * 8 + availableMoves[i][1];
                HTMLElements.htmlCells[indexCell].classList.add('available');
            }
        }
    }

    removeAvailableCells() {
        for(let i = 0; i < HTMLElements.htmlCells.length; i++) {
            HTMLElements.htmlCells[i].classList.remove('require');
            HTMLElements.htmlCells[i].classList.remove('available');
        }
    }

    setActiveChecker(checker) {
        checker.dataset.isActive = true;
        const parent = checker.parentNode;
        const indexParent = +parent.dataset.row * 8 + +parent.dataset.col;
        this.blockAllCheckersExceptOne(indexParent);
        parent.classList.add('checked');
    }
    
    removeActiveChecker(checker) {
        checker.dataset.isActive = false;
        checker.dataset.isMoved = false;
        this.unlockAllCheckers();
        const parent = checker.parentNode;
        parent.classList.remove('checked');
        this.removeAvailableCells();
    }

    getCellByIndex(index) {
        return HTMLElements.htmlCells[index];
    }

    blockAllCheckersExceptOne(index) {
        for(let i = 0; i < HTMLElements.htmlCells.length; i++) {
            if(i !== index && HTMLElements.htmlCells[i].children[0]) {
                HTMLElements.htmlCells[i].children[0].style.pointerEvents = 'none';
            }
        }
    }

    unlockAllCheckers() {
        for(let i = 0; i < HTMLElements.htmlCells.length; i++) {
            if(HTMLElements.htmlCells[i].children[0]) {
                HTMLElements.htmlCells[i].children[0].style.pointerEvents = 'auto';
            }
        }
    }
}