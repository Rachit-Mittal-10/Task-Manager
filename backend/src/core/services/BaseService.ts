import StaticService from "./StaticService.js";
/*
 * @file: BaseService.js
 * @description: Extends Static Service and adds the Model into class
 */
abstract class BaseService extends StaticService {
    /*
     * @private
     * @type: Object
     * @description: contains the model object. used to talk to model
     */
    #repository;
    /*
     * @constructor
     * @params: Object and Object
     */
    constructor(repository, dep = {}) {
        if (!repository) {
            throw new Error("Repository is mandatory");
        }
        super(dep);
        this.#repository = repository;
    }
    /*
     * @public
     * @method: get repository
     * @description: returns the repository
     */
    get repository() {
        return this.#repository;
    }
}

export default BaseService;
