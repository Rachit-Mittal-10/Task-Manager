import BaseRouter from "./BaseRouter";

class BaseCrudRouter extends BaseRouter {
    constructor(controller){
        if(!controller){
            throw new Error("Empty or Invalid Controller");
        }
        super(controller);
        this.registerBaseRoutes();
    }
    registerBaseRoutes(){
        this.registerRoute("post","/","create");
        this.registerRoute("get","/:id","get");
        this.registerRoute("get","/","getAll");
        this.registerRoute("put","/:id","update");
        this.registerRoute("delete","/:id","delete");
    }
}

export default BaseCrudRouter;