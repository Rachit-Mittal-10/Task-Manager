import { BaseCrudRepository } from "#core/repository/BaseCrudRepository.js";
import type { Knex } from "knex";
import { AuthModel } from "../models/AuthModel.js";

export class AuthRepository extends BaseCrudRepository<AuthModel> {
    constructor(conn: Knex) {
        super("auth", conn, AuthModel);
    }
    async getUserByUsername(username: string): Promise<AuthModel | undefined> {
        const result = await this.db(this.table).where({ username }).select("*").first();
        const modelInstance = result ? new AuthModel(result) : undefined;
        return modelInstance;
    }
    async getUserByEmail(email: string): Promise<AuthModel | undefined> {
        const result = await this.db(this.table).where({ email }).select("*").first();
        const modelInstance = result ? new AuthModel(result) : undefined;
        return modelInstance;
    }
}