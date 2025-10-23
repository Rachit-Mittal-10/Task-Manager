import { Router } from "express";

class StaticRouter {
    #router;
    constructor(){
        this.#router = Router();
    }
    get router(){
        return this.#router;
    }
    registerMiddleware(...args){
        if(args.length === 0){
            throw new Error("Empty Middlewares");
        }
        let path;
        let handlers;
        if(typeof args[0] === "string"){
            path = args[0];
            handlers = args.slice(1);
        }
        else{
            handlers = args;
        }
        for(let handler of handlers){
            if(typeof handler !== "function"){
                throw new Error("Invalid Handler");
            }
        }
        if(path){
            this.router.use(path,...handlers);
        }
        else{

            this.router.use(...handlers);
        }
    }
    registerRouter(routerPath, routerHandler){
        if(!routerPath || typeof routerPath !== "string" || !routerPath.trim()){
            throw new Error("Path cannot be empty");
        }
        if(!routerHandler || typeof routerHandler.use !== "function"){
            throw new Error("Invalid Router");
        }
        this.router.use(routerPath,routerHandler);
    }
};

export default StaticRouter;