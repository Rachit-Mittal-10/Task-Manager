import { BaseCrudController } from "#core/controllers/BaseCrudController.js";
import type TaskService from "../services/TaskService.js";

class TaskController extends BaseCrudController<TaskService> {}

export default TaskController;
