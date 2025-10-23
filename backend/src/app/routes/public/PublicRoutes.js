import { authRouter as authRouter } from "#features/auth/Auth.js";
import StaticRouter from "#core/routes/StaticRouter.js";

class PublicRouter extends StaticRouter {
    constructor(){
        super();
        this.registerRouter("/auth",authRouter);
    }
};

const publicRouter = new PublicRouter().router;

export {
    publicRouter
};