import { authRouter } from "#features/auth/Auth.js";
import { StaticRouter } from "#core/routes/StaticRouter.js";
import type { Router } from "express";
import { testRouter } from "#features/test/Test.js";

class PublicRouter extends StaticRouter {
    constructor() {
        super();
        this.registerRouter("/auth", authRouter.getRouter()).registerRouter("/tests",testRouter.getRouter());
    }
}

const publicRouter: PublicRouter = new PublicRouter();

export { publicRouter };
