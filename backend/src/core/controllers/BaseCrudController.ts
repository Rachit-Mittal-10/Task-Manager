import type { Request, Response } from "express";
import { BaseController } from "./BaseController.js";
import type { IBaseCrudController } from "./IBaseCrudController.js";
import { IBaseCrudService } from "#core/services/IBaseCrudService.js";
import { IOptions } from "#core/repository/BaseCrudRepository.js";

interface ReadRequestQuery {
    limit?: string;
    offset?: string;
    [key: string]: string | string [] | undefined;
};

export abstract class BaseCrudController<T, S extends IBaseCrudService<T>> extends BaseController<S> implements IBaseCrudController {
    public constructor(service:S) {
        super(service);
    }
    public async create(request: Request, response: Response) {
        const data = await this.beforeCreate(request);
        try {
            const result = await this.service.create(data);
            response.status(201).json({
                ok: true,
                data: result,
            });
        } catch (error) {
            response.status(500).json({
                ok: false,
                error: error.message,
            });
        }
    }
    public async read(request: Request, response: Response): Promise<void> {
        const id: number | undefined = request.params.id ? Number(request.params.id) : undefined;
        const {limit, offset, ...filters}: ReadRequestQuery = request.query as ReadRequestQuery;
        const options: IOptions = {
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
        };
        try {
            const result = await this.service.read(id, filters, options);
            //* handling for GET /:id
            //* if id is provided and result is undefined then it means data for provided id is not found. so we will return 404 in that case
            if(id !== undefined && result === undefined) {
                response.status(404).json({
                    ok: false,
                    error: `Data not found for id: ${id}`,
                });
                return;
            }
            //* if result is not undefined then we return the result with 200 status
            response.status(200).json({
                ok: true,
                data: result,
            });
        }
        catch (error) {
            response.status(500).json({
                ok: false,
                error: error.message,
            });
        }
    }
    public async update(request: Request, response: Response) {
        const id:number = Number(request.params.id);
        const data = await this.beforeUpdate(request);
        try {
            const result = await this.service.update(id, data);
            if (result === 0) {
                response.status(404).json({
                    ok: false,
                    error: `Data not found for id: ${id}`,
                });
                return;
            }
            response.status(200).json({
                ok: true,
                data: `${result} row(s) updated successfully`,
            });
        } catch (error) {
            response.status(500).json({
                ok: false,
                error: error.message,
            });
        }
    }
    public async delete(request: Request, response: Response) {
        const id: number = Number(request.params.id);
        await this.beforeRemove(request);
        try {
            const result = await this.service.remove(id);
            if(result === 0) {
                response.status(404).json({
                    ok: false,
                    error: `Data not found for id: ${id}`,
                });
                return;
            }
            response.status(200).json({
                ok: true,
                data: `${result} row(s) deleted successfully`,
            });
        } catch (error) {
            response.status(500).json({
                ok: false,
                error: error.message,
            });
        }
    }

    //: Hooks for performing any operation before or after create, update and delete operations.
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
