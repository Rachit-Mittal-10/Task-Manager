import { BaseCrudRouter } from "#core/routes/BaseCrudRouter.js";

class TaskRouter extends BaseCrudRouter {
    constructor(controller) {
        super(controller);
    }
}

export default TaskRouter;
