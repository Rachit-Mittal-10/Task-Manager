import { Router } from "express";

class BaseRouter {
    #router;
    #controller;
    constructor(controller) {
        if(!controller){
            throw new Error("Controller is required!!!")
        }
        this.#router = new Router();
        this.#controller = controller;
    }
    get router() {
        return this.#router;
    }
    get controller() {
        return this.#controller;
    }
    registerRoutes() {
        throw new Error("registerRoutes method must be implemented in the subclass");
    }
};

export default BaseRouter;