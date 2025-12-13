import { StaticRouter } from "./StaticRouter.js";
/*
 * BaseRouter
 */
export abstract class BaseRouter extends StaticRouter {
    #controller;
    constructor(controller) {
        if (!controller) {
            throw new Error("Controller is required!!!");
        }
        super();
        this.#controller = controller;
    }
    get controller() {
        return this.#controller;
    }
    #bindController(handler) {
        if (!handler || typeof handler !== "string") {
            throw new Error("Invalid Handler. It needs to be string");
        }
        const fn = this.#controller[handler];
        // console.log(`Handler: ${handler}\nController:${this.#controller}\nType of Controller:${typeof this.#controller}\nfn: ${fn}\ntype: ${typeof fn}`);
        if (typeof fn !== "function") {
            throw new Error(
                "Invalid Handler. function does not exists on the controller",
            );
        }
        return fn.bind(this.#controller);
    }
    registerRoute(method, path, handler) {
        const validMethods = [
            "post",
            "get",
            "put",
            "patch",
            "delete",
            "head",
            "options",
        ];
        if (
            !method ||
            typeof method !== "string" ||
            !validMethods.includes(method.toLowerCase())
        ) {
            throw new Error("Empty or Invalid Method");
        }
        if (!path || typeof path !== "string" || !path.trim()) {
            throw new Error("Empty or Invalid Path");
        }
        if (!handler || typeof handler !== "string") {
            throw new Error("Empty or Invalid Handler");
        }
        this.router[method.toLowerCase()](path, this.#bindController(handler));
    }
}
