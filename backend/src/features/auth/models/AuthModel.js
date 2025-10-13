import BaseModel from "#core/models/BaseModel.js";

class AuthModel extends BaseModel {
    constructor(conn) {
        super("auth", conn);
    }
};

export default AuthModel;