import { StaticRouter } from "./StaticRouter.js";
/*
 * BaseRouter
 */
export abstract class BaseRouter<C = any> extends StaticRouter {
    protected readonly controller: C;
    constructor(controller: C) {
        if (!controller) {
            throw new Error("Controller is required!!!");
        }
        super();
        this.controller = controller;
    }
    private bindController(handler: string) {
        if (!handler) {
            throw new Error("Handler is required!!!");
        }
        const fn = this.controller[handler];
        // console.log(`Handler: ${handler}\nController:${this.#controller}\nType of Controller:${typeof this.#controller}\nfn: ${fn}\ntype: ${typeof fn}`);
        if (typeof fn !== "function") {
            throw new Error(
                "Invalid Handler. function does not exists on the controller",
            );
        }
        return fn.bind(this.controller);
    }
    protected registerRoute(method: string, path: string, handler: string): this {
        const validMethods: string[] = [
            "post",
            "get",
            "put",
            "patch",
            "delete",
            "head",
            "options",
        ];
        if ( !method || !validMethods.includes(method.toLowerCase()) ) {
            throw new Error("Empty Method");
        }
        if (!path || !path.trim()) {
            throw new Error("Empty Path");
        }
        if (!handler || typeof handler !== "string") {
            throw new Error("Empty Handler");
        }
        this.router[method.toLowerCase()](path, this.bindController(handler));
        return this;
    }
}
