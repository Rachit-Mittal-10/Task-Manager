interface BaseErrorOptions {
    code?: string;
    statusCode?: number;
    details?: unknown | null;
    isOperational?: boolean;
}

export abstract class BaseError extends Error {
    declare name: string;
    code: string;
    statusCode: number;
    details: unknown | null;
    isOperational: boolean;

    public constructor(
        message: string,
        name: string = "BaseError",
        options: BaseErrorOptions = {},
    ) {
        super(message);
        this.name = name;
        this.code = options.code ?? "ERR_INTERNAL";
        this.statusCode = options.statusCode ?? 500;
        this.details = options.details ?? null;
        this.isOperational = options.isOperational ?? true;
    }
}
