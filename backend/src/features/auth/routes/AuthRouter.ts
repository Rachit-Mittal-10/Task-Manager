import { BaseRouter } from "#core/routes/BaseRouter.js";
import type AuthController from "../controllers/AuthController.js";

class AuthRouter extends BaseRouter<AuthController> {
    constructor(controller: AuthController) {
        super(controller);
        this.registerCustomRoutes();
    }
    private registerCustomRoutes(): void {
        this.registerRoute("post", "/login", "login").registerRoute("post", "/register", "register");
    }
}

export default AuthRouter;
