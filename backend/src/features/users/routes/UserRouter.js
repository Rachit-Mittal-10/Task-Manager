import BaseCrudRouter from "#core/routes/BaseCrudRouter.js";

class UserRouter extends BaseCrudRouter {
    constructor(controller){
        super(controller,["create"]);
    }
};

export default UserRouter;