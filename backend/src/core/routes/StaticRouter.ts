import { Router } from "express";
import type { Router as RouterType, RequestHandler } from "express";

export abstract class StaticRouter {
    protected readonly router: RouterType;
    public constructor() {
        this.router = Router();
    }
    // this needs to be worked on.
    // overrloading signatures
    protected registerMiddleware(pathOrHandler: string, ...handlers: RequestHandler[]): this;
    protected registerMiddleware(...handlers: RequestHandler[]): this;
    protected registerMiddleware(pathOrHandler: string | RequestHandler, ...handlers: RequestHandler[]): this {
        if(typeof pathOrHandler === "string" && handlers.length === 0) {
            throw new Error("At least one middleware must be provided");
        }
        if (typeof pathOrHandler === "string") {
            this.router.use(pathOrHandler, ...handlers);
        } else {
            this.router.use(pathOrHandler,...handlers);
        }
        return this;
    }
    protected registerRouter(routerPath: string, routerHandler: RouterType ): this {
        if (
            !routerPath ||
            !routerPath.trim()
        ) {
            throw new Error("Path cannot be empty");
        }
        if (!routerHandler) {
            throw new Error("Invalid Router");
        }
        this.router.use(routerPath, routerHandler);
        return this;
    }
}
