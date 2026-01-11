import type { DecodedToken } from "#features/auth/types/DecodedToken.ts";

declare global{
    namespace NodeJS{
        interface ProcessEnv{
            PORT: string;
            HOST: string;
            JWT_SECRET_KEY: string;
            DATABASE_HOST: string;
            DATABASE_PORT: string;
            DATABASE_USER: string;
            DATABASE_PASSWORD: string;
            DATABASE_NAME: string;
        }
    }
    namespace Express {
        interface Request {
            user?: DecodedToken;
        }
    }
}

export {};