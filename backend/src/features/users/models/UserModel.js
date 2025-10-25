import BaseCrudModel from "#core/models/BaseCrudModel.js";

class UserModel extends BaseCrudModel {
    constructor(conn){
        super("users",conn);
    }
};

export default UserModel;