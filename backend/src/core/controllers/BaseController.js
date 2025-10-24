class BaseController {
    #service;
    constructor(service){
        if(!service){
            throw new Error("service cannot be empty");
        }
        this.#service = service;
    }
    get service(){
        return this.#service;
    }
};

export default BaseController;