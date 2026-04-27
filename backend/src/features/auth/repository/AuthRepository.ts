import { BaseCrudRepository } from "#core/repository/BaseCrudRepository.js";
import { RequestContext } from "#common/types/RequestContext.js";
import type { Knex } from "knex";
import { AuthModel } from "../models/AuthModel.js";

export class AuthRepository extends BaseCrudRepository<AuthModel> {
    constructor(conn: Knex) {
        super("auth", conn, AuthModel);
    }
    async getUserByUsername(username: string, context?: RequestContext): Promise<AuthModel | undefined> {
        const result = await this.getExecutor(context)(this.table).where({ username }).select("*").first();
        const modelInstance = result ? this.mapToModel(result) : undefined;
        return modelInstance;
    }
    async getUserByEmail(email: string, context?: RequestContext): Promise<AuthModel | undefined> {
        const result = await this.getExecutor(context)(this.table).where({ email }).select("*").first();
        const modelInstance = result ? this.mapToModel(result) : undefined;
        return modelInstance;
    }
}