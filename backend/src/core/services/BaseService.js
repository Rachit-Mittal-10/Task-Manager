import StaticService from "./StaticService.js";
/*
 * @file: BaseService.js
 * @description: Extends Static Service and adds the Model into class
 */
class BaseService extends StaticService {
    /*
     * @private
     * @type: Object
     * @description: contains the model object. used to talk to model
     */
    #model;
    /*
     * @constructor
     * @params: Object and Object
     */
    constructor(model, dep = {}) {
        if (!model) {
            throw new Error("Model is mandatory");
        }
        super(dep);
        this.#model = model;
    }
    /*
     * @public
     * @method: get model
     * @description: returns the model
     */
    get model() {
        return this.#model;
    }
}

export default BaseService;
