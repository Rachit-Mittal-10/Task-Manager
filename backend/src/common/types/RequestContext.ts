import pino from "pino";
import { Knex } from "knex";

export type RequestContext = {
    user_id?: string | number;
    logger?: pino.Logger;
    tx?: Knex.Transaction;
    filters?: Record<string, any>;
    options?: {
        limit?: number;
        offset?: number;
    }
    [key: string]: any; // for any additional context properties that might be needed in future
};