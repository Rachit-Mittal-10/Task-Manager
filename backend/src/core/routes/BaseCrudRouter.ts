import BaseRouter from "./BaseRouter.js";

class BaseCrudRouter extends BaseRouter {
    #disabledRoutes;
    constructor(controller, disabledRoutes = []) {
        if (!controller) {
            throw new Error("Empty or Invalid Controller");
        }
        super(controller);
        this.#disabledRoutes = disabledRoutes;
        this.registerBaseRoutes();
    }
    get disabledRoutes() {
        return this.#disabledRoutes;
    }
    registerBaseRoutes() {
        if (!this.disabledRoutes.includes("create")) {
            this.registerRoute("post", "/", "create");
        }
        if (!this.disabledRoutes.includes("get")) {
            this.registerRoute("get", "/:id", "get");
        }
        if (!this.disabledRoutes.includes("getAll")) {
            this.registerRoute("get", "/", "getAll");
        }
        if (!this.disabledRoutes.includes("update")) {
            this.registerRoute("put", "/:id", "update");
        }
        if (!this.disabledRoutes.includes("delete")) {
            this.registerRoute("delete", "/:id", "delete");
        }
    }
}

export default BaseCrudRouter;
