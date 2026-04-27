import { BaseService } from "#core/services/BaseService.js";
import { AuthModel } from "../models/AuthModel.js";
import type { AuthRepository } from "../repository/AuthRepository.js";
import type { UserService } from "#features/users/services/UserService.js";
import {
    generateToken,
    hashPassword
} from "../utils/AuthUtils.js";

export interface LoginResponse {
    token: string;
}

export interface RegisterPayload {
    username: string;
    email: string;
    password: string;
    firstname: string;
    middlename?: string;
    lastname?: string;
    age?: number;
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
    async register(payload: RegisterPayload): Promise<number> {
        const { username, email, password, firstname, middlename, lastname, age } = payload;
        if (!(username && email && password && firstname)) {
            throw new Error("Username, email, password, and firstname are required for registration");
        }
        try {
            const provider = this.getDep<UserService>("user-service");
            if (!provider) {
                throw new Error("User service dependency is missing");
            }
            const userData: Record<string, string | number> = {
                firstname,
            };

            if (middlename !== undefined) {
                userData.middlename = middlename;
            }

            if (lastname !== undefined) {
                userData.lastname = lastname;
            }

            if (age !== undefined) {
                userData.age = age;
            }

            return await this.withTransaction(async (context) => {
                // here we get the id of inserted user and use it to create auth record
                const userResult = await provider.create(userData, context);
                const hashedPassword = await hashPassword(password);
                const result = await this.repository.create({
                    username,
                    email,
                    password: hashedPassword,
                    user_id: userResult,
                }, context);
                return result;
            });
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