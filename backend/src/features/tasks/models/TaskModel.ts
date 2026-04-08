import { BaseModel } from "#core/models/BaseModel.js";
import { IBaseModel } from "#core/models/IBaseModel.js";

interface TaskData {
    id?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    user_id: number;
    title: string;
    start?: string | Date | null;
    end?: string | Date | null;
    status: "planned" | "in_progress" | "completed";
    description?: string | null;
    priority?: "low" | "medium" | "high" | "not_set";
}

export interface ITaskModel extends IBaseModel{
    user_id: number;
    title: string;
    start: Date | null;
    end: Date | null;
    status: "planned" | "in_progress" | "completed";
    description?: string | null;
    priority?: "low" | "medium" | "high" | "not_set";
}

export class TaskModel extends BaseModel implements ITaskModel {
    user_id: number;
    title: string;
    start: Date | null;
    end: Date | null;
    status: "planned" | "in_progress" | "completed";
    description?: string | null;
    priority?: "low" | "medium" | "high" | "not_set";

    constructor(data: TaskData) {
        super({
            id: data.id,
            created_at: data.created_at,
            updated_at: data.updated_at,
        });
        this.user_id = data.user_id;
        this.title = data.title;
        this.start = data.start ? new Date(data.start) : null;
        this.end = data.end ? new Date(data.end) : null;
        this.status = data.status;
        this.description = data.description ?? null;
        this.priority = data.priority ?? "not_set";
    }
}