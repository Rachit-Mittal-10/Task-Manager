/*
 * @file: StaticService.js
 * @description: Static Service class designed to build service which requires no model. Optional Dependencies array using dependency injection.
 */
abstract class StaticService {
    /*
     * @private
     * @type: Object of Object
     * @description: contains the dependencies
     */
    #dep;
    /*
     * @constructor
     * @params: Object
     */
    constructor(dep = {}) {
        this.#dep = dep;
    }
    /*
     * @public
     * @method: getter dep
     * @params: None
     * @return: Object
     * @description: returns the dependency array
     */
    get dep() {
        return this.#dep;
    }
    /*
     * @public
     * @method: getDep
     * @params: key
     * @return: Object
     * @description: returns the particular dependency identified by key
     */
    getDep(key) {
        if (key in this.dep) {
            return this.dep[key];
        }
        return null;
    }
}

export default StaticService;
