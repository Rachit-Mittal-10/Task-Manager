import { jwtVerify } from "../utils/AuthUtils.js";
import type { Request, Response, NextFunction } from "express";
import type { DecodedToken } from "../types/DecodedToken.js"

const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    //* Extract the token from HTTP request incoming
    const authHeader = req.header("Authorization");
    const token = authHeader?.split(" ")[1];

    //* if token not present return the error.
    if (!token) {
        res.status(401).json({ message: "Access Denied. No Token Provided" });
        return;
    }

    //* Verify the Token
    try {
        const jwtSecret = process.env.JWT_SECRET_KEY;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET_KEY is not configured");
        }
        const decoded = await jwtVerify(token, jwtSecret) as DecodedToken;
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: "Expired or Invalid Token" });
        return;
    }
};

export { authenticateToken };
