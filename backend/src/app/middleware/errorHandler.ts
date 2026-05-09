import type { NextFunction, Request, Response } from "express";
import { BaseError } from "#core/errors/BaseError.js";
import { NotFoundError } from "#core/errors/AppError.js";

type ErrorPayload = {
    ok: false;
    error: string;
    code: string;
    details?: unknown | null;
};

export const notFoundHandler = (request: Request, _response: Response, next: NextFunction): void => {
    const error = new NotFoundError(`Route not found: ${request.method} ${request.originalUrl}`);
    next(error);
};

export const errorHandler = (
    error: unknown,
    request: Request,
    response: Response,
    _next: NextFunction,
): void => {
    const knownError = error instanceof BaseError ? error : null;
    const statusCode = knownError?.statusCode ?? 500;
    const code = knownError?.code ?? "ERR_INTERNAL";
    const message = knownError?.message ?? "Internal server error";
    const details = knownError?.details ?? null;

    const payload: ErrorPayload = {
        ok: false,
        error: message,
        code,
    };

    if (details) {
        payload.details = details;
    }

    const requestLogger = request.log;
    if (requestLogger) {
        requestLogger.error(
            {
                err: error,
                code,
                statusCode,
                path: request.originalUrl,
                method: request.method,
            },
            message,
        );
    }

    response.status(statusCode).json(payload);
};
