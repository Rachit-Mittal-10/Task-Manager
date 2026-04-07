import { BaseCrudController } from "#core/controllers/BaseCrudController.js";
import type { UserModel } from "../models/UserModel.js";
import { UserService } from "../services/UserService.js";
import { Request } from "express";

export class UserController extends BaseCrudController<UserModel, UserService> {
    protected async getRequestContext(request: Request): Promise<any> {
        const context = await super.getRequestContext(request);
        return {
            id: context.user_id,
        }
    }
};
