import BaseRouter from "#core/routes/BaseRouter.js";

class AuthRouter extends BaseRouter {
    constructor(controller) {
        super(controller);
        this.registerCustomRoutes();
    }
    registerCustomRoutes(){
        this.registerRoute("post", "/login", "login");
        // this.registerRoute("post", "/register", "register");
        this.registerRoute("get","/me","me");
    }
}

export default AuthRouter;