import { BaseModel } from "#core/models/BaseModel.js";

interface AuthData {
    id?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    user_id: number;
    username: string;
    email: string;
}

class AuthModel extends BaseModel {
    user_id: number;
    username: string;
    email: string;

    constructor(data: AuthData) {
        super({
            id: data?.id,
            created_at: data?.created_at,
            updated_at: data?.updated_at,
        });
        this.user_id = data.user_id;
        this.username = data.username;
        this.email = data.email;
    }
}

export default AuthModel;
