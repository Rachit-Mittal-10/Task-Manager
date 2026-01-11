import { BaseCrudService } from "#core/services/BaseCrudService.js";
import type TaskRepository from "../repository/TaskRepository.js";

class TaskService extends BaseCrudService<TaskRepository> {}

export default TaskService;
