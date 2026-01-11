import { BaseModel } from "#core/models/BaseModel.js";

interface UserData {
    id?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    firstname: string;
    middlename?: string | null;
    lastname: string;
    age?: number | null;
}

class UserModel extends BaseModel {
    firstname: string;
    middlename: string | null;
    lastname: string;
    age: number | null;

    constructor(data: UserData) {
        super({
            id: data.id,
            created_at: data.created_at,
            updated_at: data.updated_at,
        });
        this.firstname = data.firstname;
        this.middlename = data.middlename ?? null;
        this.lastname = data.lastname;
        this.age = data.age ?? null;
    }
}

export default UserModel;