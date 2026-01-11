import { BaseModel } from "#core/models/BaseModel.js";

interface TaskData {
    id?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    user_id: number;
    title: string;
    start_time?: string | Date | null;
    end_time?: string | Date | null;
    status: "planned" | "pending" | "finished";
}

class TaskModel extends BaseModel {
    user_id: number;
    title: string;
    start_time: Date | null;
    end_time: Date | null;
    status: "planned" | "pending" | "finished";

    constructor(data: TaskData) {
        super({
            id: data.id,
            created_at: data.created_at,
            updated_at: data.updated_at,
        });
        this.user_id = data.user_id;
        this.title = data.title;
        this.start_time = data.start_time ? new Date(data.start_time) : null;
        this.end_time = data.end_time ? new Date(data.end_time) : null;
        this.status = data.status;
    }
}

export default TaskModel;