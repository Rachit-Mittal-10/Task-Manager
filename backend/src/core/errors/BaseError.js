class BaseError extends Error {
    constructor(
        message,
        name = "BaseError",
        {code = "ERR_INTERNAL", statusCode = 500, details = null, isOperational = true} = {}
    ){
        super(message);
        this.name = name;
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        this.isOperational = isOperational;
    }
};

export default BaseError;