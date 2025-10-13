import { Router } from "express";

class BaseRouter {
    #router;
    #controller;
    constructor(controller) {
        if(!controller){
            throw new Error("Controller is required!!!")
        }
        this.#router = Router();
        this.#controller = controller;
    }
    get router() {
        return this.#router;
    }
    get controller() {
        return this.#controller;
    }
    registerBaseRoutes(){
        this.router.post("/",this.controller.create.bind(this.controller));
        this.router.get("/:id",this.controller.get.bind(this.controller));
        this.router.get("/",this.controller.getAll.bind(this.controller));
        this.router.put("/:id",this.controller.update.bind(this.controller));
        this.router.delete("/:id",this.controller.delete.bind(this.controller));
    }
    registerRoutes() {
        throw new Error("registerRoutes method must be implemented in the subclass");
    }
};

export default BaseRouter;