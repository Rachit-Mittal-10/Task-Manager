import type { NextFunction, Request, Response } from "express";
import { BaseController } from "./BaseController.js";
import type { IBaseCrudController } from "./IBaseCrudController.js";
import { IBaseCrudService } from "#core/services/IBaseCrudService.js";
import { IOptions } from "#core/repository/BaseCrudRepository.js";
import { RequestContext } from "#/common/types/RequestContext.js";
import { NotFoundError } from "#core/errors/AppError.js";

interface ReadRequestQuery {
    limit?: string;
    offset?: string;
    [key: string]: string | string [] | undefined;
};

export abstract class BaseCrudController<T, S extends IBaseCrudService<T>> extends BaseController<S> implements IBaseCrudController {
    public constructor(service:S) {
        super(service);
    }
    public async create(request: Request, response: Response, next: NextFunction) {
        const data = await this.beforeCreate(request);
        const context = await this.getRequestContext(request);
        try {
            const result = await this.service.create(data, context);
            response.status(201).json({
                ok: true,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
    public async read(request: Request, response: Response, next: NextFunction): Promise<void> {
        const id: number | undefined = request.params.id ? Number(request.params.id) : undefined;
        const {limit, offset, ...filters}: ReadRequestQuery = request.query as ReadRequestQuery;
        const options: IOptions = {
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
        };
        const context = await this.getRequestContext(request,{filters, options});
        try {
            const result = await this.service.read(id, context);
            // handling for GET /:id
            // if id is provided and result is undefined then it means data for provided id is not found. so we will return 404 in that case
            if(id !== undefined && result === undefined) {
                throw new NotFoundError(`Data not found for id: ${id}`);
            }
            // if result is not undefined then we return the result with 200 status
            response.status(200).json({
                ok: true,
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    public async update(request: Request, response: Response, next: NextFunction) {
        const id:number = Number(request.params.id);
        const data = await this.beforeUpdate(request);
        const context = await this.getRequestContext(request);
        try {
            const result = await this.service.update(id, data, context);
            if (result === 0) {
                throw new NotFoundError(`Data not found for id: ${id}`);
            }
            response.status(200).json({
                ok: true,
                data: `${result} row(s) updated successfully`,
            });
        } catch (error) {
            next(error);
        }
    }
    public async delete(request: Request, response: Response, next: NextFunction) {
        const id: number = Number(request.params.id);
        await this.beforeRemove(request);
        const context = await this.getRequestContext(request);
        try {
            const result = await this.service.remove(id, context);
            if(result === 0) {
                throw new NotFoundError(`Data not found for id: ${id}`);
            }
            response.status(200).json({
                ok: true,
                data: `${result} row(s) deleted successfully`,
            });
        } catch (error) {
            next(error);
        }
    }

    // Hooks for performing any operation before or after create, update and delete operations.
    protected async beforeCreate(request: Request): Promise<any> {
        return request.body;
    }
    protected async beforeUpdate(request: Request): Promise<any> {
        return request.body;
    }
    protected async beforeRemove(request: Request): Promise<void> {
        return;
    }
}
