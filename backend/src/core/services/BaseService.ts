import { IData } from "#common/types/IData.js";
import { StaticService } from "./StaticService.js";
/*
 * @file: BaseService.js
 * @description: Extends Static Service and adds the Model into class
 */
export abstract class BaseService<R> extends StaticService {
    /*
     * @private
     * @type: Object
     * @description: contains the repository object. used to talk to repository
     */
    protected readonly repository: R;
    /*
     * @constructor
     * @params: Object and Object
     */
    constructor(repository: R, dep: IData = {}) {
        if (!repository) {
            throw new Error("Repository is mandatory");
        }
        super(dep);
        this.repository = repository;
    }
}

