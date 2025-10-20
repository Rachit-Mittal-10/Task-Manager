import BaseModel from "#core/models/BaseModel.js";

class UserModel extends BaseModel {
    constructor(conn){
        super("users",conn);
    }
};

export default UserModel;