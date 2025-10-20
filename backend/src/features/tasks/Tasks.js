import conn from "#config/mysql.js";
import TaskModel from "./models/TaskModel.js";
import TaskService from "./services/TaskService.js";
import TaskController from "./controller/TaskController.js";
import TaskRouter from "./routes/TaskRouter.js";

const taskModel = new TaskModel(conn);
const taskService = new TaskService(taskModel);
const taskController = new TaskController(taskService);
const taskRouter = new TaskRouter(taskController);

export {
    taskService,
    taskRouter
};