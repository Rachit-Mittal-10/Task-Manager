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
            this.registerRoute("post", "/", "create" as any);
        }
        if (!this.disabledBaseRoutes.includes("read")) {
            this.registerRoute("get", "/:id", "read" as any).registerRoute("get", "/", "read" as any);
        }
        if (!this.disabledBaseRoutes.includes("update")) {
            this.registerRoute("put", "/:id", "update" as any);
        }
        if (!this.disabledBaseRoutes.includes("delete")) {
            this.registerRoute("delete", "/:id", "delete" as any);
        }
        return this;
    }
}
