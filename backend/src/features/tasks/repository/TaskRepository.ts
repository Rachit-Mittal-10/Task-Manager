import { BaseCrudRepository } from "#core/repository/BaseCrudRepository.js";
import type { Knex } from "knex";

class TaskRepository extends BaseCrudRepository {
    constructor(conn: Knex) {
        super("tasks", conn);
    }
}

export default TaskRepository;
