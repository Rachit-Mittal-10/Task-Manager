import { IData } from "#common/types/IData.js";
import { IOptions } from "#core/repository/BaseCrudRepository.js";
import { IBaseCrudRepository } from "#core/repository/IBaseCrudRepository.js";
import { BaseService } from "./BaseService.js";
import { IBaseCrudService } from "./IBaseCrudService.js";
import { RequestContext } from "#common/types/RequestContext.js";

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
    public async create(data: IData, context?: RequestContext): Promise<number> {
        if (!data || Object.keys(data).length === 0) {
            throw new Error("Data is empty");
        }
        const processedData = await this.beforeCreate(data);
        const result = await this.repository.create(processedData,context);
        await this.afterCreate(result, processedData);
        return result;
    }
    /* 
     * @public
     * @method: read
     * @params: id, filters and options for pagination
     * @return: Object or Array of objects
     * @description: This will return the data based on id or key value pair provided in filters and options for pagination
    */
    public async read(id?: number | undefined, context?: RequestContext) : Promise<T | T[] | undefined> {
        await this.beforeRead(id);
        const result = await this.repository.read(id,context);
        await this.afterRead(id, result);
        return result;
    }
    /*
     * @public
     * @method: update
     * @params: int and Object
     * @return: Array of Objects
     * @description: update data of particular row in table
     */
    public async update(id: number, data: IData, context?: RequestContext): Promise<number> {
        if (!data || Object.keys(data).length === 0) {
            throw new Error("Data is Empty");
        }
        const processedData = await this.beforeUpdate(id, data);
        const result = await this.repository.update(id, processedData, context);
        await this.afterUpdate(id, result, processedData);
        return result;
    }
    /*
     * @public
     * @method: remove
     * @params: int
     * @return: Array of Objects
     * @description: deletes the particular row of table
     */
    public async remove(id: number, context?: RequestContext): Promise<number> {
        await this.beforeRemove(id);
        const result = await this.repository.remove(id, context);
        await this.afterRemove(id, result);
        return result;
    }
    // Hooks for performing any operation before or after create, update and delete operations.
    // this.constructor.name will give the name of the class which is extending the BaseCrudService.
    protected async beforeCreate(data: IData): Promise<IData> {
        return data;
    }
    protected async afterCreate(result: number, data: IData): Promise<void> {
        console.log(`[${this.constructor.name}] Created entry with id: ${result}`);
        return;
    }
    protected async beforeRead(id?: number): Promise<void> {
        return;
    }
    protected async afterRead(id: number | undefined, result: T | T[] | undefined): Promise<void> {
        console.log(`[${this.constructor.name}] Read entry with id: ${id}`);
        return;
    }
    protected async beforeUpdate(id: number, data: IData): Promise<IData> {
        return data;
    }
    protected async afterUpdate(id: number, result: number, data: IData): Promise<void> {
        console.log(`[${this.constructor.name}] Updated entry with id: ${id}, rows affected: ${result}`);
        return;
    }
    protected async beforeRemove(id: number): Promise<void> {
        return;
    }
    protected async afterRemove(id: number, result: number): Promise<void> {
        console.log(`[${this.constructor.name}] Removed entry with id: ${id}, rows affected: ${result}`);
        return;
    }
}
