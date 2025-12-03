import BaseCrudRepository from "#core/models/BaseCrudRepository.js";

class TaskModel extends BaseCrudRepository {
    constructor(conn){
        super("tasks",conn);
    }
    async getByUserId(user_id){

    }
};

export default TaskModel;
