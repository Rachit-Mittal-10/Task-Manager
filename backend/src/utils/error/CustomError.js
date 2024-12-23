class CustomError extends Error{
    constructor(message,name="CustomError"){
        super(message);
        this.name = name;
    }
};

export default CustomError;