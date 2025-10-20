import BaseModel from "#core/models/BaseModel.js";

class TaskModel extends BaseModel {
    constructor(conn){
        super("tasks",conn);
    }
};

export default TaskModel;