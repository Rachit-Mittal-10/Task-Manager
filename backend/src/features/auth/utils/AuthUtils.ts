import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { AuthModel } from "../models/AuthModel.js";
import { logger } from "#config/logger.js";
import { InternalServerError } from "#core/errors/AppError.js";
import type pino from "pino";

const jwtVerify = promisify(jwt.verify) as (token: string, secret: string) => Promise<any>;

const hashPassword = async (password: string, salt: number = 10, requestLogger?: pino.Logger) : Promise<string> => {
    const scopedLogger = requestLogger ?? logger;
    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        scopedLogger.error({ err }, "Error while hashing password");
        throw new InternalServerError("Unable to hash password", err);
    }
};

const generateToken = (user: AuthModel) => {
    const jwtAccessKey = process.env.JWT_ACCESS_KEY;
    const jwtRefreshKey = process.env.JWT_REFRESH_KEY;
    if (!jwtAccessKey) {
        throw new InternalServerError("JWT_ACCESS_KEY is not configured");
    }
    if (!jwtRefreshKey) {
        throw new InternalServerError("JWT_REFRESH_KEY is not configured");
    }
    const payload = {
        auth_id: user.id,
        user_id: user.user_id,
    };
    const accessToken = jwt.sign({...payload, type: "access" }, jwtAccessKey, { expiresIn: "1h" });
    const refreshToken = jwt.sign({...payload, type: "refresh"}, jwtRefreshKey, { expiresIn: "7d" });
    // this generates the token not access token or refresh token. to implement, need to sign the token with different secret key and different expiry time.
    // if i change token = { accessToken, refreshToken } then entire frontend will break i think. need to change it.
    const token = {
        accessToken,
        refreshToken
    };
    return token;
};

export {
    jwtVerify,
    hashPassword,
    generateToken
};
