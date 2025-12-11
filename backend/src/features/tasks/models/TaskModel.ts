import BaseModel from "#core/models/BaseModel.js";

class TaskModel extends BaseModel{
    constructor(data){
        super({
            id: data.id,
            created_at: data.created_at,
            updated_at: data.updated_at
        });
        this.user_id = data.user_id;
        this.title = data.title;
        this.start_time = data.start_time;
        this.end_time = data.end_time;
        this.status = data.status;
    }
};