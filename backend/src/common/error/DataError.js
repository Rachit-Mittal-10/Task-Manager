import CustomError from "./CustomError.js";

class DataError extends CustomError {
    constructor(message) {
        super(message, "DataError");
    }
}

export default DataError;
