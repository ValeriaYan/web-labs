export class ParsingError extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = this.constructor.name;
    }
}

export class PositionDoesNotExist extends ParsingError {
    constructor(position, row) {
        super('Position does not exist: ' + position);
        this.position = position;
        this.row = row;
    }
}

export class WrongCheckerInPosition extends ParsingError {
    constructor(position, row) {
        super('There is no checker or the checker does not belong to the current player on this position: ' + position);
        this.position = position;
        this.row = row;
    }
}

export class UnavailablePosition extends ParsingError {
    constructor(position, row) {
        super('The checker cannot move to this position: ' + position);
        this.position = position;
        this.row = row;
    }
}

export class WrongNewPosition extends ParsingError {
    constructor(position, row) {
        super('This position is available, but there are required positions for this checker: ' + position);
        this.position = position;
        this.row = row;
    }
}