import type { Request, Response } from "express";

export interface IBaseCrudController{
    create(request: Request, response: Response): Promise<void>;
    get(request: Request, response: Response): Promise<void>;
    getAll(request: Request, response: Response): Promise<void>;
    update(request: Request, response: Response): Promise<void>;
    remove(request: Request, response: Response): Promise<void>;
};