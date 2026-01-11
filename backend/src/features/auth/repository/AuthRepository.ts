import { BaseCrudRepository } from "#core/repository/BaseCrudRepository.js";
import type { Pool } from "mysql2/promise";
import type { ReadOutput } from "#core/repository/IQueryOutput.js";

class AuthRepository extends BaseCrudRepository {
    constructor(conn: Pool) {
        super("auth", conn);
    }
    async getUserByUsername(username: string): Promise<ReadOutput> {
        const query = `SELECT * FROM ${this.table} WHERE username = ?;`;
        try {
            const result = await this.read(query, [username]);
            return result;
        } catch (err) {
            throw err;
        }
    }
    async getUserByEmail(email: string): Promise<ReadOutput> {
        const query = `SELECT * FROM ${this.table} WHERE email = ?;`;
        try {
            const result = await this.read(query, [email]);
            return result;
        } catch (err) {
            throw err;
        }
    }
    async me(): Promise<string> {
        return "This is reching the model";
    }
}

export default AuthRepository;
