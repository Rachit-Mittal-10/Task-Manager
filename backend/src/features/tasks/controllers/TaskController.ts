import { BaseCrudController } from "#core/controllers/BaseCrudController.js";
import type TaskService from "../services/TaskService.js";
import type { Request, Response } from "express";

class TaskController extends BaseCrudController<TaskService> {
    public async getByUserId(request: Request, response: Response) {
        const user_id: number = Number(request.params.user_id);
        try {
            const result = await this.service.getByUserId(user_id);
            console.log(result);
            response.status(200).json({
                ok: true,
                data: result,
            });
        }
        catch (err){
            console.log(err);
            response.status(500).json({
                ok: false,
                error: err.message,
            });
        }
    }
};

export default TaskController;
