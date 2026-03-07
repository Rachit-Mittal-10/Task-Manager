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
    public constructor(repository: R, dep: IData = {}) {
        super(repository, dep);
    }
    /*
     * @public
     * @method: create
     * @params: Object
     * @return: array of Object
     * @description: adds the row in the database using model
     */
    public async create(data: IData): Promise<number[]> {
        if (!data || Object.keys(data).length === 0) {
            throw new Error("Data is empty");
        }
        const result = await this.repository.create(data);
        return result;
    }
    /*
     * @public
     * @method: get
     * @params: int
     * @return: Object
     * @description: return the row with particular id
     */
    public async get(id: number): Promise<any[]> {
        const result = await this.repository.get(id);
        return result;
    }
    /*
     * @public
     * @method: getAll
     * @params: None
     * @return: Array of Objects
     * @description: returns all the data in table
     */
    public async getAll(): Promise<any[]> {
        const result = await this.repository.getAll();
        return result;
    }
    /*
     * @public
     * @method: update
     * @params: int and Object
     * @return: Array of Objects
     * @description: update data of particular row in table
     */
    public async update(id: number, data: IData): Promise<number> {
        if (!data || Object.keys(data).length === 0) {
            throw new Error("Data is Empty");
        }
        
        const result = await this.repository.update(id, data);
        return result;
        
    }
    /*
     * @public
     * @method: remove
     * @params: int
     * @return: Array of Objects
     * @description: deletes the particular row of table
     */
    public async remove(id: number): Promise<number> {
        const result = await this.repository.remove(id);
        return result;
    }
}
