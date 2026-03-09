import type { Request, Response } from "express";
import { BaseController } from "./BaseController.js";
import type { IBaseCrudController } from "./IBaseCrudController.js";
import { IBaseCrudService } from "#core/services/IBaseCrudService.js";
import { IOptions } from "#core/repository/BaseCrudRepository.js";
import { IData } from "#common/types/IData.js";

interface ReadRequestQuery {
    limit?: string;
    offset?: string;
    [key: string]: string | string [] | undefined;
};

export abstract class BaseCrudController<S extends IBaseCrudService> extends BaseController<S> implements IBaseCrudController {
    public constructor(service:S) {
        super(service);
    }
    public async create(request: Request, response: Response) {
        const data = request.body;
        try {
            const result = await this.service.create(data);
            console.log(result);
            response.status(201).json({
                ok: true,
                data: result,
            });
        } catch (error) {
            console.log(error);
            response.status(500).json({
                ok: false,
                error: error.message,
            });
        }
    }
    // public async get(request: Request, response: Response) {
    //     const id: number = Number(request.params.id);
    //     try {
    //         const result = await this.service.get(id);
    //         console.log(result);
    //         if(result === undefined) {
    //             response.status(404).json({
    //                 ok: false,
    //                 error: `Data not found for id: ${id}`,
    //             });
    //             return;
    //         }
    //         response.status(200).json({
    //             ok: true,
    //             data: result,
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         response.status(500).json({
    //             ok: false,
    //             error: error.message,
    //         });
    //     }
    // }
    // public async getAll(request: Request, response: Response) {
    //     try {
    //         const result = await this.service.getAll();
    //         console.log(result);
    //         response.status(200).json({
    //             ok: true,
    //             data: result,
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         response.status(500).json({
    //             ok: false,
    //             error: error.message,
    //         });
    //     }
    // }
    public async read(request: Request, response: Response): Promise<void> {
        const id: number | undefined = request.params.id ? Number(request.params.id) : undefined;
        const {limit, offset, ...filters}: ReadRequestQuery = request.query as ReadRequestQuery;
        const options: IOptions = {
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
        };
        try {
            const result = await this.service.read(id, filters, options);
            console.log(result);
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
            console.log(error);
            response.status(500).json({
                ok: false,
                error: error.message,
            });
        }
    }
    public async update(request: Request, response: Response) {
        const id:number = Number(request.params.id);
        const data = request.body;
        try {
            const result = await this.service.update(id, data);
            if (result === 0) {
                response.status(404).json({
                    ok: false,
                    error: `Data not found for id: ${id}`,
                });
                return;
            }
            console.log(result);
            response.status(200).json({
                ok: true,
                data: `${result} row(s) updated successfully`,
            });
        } catch (error) {
            console.log(error);
            response.status(500).json({
                ok: false,
                error: error.message,
            });
        }
    }
    public async delete(request: Request, response: Response) {
        const id: number = Number(request.params.id);
        try {
            const result = await this.service.remove(id);
            if(result === 0) {
                response.status(404).json({
                    ok: false,
                    error: `Data not found for id: ${id}`,
                });
                return;
            }
            console.log(`delete function in controller: ${result}`);
            response.status(200).json({
                ok: true,
                data: `${result} row(s) deleted successfully`,
            });
        } catch (error) {
            console.log(error);
            response.status(500).json({
                ok: true,
                error: error.message,
            });
        }
    }
}
