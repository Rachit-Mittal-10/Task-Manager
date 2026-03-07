import { BaseCrudRepository } from "#core/repository/BaseCrudRepository.js";
import type { Knex } from "knex";

class AuthRepository extends BaseCrudRepository {
    constructor(conn: Knex) {
        super("auth", conn);
    }
    async getUserByUsername(username: string): Promise<any | undefined> {
        return await this.db(this.table).where({ username }).select("*").first();
    }
    async getUserByEmail(email: string): Promise<any | undefined> {
        return await this.db(this.table).where({ email }).select("*").first();
    }
}

export default AuthRepository;
