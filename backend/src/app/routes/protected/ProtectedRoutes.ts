import { authenticateToken } from "#features/auth/middleware/AuthMiddleware.js";
import { taskRouter } from "#features/tasks/Tasks.js";
import { userRouter } from "#features/users/Users.js";
import { StaticRouter } from "#core/routes/StaticRouter.js";
import type { Router } from "express";

class ProtectedRouter extends StaticRouter {
    constructor() {
        super();
        this.registerMiddleware(authenticateToken)
            .registerRouter("/tasks", taskRouter.router)
            .registerRouter("/users", userRouter.router);
    }
}

const protectedRouterInstance: ProtectedRouter = new ProtectedRouter();
const protectedRouter: Router = protectedRouterInstance.router;

export { protectedRouter };
