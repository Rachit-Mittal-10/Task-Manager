import BaseCrudRepository from "#core/models/BaseCrudRepository.js";

class UserModel extends BaseCrudRepository {
    constructor(conn){
        super("users",conn);
    }
};

export default UserModel;
