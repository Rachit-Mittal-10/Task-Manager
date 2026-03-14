import { BaseCrudRouter } from "#core/routes/BaseCrudRouter.js";
import type { TaskController } from "../controllers/TaskController.js";

export class TaskRouter extends BaseCrudRouter<TaskController> {
    constructor(controller: TaskController) {
        super(controller);
    }
}
