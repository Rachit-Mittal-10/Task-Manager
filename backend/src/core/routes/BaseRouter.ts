import { StaticRouter } from "./StaticRouter.js";
import type { NextFunction, Request, Response } from "express";

type HttpMethod = "post" | "get" | "put" | "patch" | "delete" | "head" | "options";

type ControllerHandler = (request: Request, response: Response, next?: NextFunction) => unknown | Promise<unknown>;

type HandlerKeys<C> = Extract<{
    [K in keyof C]-?: C[K] extends ControllerHandler ? K : never;
}[keyof C], string>;

/*
 * BaseRouter
 */
export abstract class BaseRouter<C extends object = any> extends StaticRouter {
    protected readonly controller: C;
    constructor(controller: C) {
        if (!controller) {
            throw new Error("Controller is required!!!");
        }
        super();
        this.controller = controller;
    }
    private bindController(handler: HandlerKeys<C>) {
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
    protected registerRoute(method: HttpMethod, path: string, handler: HandlerKeys<C>): this {
        if (!method) {
            throw new Error("Empty Method");
        }
        if (!path || !path.trim()) {
            throw new Error("Empty Path");
        }
        if (!handler) {
            throw new Error("Empty Handler");
        }
        this.router[method.toLowerCase()](path, this.bindController(handler));
        return this;
    }
}
