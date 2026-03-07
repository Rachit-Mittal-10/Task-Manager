import { BaseCrudRouter } from "#core/routes/BaseCrudRouter.js";
import type TaskController from "../controllers/TaskController.js";

class TaskRouter extends BaseCrudRouter<TaskController> {
    constructor(controller: TaskController) {
        super(controller,["getAll"]);
        this.registerRoute("get", "/user-task/:user_id", "getByUserId");
    }
}

export default TaskRouter;
