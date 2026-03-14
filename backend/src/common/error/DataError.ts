import { CustomError } from "#error/CustomError.js";

export class DataError extends CustomError {
    constructor(message) {
        super(message, "DataError");
    }
}
