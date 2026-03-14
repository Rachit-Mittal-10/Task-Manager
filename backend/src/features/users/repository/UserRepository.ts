import { BaseCrudRepository } from "#core/repository/BaseCrudRepository.js";
import type { Knex } from "knex";
import { UserModel } from "../models/UserModel.js";

export class UserRepository extends BaseCrudRepository<UserModel> {
    constructor(conn: Knex) {
        super("users", conn, UserModel);
    }
}
