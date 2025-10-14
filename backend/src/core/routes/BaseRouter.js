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
    #bindController(method){
        return this.#controller[method].bind(this.#controller);
    }
    registerBaseRoutes(){
        this.registerRoute("post","/","create");
        this.registerRoute("get","/:id","get");
        this.registerRoute("get","/","getAll");
        this.registerRoute("put","/:id","update");
        this.registerRoute("delete","/:id","delete");
    }
    registerRoute(method, path, handler){
        this.router[method](path, this.#bindController(handler));
    }
    registerCustomRoutes() {
    }
};

export default BaseRouter;