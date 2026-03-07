import type { Request, Response } from "express";
import { BaseController } from "./BaseController.js";
import type { IBaseCrudController } from "./IBaseCrudController.js";
import { IBaseCrudService } from "#core/services/IBaseCrudService.js";

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
    public async get(request: Request, response: Response) {
        const id: number = Number(request.params.id);
        try {
            const result = await this.service.get(id);
            console.log(result);
            if(result === undefined) {
                response.status(404).json({
                    ok: false,
                    error: `Data not found for id: ${id}`,
                });
                return;
            }
            response.status(200).json({
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
    public async getAll(request: Request, response: Response) {
        try {
            const result = await this.service.getAll();
            console.log(result);
            response.status(200).json({
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
