import BaseService from "./BaseService.js";

/*
 * @file: BaseCrudService.js
 * @description: This provides the basic crud functionality for all the application service layers by calling methods on model
 */
class BaseCrudService extends BaseService {
    /*
     * @constructor
     * @params: Object and Object
     */
    constructor(model, dep = {}) {
        if (!model) {
            throw new Error("Model is mandatory!!!");
        }
        super(model, dep);
    }
    /*
     * @public
     * @method: create
     * @params: Object
     * @return: array of Object
     * @description: adds the row in the database using model
     */
    async create(data) {
        if (!data || Object.keys(data).length === 0) {
            throw new Error("Data is empty");
        }
        try {
            const result = await this.model.create(data);
            return result;
        } catch (err) {
            throw err;
        }
    }
    /*
     * @public
     * @method: get
     * @params: int
     * @return: Object
     * @description: return the row with particular id
     */
    async get(id) {
        try {
            const result = await this.model.get(id);
            return result[0];
        } catch (err) {
            throw err;
        }
    }
    /*
     * @public
     * @method: getAll
     * @params: None
     * @return: Array of Objects
     * @description: returns all the data in table
     */
    async getAll() {
        try {
            const result = await this.model.getAll();
            return result;
        } catch (err) {
            console.log(`Err during service: ${err}`);
            throw err;
        }
    }
    /*
     * @public
     * @method: update
     * @params: int and Object
     * @return: Array of Objects
     * @description: update data of particular row in table
     */
    async update(id, data) {
        if (!data || Object.keys(data) === 0) {
            throw new Error("Data is Empty");
        }
        try {
            const result = await this.model.update(id, data);
            return result;
        } catch (err) {
            throw err;
        }
    }
    /*
     * @public
     * @method: remove
     * @params: int
     * @return: Array of Objects
     * @description: deletes the particular row of table
     */
    async remove(id) {
        try {
            const result = await this.model.remove(id);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

export default BaseCrudService;
