import { authRouter } from "#features/auth/Auth.js";
import { StaticRouter } from "#core/routes/StaticRouter.js";

class PublicRouter extends StaticRouter {
    constructor() {
        super();
        this.registerRouter("/auth", authRouter.getRouter());
    }
}

const publicRouter: PublicRouter = new PublicRouter();

export { publicRouter };
