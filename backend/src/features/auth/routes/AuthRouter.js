import BaseRouter from "#core/routes/BaseRouter.js";

class AuthRouter extends BaseRouter {
    constructor(controller) {
        super(controller);
        this.initialiseRoutes();
    }
    registerRoutes(){
        this.router.post("/login",this.controller.login.bind(this.controller));
        this.router.post("/register",this.controller.login.bind(this.controller));
    }
    initialiseRoutes(){
        this.registerRoutes();
    }
}

export default AuthRouter;