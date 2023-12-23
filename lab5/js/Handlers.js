import { HTMLElements } from "./HTMLElements";

export class Handlers {
    constructor(game) {
        this.game = game;
    }

    start() {
        HTMLElements.htmlBoard.addEventListener('click', this.checkerClickHandler.bind(this));
        HTMLElements.htmlBoard.addEventListener('click', this.cellClickHandler.bind(this));
        HTMLElements.overlay.addEventListener('click', this.overlayClickHandler.bind(this));
        HTMLElements.newGameBtn.addEventListener('click', this.newGameBtnClickHandler.bind(this));
        HTMLElements.exampleBtn.addEventListener('click', this.exampleBtnClickHandler.bind(this));
        HTMLElements.completeMoveBtn.addEventListener('click', this.completeBtnClickHandler.bind(this));
        HTMLElements.cancelMoveBtn.addEventListener('click', this.cancelBtnClickHandler.bind(this));
        HTMLElements.showBoardBtn.addEventListener('click', this.showBoardBtnClickHandler.bind(this));
        HTMLElements.copyNotationBtn.addEventListener('click', this.copyNotationBtnClickHandler.bind(this));
    }

    copyNotationBtnClickHandler() {
        navigator.clipboard.writeText(HTMLElements.textarea.value)
            .then(function(x) {
                const alert = document.createElement('div');
                alert.className = 'alert active';
                alert.textContent = 'Notation was copied';
                document.body.prepend(alert);
                setTimeout(() => {
                    alert.classList.remove('active');
                }, 3000)
                setTimeout(() => {
                    document.body.removeChild(alert);
                }, 3500)
            })
            .catch(err => {
                console.log('Something went wrong', err);
            });
    }

    showBoardBtnClickHandler() {
        navigator.clipboard.readText()
            .then(text => {
                HTMLElements.textarea.value = text;
                HTMLElements.textarea.textContent = text;
                this.game.startGameFromNotation();
            })
            .catch(err => {
                console.log('Something went wrong', err);
            });
    }

    completeBtnClickHandler() {
        this.game.completeMove();
    }

    cancelBtnClickHandler() {
        this.game.cancelMove();
    }
    
    newGameBtnClickHandler() {
        this.game.startNewGame();
    }

    exampleBtnClickHandler() {
        this.game.startExampleGame();
    }

    checkerClickHandler(event) {
        if(event.target.classList.contains(`board__checker`)) {
            if(event.target.dataset.isActive == "false") {
                this.game.setActiveChecker(event.target);
            } else if(event.target.dataset.isActive == "true" && event.target.dataset.isMoved == "false") {
                this.game.removeActiveChecker();
            }
        }
    }

    cellClickHandler(event) {
        if(event.target.classList.contains(`board__cell`) && ((event.target.classList.contains(`available`) || event.target.classList.contains(`require`)))) {
            this.game.moveChecker(event.target);
        }
    }

    overlayClickHandler() {
        HTMLElements.winnerBlock.classList.remove('active');
    }

}

