import { BaseCrudRepository } from "#core/repository/BaseCrudRepository.js";
import type { Knex } from "knex";

class UserRepository extends BaseCrudRepository {
    constructor(conn: Knex) {
        super("users", conn);
    }
}

export default UserRepository;
