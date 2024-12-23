import CustomError from "./CustomError.js";

class TaskError extends CustomError{
    constructor(message){
        super(message, "TaskError");
    }
};

export default TaskError;