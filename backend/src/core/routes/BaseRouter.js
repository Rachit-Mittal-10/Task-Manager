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
    bindController(method){
        return this.controller[method].bind(this.controller);
    }
    registerBaseRoutes(){
        this.router.post("/",this.bindController("create"));
        this.router.get("/:id",this.bindController("get"));
        this.router.get("/",this.bindController("getAll"));
        this.router.put("/:id",this.bindController("update"));
        this.router.delete("/:id",this.bindController("delete"));
        this.registerRoute("post","/","create");
    }
    registerRoute(method, path, handler){
        this.router[method](path, this.bindController(handler));
    }
    registerCustomRoutes() {
        throw new Error("registerCustomRoutes method must be implemented in the subclass");
    }
};

export default BaseRouter;