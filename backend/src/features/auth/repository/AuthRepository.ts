import { BaseCrudRepository } from "#core/repository/BaseCrudRepository.js";
import type { Pool } from "mysql2/promise";
import type { Knex } from "knex";
import type { ReadOutput } from "#core/repository/IQueryOutput.js";

class AuthRepository extends BaseCrudRepository {
    constructor(conn: Knex) {
        super("auth", conn);
    }
    async getUserByUsername(username: string): Promise<ReadOutput> {
        return await this.db(this.table).where({ username }).select("*");
    }
    async getUserByEmail(email: string): Promise<ReadOutput> {
        return await this.db(this.table).where({ email }).select("*");
    }
    async me(): Promise<string> {
        return "This is reching the model";
    }
}

export default AuthRepository;
