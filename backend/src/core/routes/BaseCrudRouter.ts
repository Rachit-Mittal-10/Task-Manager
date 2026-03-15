import { IBaseCrudController } from "#core/controllers/IBaseCrudController.js";
import { BaseRouter } from "./BaseRouter.js";

export abstract class BaseCrudRouter<C extends IBaseCrudController> extends BaseRouter<C> {
    #disabledBaseRoutes: string[];
    constructor(controller: C, disabledBaseRoutes: string[] = []) {
        if (!controller) {
            throw new Error("Empty or Invalid Controller");
        }
        super(controller);
        this.#disabledBaseRoutes = disabledBaseRoutes;
        this.registerBaseRoutes();
    }
    get disabledBaseRoutes(): string[] {
        return this.#disabledBaseRoutes;
    }
    protected registerBaseRoutes(): this {
        if (!this.disabledBaseRoutes.includes("create")) {
            this.registerRoute("post", "/", "create");
        }
        if (!this.disabledBaseRoutes.includes("read")) {
            this.registerRoute("get", "/:id", "read").registerRoute("get", "/", "read");
        }
        if (!this.disabledBaseRoutes.includes("update")) {
            this.registerRoute("put", "/:id", "update");
        }
        if (!this.disabledBaseRoutes.includes("delete")) {
            this.registerRoute("delete", "/:id", "delete");
        }
        return this;
    }
}
