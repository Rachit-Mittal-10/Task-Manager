import BaseCrudModel from "#core/models/BaseModel.js";

class UserModel extends BaseCrudModel {
    constructor(conn){
        super("users",conn);
    }
};

export default UserModel;