import { CustomError } from "#error/CustomError.js";

export class TaskError extends CustomError {
    constructor(message) {
        super(message, "TaskError");
    }
}
