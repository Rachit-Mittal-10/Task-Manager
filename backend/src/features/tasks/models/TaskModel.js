import BaseCrudModel from "#core/models/BaseModel.js";

class TaskModel extends BaseCrudModel {
    constructor(conn){
        super("tasks",conn);
    }
};

export default TaskModel;