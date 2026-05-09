import type { NextFunction, Request, Response } from "express";

export interface IBaseCrudController{
    create(request: Request, response: Response, next: NextFunction): Promise<void>;
    read(request: Request, response: Response, next: NextFunction): Promise<void>;
    update(request: Request, response: Response, next: NextFunction): Promise<void>;
    delete(request: Request, response: Response, next: NextFunction): Promise<void>;
};