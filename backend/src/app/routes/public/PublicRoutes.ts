import { authRouter } from "#features/auth/Auth.js";
import { StaticRouter } from "#core/routes/StaticRouter.js";
import type { Router } from "express";

class PublicRouter extends StaticRouter {
    constructor() {
        super();
        this.registerRouter("/auth", authRouter.router);
    }
}

const publicRouterInstance: PublicRouter = new PublicRouter();
const publicRouter: Router = publicRouterInstance.router;

export { publicRouter };
