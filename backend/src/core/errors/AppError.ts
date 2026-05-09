import { BaseError } from "./BaseError.js";

export class AppError extends BaseError {
    public constructor(
        message: string,
        options: {
            code?: string;
            statusCode?: number;
            details?: unknown | null;
            isOperational?: boolean;
        } = {},
    ) {
        super(message, "AppError", options);
    }
}

export class ValidationError extends AppError {
    public constructor(message: string, details?: unknown | null) {
        super(message, {
            code: "ERR_VALIDATION",
            statusCode: 400,
            details,
        });
        this.name = "ValidationError";
    }
}

export class UnauthorizedError extends AppError {
    public constructor(message: string, details?: unknown | null) {
        super(message, {
            code: "ERR_UNAUTHORIZED",
            statusCode: 401,
            details,
        });
        this.name = "UnauthorizedError";
    }
}

export class ForbiddenError extends AppError {
    public constructor(message: string, details?: unknown | null) {
        super(message, {
            code: "ERR_FORBIDDEN",
            statusCode: 403,
            details,
        });
        this.name = "ForbiddenError";
    }
}

export class NotFoundError extends AppError {
    public constructor(message: string, details?: unknown | null) {
        super(message, {
            code: "ERR_NOT_FOUND",
            statusCode: 404,
            details,
        });
        this.name = "NotFoundError";
    }
}

export class InternalServerError extends AppError {
    public constructor(message: string, details?: unknown | null) {
        super(message, {
            code: "ERR_INTERNAL",
            statusCode: 500,
            details,
            isOperational: false,
        });
        this.name = "InternalServerError";
    }
}
