import BaseCrudRepository from "#core/models/BaseCrudRepository.js";

class TaskRepository extends BaseCrudRepository {
    constructor(conn){
        super("tasks",conn);
    }
    async getByUserId(user_id){

    }
};

export default TaskRepository;
