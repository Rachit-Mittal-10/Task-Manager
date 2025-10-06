import CustomError from "#error/CustomError.js";

class UserError extends CustomError {
    constructor(message) {
        super(message, "UserError");
    }
}

export default UserError;
