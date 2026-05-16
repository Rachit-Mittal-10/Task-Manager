import { BaseService } from "#core/services/BaseService.js";
import { AuthModel } from "../models/AuthModel.js";
import type { AuthRepository } from "../repository/AuthRepository.js";
import type { UserService } from "#features/users/services/UserService.js";
import {
    generateToken,
    hashPassword
} from "../utils/AuthUtils.js";
import { InternalServerError, UnauthorizedError, ValidationError } from "#core/errors/AppError.js";
import type { RequestContext } from "#common/types/RequestContext.js";
import { logger } from "#config/logger.js";

export interface LoginResponse {
    token: {
        accessToken: string;
        refreshToken: string;
    };
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
    async login(username: string | undefined, email: string | undefined, password: string, context?: RequestContext): Promise<LoginResponse> {
        if (!password || (!username && !email)) {
            throw new ValidationError(
                "Username or email and password are required for login",
            );
        }
        const scopedLogger = context?.logger ?? logger;
        try {
            let user: AuthModel | undefined = undefined;
            if (username) {
                user = await this.repository.getUserByUsername(username);
            } else if (email) {
                user = await this.repository.getUserByEmail(email);
            }
            else {
                throw new ValidationError("Username or email must be provided");
            }
            if (!user) {
                throw new UnauthorizedError("Invalid credentials");
            }
            const passwordStatus = await user.verifyPassword(password);
            if  (!passwordStatus) {
                throw new UnauthorizedError("Invalid credentials");
            }
            //* this means user exist and password is verified so we will generate token and return
            const token = generateToken(user);
            return {
                token,
            };
        } catch (err) {
            if (err instanceof ValidationError || err instanceof UnauthorizedError) {
                throw err;
            }
            scopedLogger.error({ err, username, email }, "Error during login in auth service");
            throw new InternalServerError("Error occurred during login", err);
        }
    }
    /*
    insertId is result.insertId
    */
    async register(payload: RegisterPayload, context?: RequestContext): Promise<number> {
        const { username, email, password, firstname, middlename, lastname, age } = payload;
        if (!(username && email && password && firstname)) {
            throw new ValidationError("Username, email, password, and firstname are required for registration");
        }
        const scopedLogger = context?.logger ?? logger;
        try {
            const provider = this.getDep<UserService>("user-service");
            if (!provider) {
                throw new InternalServerError("User service dependency is missing");
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
            return await this.withTransaction(async (txContext) => {
                // here we get the id of inserted user and use it to create auth record
                const userResult = await provider.create(userData, txContext);
                const hashedPassword = await hashPassword(password, 10, txContext?.logger ?? scopedLogger);
                const result = await this.repository.create({
                    username,
                    email,
                    password: hashedPassword,
                    user_id: userResult,
                }, txContext);
                return result;
            }, context);
        } catch (err) {
            switch ((err as { code?: string }).code) {
                case "ER_DUP_ENTRY":
                    scopedLogger.warn({ err, username, email }, "Duplicate entry during registration");
                    throw new ValidationError("Duplicate entry");
                default:
                    scopedLogger.error({ err, username, email }, "Error during registration in auth service");
                    throw new InternalServerError("Error occurred during registration", err);
            }
        }
    }
}