import conn from "#config/mysql.js";
import TaskRepository from "./repository/TaskRepository.js";
import TaskService from "./services/TaskService.js";
import TaskController from "./controllers/TaskController.js";
import TaskRouter from "./routes/TaskRouter.js";

const taskRepository: TaskRepository = new TaskRepository(conn);
const taskService: TaskService = new TaskService(taskRepository);
const taskController: TaskController = new TaskController(taskService);
const taskRouter: TaskRouter = new TaskRouter(taskController);

export { taskService, taskRouter };
