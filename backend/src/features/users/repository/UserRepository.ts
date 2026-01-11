import { BaseCrudRepository } from "#core/repository/BaseCrudRepository.js";
import type { Pool } from "mysql2/promise";

class UserRepository extends BaseCrudRepository {
    constructor(conn: Pool) {
        super("users", conn);
    }
}

export default UserRepository;
