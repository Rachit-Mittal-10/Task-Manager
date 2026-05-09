import { BaseCrudController } from "#core/controllers/BaseCrudController.js";
import type { ProjectModel } from "../models/ProjectModel.js";
import type { ProjectService } from "../services/ProjectService.js";
import type { Request } from "express";

export class ProjectController extends BaseCrudController<ProjectModel, ProjectService> {
    protected async beforeCreate(request: Request): Promise<any> {
        const user_id: number = Number(request.user.user_id);
        return {
            ...request.body,
            user_id,
        };
    }
}
