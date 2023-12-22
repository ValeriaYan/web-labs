import { HTMLElements } from "./HTMLElements";

export class Handlers {
    constructor(game) {
        this.game = game;
    }

    start() {
        HTMLElements.htmlBoard.addEventListener('click', this.checkerClickHandler.bind(this));
        HTMLElements.newGameBtn.addEventListener('click', this.newGameBtnClickHandler.bind(this));
        HTMLElements.exampleBtn.addEventListener('click', this.exampleBtnClickHandler.bind(this));
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
            } else if(event.target.dataset.isActive == "true") {
                this.game.removeActiveChecker();
            }
        }
    }
}

