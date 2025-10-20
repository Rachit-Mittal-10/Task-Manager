import BaseRouter from "#core/routes/BaseRouter.js";

class TaskRouter extends BaseRouter {
    constructor(controller){
        super(controller);
        this.registerBaseRoutes();
    }
};

export default TaskRouter;