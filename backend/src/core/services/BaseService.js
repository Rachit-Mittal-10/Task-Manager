import StaticService from "./StaticService.js";

class BaseService extends StaticService {
    #model;
    constructor(model, dep = {}){
        if(!model){
            throw new Error("Model is mandatory");
        }
        super(dep);
        this.#model = model;
    }
    get model(){
        return this.#model;
    }
};

export default BaseService;