import BaseCrudModel from "#core/models/BaseCrudModel.js";

class TaskModel extends BaseCrudModel {
    constructor(conn){
        super("tasks",conn);
    }
    async getByUserId(user_id){

    }
};

export default TaskModel;