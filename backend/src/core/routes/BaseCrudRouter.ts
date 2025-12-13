import { BaseRouter } from "./BaseRouter.js";

export abstract class BaseCrudRouter extends BaseRouter {
    #disabledBaseRoutes: string[];
    constructor(controller, disabledBaseRoutes = []) {
        if (!controller) {
            throw new Error("Empty or Invalid Controller");
        }
        super(controller);
        this.#disabledBaseRoutes = disabledBaseRoutes;
        this.registerBaseRoutes();
    }
    get disabledBaseRoutes() {
        return this.#disabledBaseRoutes;
    }
    registerBaseRoutes() {
        if (!this.disabledBaseRoutes.includes("create")) {
            this.registerRoute("post", "/", "create");
        }
        if (!this.disabledBaseRoutes.includes("get")) {
            this.registerRoute("get", "/:id", "get");
        }
        if (!this.disabledBaseRoutes.includes("getAll")) {
            this.registerRoute("get", "/", "getAll");
        }
        if (!this.disabledBaseRoutes.includes("update")) {
            this.registerRoute("put", "/:id", "update");
        }
        if (!this.disabledBaseRoutes.includes("delete")) {
            this.registerRoute("delete", "/:id", "delete");
        }
    }
}
