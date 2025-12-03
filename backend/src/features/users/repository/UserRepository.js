import BaseCrudRepository from "#core/models/BaseCrudRepository.js";

class UserRepository extends BaseCrudRepository {
    constructor(conn){
        super("users",conn);
    }
};

export default UserRepository;
