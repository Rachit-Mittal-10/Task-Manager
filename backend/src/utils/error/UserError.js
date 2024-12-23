import CustomError from "./CustomError";

class UserError extends CustomError{
    constructor(message){
        super(message, "UserError");
    }
};

export default UserError;