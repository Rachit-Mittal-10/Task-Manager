import conn from "#config/mysql.js";
import TaskRepository from "./repository/TaskRepository.js";
import TaskService from "./services/TaskService.js";
import TaskController from "./controllers/TaskController.js";
import TaskRouter from "./routes/TaskRouter.js";

const taskRepository = new TaskRepository(conn);
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);
const taskRouter = new TaskRouter(taskController);

export { taskService, taskRouter };
