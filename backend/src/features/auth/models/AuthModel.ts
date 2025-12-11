import BaseModel from "#core/models/BaseModel.js";

class AuthModel extends BaseModel {
    constructor(data){
        super({
            id: data?.id,
            created_at: data?.created_at,
            updated_at: data?.updated_at
        });
        this.user_id = data.user_id;
        this.username = data.username;
        this.email = data.email;
    }
};

export default AuthModel;
