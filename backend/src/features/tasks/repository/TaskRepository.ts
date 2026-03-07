import { BaseCrudRepository } from "#core/repository/BaseCrudRepository.js";
import type { Knex } from "knex";

class TaskRepository extends BaseCrudRepository {
    constructor(conn: Knex) {
        super("tasks", conn);
    }
    async getByUserId(user_id: number): Promise<any[]> {
        return await this.db(this.table).where({ user_id }).select("*");
    }
}

export default TaskRepository;
