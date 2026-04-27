import { TaskRepository } from "./repository/TaskRepository.js";
import { TaskService } from "./services/TaskService.js";
import { TaskController } from "./controllers/TaskController.js";
import { TaskRouter } from "./routes/TaskRouter.js";
import { db } from "#config/knex.js";

const taskRepository: TaskRepository = new TaskRepository(db);
const taskService: TaskService = new TaskService(taskRepository, { db });
const taskController: TaskController = new TaskController(taskService);
const taskRouter: TaskRouter = new TaskRouter(taskController);

export { taskService, taskRouter };
