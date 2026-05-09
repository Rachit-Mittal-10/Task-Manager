import { jwtVerify } from "../utils/AuthUtils.js";
import type { Request, NextFunction } from "express";
import type { DecodedToken } from "../types/DecodedToken.js"
import { ForbiddenError, UnauthorizedError } from "#core/errors/AppError.js";

const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        //* Extract the token from HTTP request incoming
        const authHeader = req.header("Authorization");
        const token = authHeader?.split(" ")[1];

        if (!token) {
            throw new UnauthorizedError("Access denied. No token provided");
        }

        //* Verify the Token
        const jwtSecret = process.env.JWT_SECRET_KEY;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET_KEY is not configured");
        }
        const decoded = await jwtVerify(token, jwtSecret) as DecodedToken;
        req.user = decoded;
        next();
    } catch (err) {
        if (err instanceof UnauthorizedError) {
            next(err);
            return;
        }
        req.log?.warn({ err }, "Invalid token in authentication middleware");
        next(new ForbiddenError("Expired or invalid token", err));
    }
};

export { authenticateToken };
