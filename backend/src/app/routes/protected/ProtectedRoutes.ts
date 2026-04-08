import { authenticateToken } from "#features/auth/middleware/AuthMiddleware.js";
import { taskRouter } from "#features/tasks/Tasks.js";
import { userRouter } from "#features/users/Users.js";
import { StaticRouter } from "#core/routes/StaticRouter.js";
import { dashboardRouter } from "#features/dashboard/Dashboard.js";

class ProtectedRouter extends StaticRouter {
    constructor() {
        super();
        this.registerMiddleware(authenticateToken)
            .registerRouter("/tasks", taskRouter.getRouter())
            .registerRouter("/users", userRouter.getRouter())
            .registerRouter("/dashboard", dashboardRouter.getRouter())
            ;
    }
}

const protectedRouter: ProtectedRouter = new ProtectedRouter();

export { protectedRouter };
