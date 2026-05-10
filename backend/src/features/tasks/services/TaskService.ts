import { NotFoundError } from "#/core/errors/AppError.js";
import { BaseCrudService } from "#core/services/BaseCrudService.js";
import { TaskModel } from "../models/TaskModel.js";
import type { TaskRepository } from "../repository/TaskRepository.js";

export class TaskService extends BaseCrudService<TaskModel, TaskRepository> {
    protected async beforeCreate(data: any): Promise<any> {
        data = await super.beforeCreate(data);
        // adding the validation for project_id if it is provided in the request body. we will check if the project with provided id exists for the user or not. if it does not exist then we will throw an error
        if (data.project_id && data.user_id) {
            const projectService = this.getDep("projectService");
            if (projectService) {
                const project = await projectService.read(data.project_id, { user_id: data.user_id });
                if (!project) {
                    throw new NotFoundError(`Project with id ${data.project_id} not found for user ${data.user_id}`);
                }
            } else {
                throw new Error("Project service is not available");
            }
        }
        return data;
    }
};
