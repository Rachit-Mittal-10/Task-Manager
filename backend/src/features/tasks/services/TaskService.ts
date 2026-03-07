import { BaseCrudService } from "#core/services/BaseCrudService.js";
import type TaskRepository from "../repository/TaskRepository.js";

class TaskService extends BaseCrudService<TaskRepository> {
    async getByUserId(user_id: number): Promise<any[]> {
        return await this.repository.getByUserId(user_id);
    }
};

export default TaskService;
