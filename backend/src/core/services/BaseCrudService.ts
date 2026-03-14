import { IData } from "#common/types/IData.js";
import { IOptions } from "#core/repository/BaseCrudRepository.js";
import { IBaseCrudRepository } from "#core/repository/IBaseCrudRepository.js";
import { BaseService } from "./BaseService.js";
import { IBaseCrudService } from "./IBaseCrudService.js";

/*
 * @file: BaseCrudService.js
 * @description: This provides the basic crud functionality for all the application service layers by calling methods on model
 */
export abstract class BaseCrudService<T,R extends IBaseCrudRepository<T>> extends BaseService<R> implements IBaseCrudService<T> {
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
    public async create(data: IData): Promise<number> {
        if (!data || Object.keys(data).length === 0) {
            throw new Error("Data is empty");
        }
        const result = await this.repository.create(data);
        return result;
    }
    /* 
     * @public
     * @method: read
     * @params: id, filters and options for pagination
     * @return: Object or Array of objects
     * @description: This will return the data based on id or key value pair provided in filters and options for pagination
    */
    public async read(id?: number | undefined, filters?: IData | undefined, options?: IOptions) : Promise<T | T[] | undefined> {
        const result = await this.repository.read(id,filters,options);
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
