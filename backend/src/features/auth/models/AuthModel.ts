import { BaseModel } from "#core/models/BaseModel.js";
import { IBaseModel } from "#core/models/IBaseModel.js";

interface AuthData {
    id?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    user_id: number;
    username: string;
    email: string;
}

export interface IAuthModel extends IBaseModel {
    user_id: number;
    username: string;
    email: string;
};

export class AuthModel extends BaseModel implements IAuthModel {
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