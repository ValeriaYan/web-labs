export class Notation {
    constructor(textarea) {
        this.horizontal = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        this.vertical = ['8', '7', '6', '5', '4', '3', '2', '1'];
        this.textarea = textarea;
        this.currentMove = 1;
        this.currentPlayer = 1;
    }

    writeMove(checkerWay) {
        let result = `${this.currentMove}.${this.currentPlayer} `;
        for(let i = 0; i < checkerWay.length; i++) {
            if(checkerWay[i].deleted === null) {
                result += this.turnIndicesInPositionOnBoard(checkerWay[i].position);
                if(checkerWay[i + 1]?.deleted === null){
                    result += '-';
                } else {
                    result += ':';
                }
            } 
        }
        result = result.slice(0 , result.length - 1) + '\n';
        this.textarea.value += result;
        this.textarea.textContent = this.textarea.value;
        if(this.currentPlayer == 2) {
            this.currentMove++;
        }
        this.currentPlayer == 1 ? this.currentPlayer = 2 : this.currentPlayer = 1;
    }

    turnIndicesInPositionOnBoard(indices) {
        return this.horizontal[indices[1]] + this.vertical[indices[0]];
    }
}