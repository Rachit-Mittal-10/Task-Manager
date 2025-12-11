import CustomError from "#error/CustomError.js";

class DataError extends CustomError {
    constructor(message) {
        super(message, "DataError");
    }
}

export default DataError;
