import CustomError from "./CustomError";

class DataError extends CustomError{
    constructor(message){
        super(message,"DataError");
    }
};

export default DataError;