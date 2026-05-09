/*
 * @file: BaseController.ts
 * @description: This is the abstract class for providing base of controller to be used by all the controllers
 */

import type { Request } from "express";
import type { RequestContext } from "#/common/types/RequestContext.js";
import { logger as Logger } from "#/config/logger.js";

export abstract class BaseController<S> {
    protected readonly service: S;
    public constructor(service: S) {
        if (!service) {
            throw new Error("service cannot be empty");
        }
        this.service = service;
    }

    protected async getRequestContext(request: Request, extra?: Partial<RequestContext>): Promise<RequestContext> {
        return {
            user_id: request.user?.user_id ?? undefined,
            logger: request.log ?? Logger,
            ...extra,
        };
    }
}

