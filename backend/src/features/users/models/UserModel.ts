import BaseModel from "#core/models/BaseModel.js";

class UserModel extends BaseModel{
    constructor(data){
        super({
            id: data.id,
            created_at: data.created_at,
            updated_at: data.updated_at
        });
        this.firstname = data.firstname;
        this.middlename = data.middlename;
        this.lastname = data.lastname;
        this.age = data.age;
    }
};

export default UserModel;