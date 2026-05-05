import type { NextFunction, Request, Response } from "express";

const usersMiddleware = async (
    _request: Request,
    _response: Response,
    next: NextFunction,
): Promise<void> => {
    next();
};

export { usersMiddleware };
