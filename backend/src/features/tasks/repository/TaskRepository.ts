import { BaseCrudRepository } from "#core/repository/BaseCrudRepository.js";
import type { Knex } from "knex";
import { TaskModel } from "../models/TaskModel.js";

export class TaskRepository extends BaseCrudRepository<TaskModel> {
    constructor(conn: Knex) {
        super("tasks", conn, TaskModel);
    }
    protected getOwnerColumn(): string | null {
        return "user_id";
    }
}
