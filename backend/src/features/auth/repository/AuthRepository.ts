import { BaseCrudRepository } from "#core/repository/BaseCrudRepository.js";
import type { Knex } from "knex";

class AuthRepository extends BaseCrudRepository {
    constructor(conn: Knex) {
        super("auth", conn);
    }
    async getUserByUsername(username: string): Promise<any[]> {
        return await this.db(this.table).where({ username }).select("*");
    }
    async getUserByEmail(email: string): Promise<any[]> {
        return await this.db(this.table).where({ email }).select("*");
    }
    async me(): Promise<string> {
        return "This is reching the model";
    }
}

export default AuthRepository;
