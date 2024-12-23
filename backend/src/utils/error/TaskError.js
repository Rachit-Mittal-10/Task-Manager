import CustomError from "./CustomError";

class TaskError extends CustomError{
    constructor(message){
        super(message, "TaskError");
    }
};

export default TaskError;