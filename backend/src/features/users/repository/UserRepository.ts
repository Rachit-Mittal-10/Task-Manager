import { BaseCrudRepository } from "#core/repository/BaseCrudRepository.js";

class UserRepository extends BaseCrudRepository {
    constructor(conn) {
        super("users", conn);
    }
}

export default UserRepository;
