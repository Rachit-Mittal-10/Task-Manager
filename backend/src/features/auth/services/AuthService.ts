import { BaseService } from "#core/services/BaseService.js";
import { AuthModel } from "../models/AuthModel.js";
import type { AuthRepository } from "../repository/AuthRepository.js";
import {
    generateToken,
    hashPassword
} from "../utils/AuthUtils.js";
import dotenv from "dotenv";

const env = dotenv.config({
    path: "../.env",
});

export interface LoginResponse {
    token: string;
}

export class AuthService extends BaseService<AuthRepository> {
    async login(username: string | undefined, email: string | undefined, password: string): Promise<LoginResponse | undefined> {
        if (!password || (!username && !email)) {
            throw new Error(
                "Username or email and password are required for login",
            );
        }
        try {
            let user: AuthModel | undefined = undefined;
            if (username) {
                user = await this.repository.getUserByUsername(username);
            } else if (email) {
                user = await this.repository.getUserByEmail(email);
            }
            else {
                return undefined;
            }
            //* if user not found return undefined
            if (!user) {
                return undefined;
            }
            const passwordStatus = await user.verifyPassword(password);
            if  (!passwordStatus) {
                return undefined;
            }
            // const userPassword = user["password"];
            // const passwordStatus = await verifyPassword(password, userPassword);
            // if  (!passwordStatus) {
            //     return undefined;
            // }
            //* this means user exist and password is verified so we will generate token and return
            const token = generateToken(user, process.env.JWT_SECRET_KEY);
            return {
                token,
            };
        } catch (err) {
            throw err;
        }
    }
    /*
    insertId is result.insertId
    */
    async register(username: string, email: string, password: string, firstname: string): Promise<number> {
        if (!(username && email && password && firstname)) {
            throw new Error("All parameters are required for registration");
        }
        try {
            const provider = this.getDep("user-service");
            // here we get the id of inserted user and use it to create auth record
            const userResult = await provider.create({
                firstname,
            });
            const hashedPassword = await hashPassword(password);
            const result = await this.repository.create({
                username,
                email,
                password: hashedPassword,
                user_id: userResult,
            });
            return result;
        } catch (err) {
            switch (err.code) {
                case "ER_DUP_ENTRY":
                    console.log(`Error due to duplicate entry: ${err}`);
                    throw new Error("Duplicate Entry");
                    break;
                default:
                    console.log(`Error during registration in service: ${err}`);
                    throw err;
                    break;
            }
            throw err;
        }
    }
}