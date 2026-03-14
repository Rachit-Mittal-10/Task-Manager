import { CustomError } from "#error/CustomError.js";

export class UserError extends CustomError {
    constructor(message) {
        super(message, "UserError");
    }
}
