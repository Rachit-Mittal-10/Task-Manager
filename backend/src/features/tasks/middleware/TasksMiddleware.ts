import type { NextFunction, Request, Response } from "express";

const tasksMiddleware = async (
    _request: Request,
    _response: Response,
    next: NextFunction,
): Promise<void> => {
    next();
};

export { tasksMiddleware };
