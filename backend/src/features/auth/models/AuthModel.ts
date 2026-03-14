import { BaseModel } from "#core/models/BaseModel.js";
import { IBaseModel } from "#core/models/IBaseModel.js";
import bcrypt from "bcryptjs";

interface AuthData {
    id?: number | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    user_id: number;
    username: string;
    email: string;
    password: string;
}

export interface IAuthModel extends IBaseModel {
    user_id: number;
    username: string;
    email: string;
    password: string;
};

export class AuthModel extends BaseModel implements IAuthModel {
    public readonly user_id: number;
    public readonly username: string;
    public readonly email: string;
    public readonly password: string;
    public constructor(data: AuthData) {
        super({
            id: data?.id,
            created_at: data?.created_at,
            updated_at: data?.updated_at,
        });
        this.user_id = data.user_id;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
    }
    public async verifyPassword(password: string): Promise<Boolean> {
        return await bcrypt.compare(password,this.password,);
    }
}