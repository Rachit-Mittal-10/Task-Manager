/*
 * @file: StaticService.js
 * @description: Static Service class designed to build service which requires no model. Optional Dependencies array using dependency injection.
 */

import { IData } from "#common/types/IData.js";

export abstract class StaticService {
    /*
     * @private
     * @type: Object of Object
     * @description: contains the dependencies
     */
    protected readonly dep: IData;
    /*
     * @constructor
     * @params: Object
     */
    constructor(dep: IData = {}) {
        this.dep = dep;
    }
    /*
     * @public
     * @method: getDep
     * @params: key
     * @return: Object
     * @description: returns the particular dependency identified by key
     */
    getDep(key: string) {
        if (key in this.dep) {
            return this.dep[key];
        }
        return null;
    }
}
