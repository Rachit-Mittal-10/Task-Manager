import { authenticateToken } from "#features/auth/middleware/AuthMiddleware.js";

import taskRouter from "#features/tasks/Tasks.js";
import userRouter from "#features/users/Users.js";
import StaticRouter from "#core/routes/StaticRouter.js";

class ProtectedRouter extends StaticRouter {
    constructor(){
        super();
        this.registerMiddleware(authenticateToken)
            .registerRouter("/tasks",taskRouter)
            .registerRouter("/users",userRouter);
    }
};
const protectedRouterInstanceRouter = new ProtectedRouter().router;

export {
    protectedRouter,
    protectedRouterInstanceRouter
};