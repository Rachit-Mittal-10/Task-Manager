class BaseService {
    #dep;
    constructor(dep = {}){
        this.#dep = dep;
    }
    get dep(){
        return this.dep;
    }
};

export default BaseService;