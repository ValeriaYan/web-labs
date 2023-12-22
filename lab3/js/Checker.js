export class Checker {
    constructor(player, isQueen) {
        this.player = player;
        if(isQueen) {
            this.isQueen = isQueen;
        } else {
            this.isQueen = false;
        }
    }

    setQueen() {
        this.isQueen = true;
    }

    getIsQueen() {
        return this.isQueen;
    }

    getPlayer() {
        return this.player;
    }
}