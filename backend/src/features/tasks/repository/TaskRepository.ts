import { BaseCrudRepository } from "#core/repository/BaseCrudRepository.js";
import type { Pool } from "mysql2/promise";
import type { ReadOutput } from "#core/repository/IQueryOutput.js";

class TaskRepository extends BaseCrudRepository {
    constructor(conn: Pool) {
        super("tasks", conn);
    }
    async getByUserId(user_id: number): Promise<ReadOutput> {
        const query = `SELECT * FROM ${this.table} WHERE user_id = ?;`;
        return this.read(query, [user_id]);
    }
}

export default TaskRepository;
