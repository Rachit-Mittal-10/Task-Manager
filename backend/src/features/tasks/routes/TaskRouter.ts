import { BaseCrudRouter } from "#core/routes/BaseCrudRouter.js";
import type TaskController from "../controllers/TaskController.js";

class TaskRouter extends BaseCrudRouter<TaskController> {
    constructor(controller: TaskController) {
        super(controller);
    }
}

export default TaskRouter;
