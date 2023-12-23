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

    turnNotationRowInPositions(notationRow) {
        const move = notationRow.split(' ')[1];
        let positions = move.split('-');
        if(positions.length == 1) {
            positions = move.split(':');
        }
        const startPosition = [this.vertical.indexOf(positions[0][1]), this.horizontal.indexOf(positions[0][0])];
        const endPosition = [this.vertical.indexOf(positions[1][1]), this.horizontal.indexOf(positions[1][0])];
        
        return [startPosition, endPosition];
    }
    
    setCurrentValues() {
        const notationRows = this.textarea.value.split('\n');
        this.currentMove = +notationRows[notationRows.length - 2].split(' ')[0].split('.')[0];
        this.currentPlayer = +notationRows[notationRows.length - 2].split(' ')[0].split('.')[1];
        if(this.currentPlayer == 2) {
            this.currentMove++;
        }
        this.currentPlayer == 1 ? this.currentPlayer = 2 : this.currentPlayer = 1;
    }
}