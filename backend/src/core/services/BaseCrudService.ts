import { IData } from "#common/types/IData.js";
import { IBaseCrudRepository } from "#core/repository/IBaseCrudRepository.js";
import { BaseService } from "./BaseService.js";

/*
 * @file: BaseCrudService.js
 * @description: This provides the basic crud functionality for all the application service layers by calling methods on model
 */
export abstract class BaseCrudService<R extends IBaseCrudRepository> extends BaseService<R> {
    /*
     * @constructor
     * @params: Object and Object
     */
    constructor(repository: R, dep: IData = {}) {
        super(repository, dep);
    }
    /*
     * @public
     * @method: create
     * @params: Object
     * @return: array of Object
     * @description: adds the row in the database using model
     */
    async create(data: IData) {
        if (!data || Object.keys(data).length === 0) {
            throw new Error("Data is empty");
        }
        try {
            const result = await this.repository.create(data);
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
    async get(id: number) {
        try {
            const result = await this.repository.get(id);
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
            const result = await this.repository.getAll();
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
    async update(id: number, data: IData) {
        if (!data || Object.keys(data).length === 0) {
            throw new Error("Data is Empty");
        }
        try {
            const result = await this.repository.update(id, data);
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
    async remove(id: number) {
        try {
            const result = await this.repository.remove(id);
            return result;
        } catch (err) {
            throw err;
        }
    }
}
