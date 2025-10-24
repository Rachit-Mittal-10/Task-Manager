class StaticService {
    #dep;
    constructor(dep = {}){
        this.#dep = dep;
    }
    get dep(){
        return this.#dep;
    }
};

export default StaticService;