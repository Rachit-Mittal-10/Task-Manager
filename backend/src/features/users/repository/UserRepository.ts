import { BaseCrudRepository } from "#core/repository/BaseCrudRepository.js";
import type { Pool } from "mysql2/promise";
import type { Knex } from "knex";

class UserRepository extends BaseCrudRepository {
    constructor(conn: Knex) {
        super("users", conn);
    }
}

export default UserRepository;
