import BaseRouter from "#core/routes/BaseRouter.js";

class UserRouter extends BaseRouter {
    constructor(controller){
        super(controller);
        this.registerBaseRoutes();
    }
};

export default UserRouter;