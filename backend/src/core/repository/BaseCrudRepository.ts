/*
 * @file: BaseCrudRepository.js
 * @description: This class serves as abstract data layer for all the application repository
 * It is mandatory to pass the tableName and db connection object.
 * It provides the basic crud functionality.
 */


import { BaseRepository } from "./BaseRepository.js";
import type { Knex } from "knex";
import type { IData } from "#common/types/IData.js";
import { IBaseModel } from "#core/models/IBaseModel.js";
import { IBaseCrudRepository } from "./IBaseCrudRepository.js";

export type IOptions = {
    limit?: number;
    offset?: number;
};

export abstract class BaseCrudRepository<T extends IBaseModel> extends BaseRepository<T> implements IBaseCrudRepository<T> {
    /*
     * @constructor
     * @params: string and Object
     */
    public constructor(tableName: string, dbConnection: Knex, modelConstructor: new (data: any) => T) {
        super(tableName, dbConnection,modelConstructor);
    }
    /*
     * @public
     * @method: create
     * @params: Object key value pair
     * @return: Array of number which is first id of created rows for MySQL
     * @description: This will create the entry in table
     */
    public async create(data: IData): Promise<number> {
        const processedData = await this.beforeCreate(data);
        const [id] = await this.db(this.table).insert(processedData);
        return id;
    }
    /* 
    * @public
    * @method: read
    * @params: id, filters and options for pagination
    * @return: Object or Array of objects
    * @description: This will return the data based on id or key value pair provided in filters and options for pagination
    */
    public async read(id?: number | undefined, filters?: IData | undefined, options?: IOptions): Promise<T | T[] | undefined> {
        const { limit = 10, offset = 0 } = options || {};
        let query = this.db(this.table);
        //: handles the GET /:id. single resource will be returned based on id
        if(id !== undefined) {
            const rawData = await query.where({id}).select("*").first();
            if(!rawData) {
                return undefined;
            }
            const modelObject = this.mapToModel(rawData);
            return modelObject;
            // return query.where({id}).select("*").first();
        }
        //: handles the GET /?key=value. this will return the data based on key value pair provided in filters and options for pagination.
        if(filters) {
            query =  query.where(filters);
        }
        //: if filters are undefined then it will return all the data in table with pagination
        const rawData = await query.limit(limit).offset(offset).select("*");
        return rawData.map(data => this.mapToModel(data));
        // return await query.limit(limit).offset(offset).select("*");
    }
    /*
     * @public
     * @method: update
     * @params: Int, Object
     * @return: number of rows updated
     * @description: This will update the value of provided id
     */
    public async update(id: number, data: IData, extraFilter?: IData): Promise<number> {
        const processedData = await this.beforeUpdate(id, data);
        let query = this.db(this.table).where({ id });
        const ownerColumn = this.getOwnerColumn();
        if(ownerColumn) {
            const ownerValue = extraFilter ? extraFilter[ownerColumn] : null;
            if(ownerValue === undefined) {
                throw new Error(`Owner column ${ownerColumn} value is required in extraFilter`);
                return 0;
            }
            query = query.andWhere(ownerColumn, ownerValue);
            extraFilter = extraFilter ? Object.fromEntries(Object.entries(extraFilter).filter(([key]) => key !== ownerColumn)) : undefined;
        }
        if(extraFilter && Object.keys(extraFilter).length > 0) {
            query = query.andWhere(extraFilter);
        }
        return await query.update(processedData);
    }
    /*
     * @public
     * @method: remove
     * @params: Int
     * @return: number of rows deleted
     * @description: This will delete the row with provided id
     */
    public async remove(id: number, extraFilter?: IData): Promise<number> {
        await this.beforeRemove(id);
        let query = this.db(this.table).where({ id });
        const ownerColumn = this.getOwnerColumn();
        if(ownerColumn) {
            const ownerValue = extraFilter ? extraFilter[ownerColumn] : null;
            if(ownerValue === undefined) {
                throw new Error(`Owner column ${ownerColumn} value is required in extraFilter`);
                return 0;
            }
            query = query.andWhere(ownerColumn, ownerValue);
            extraFilter = extraFilter ? Object.fromEntries(Object.entries(extraFilter).filter(([key]) => key !== ownerColumn)) : undefined;
        }
        if(extraFilter && Object.keys(extraFilter).length > 0) {
            query = query.andWhere(extraFilter);
        }
        return await query.delete();
    }
    //: Hooks for performing any operation before or after create, update and delete operations.
    protected async beforeCreate(data: IData): Promise<IData> {
        return data;
    }
    protected async beforeUpdate(id: number, data: IData): Promise<IData> {
        return data;
    }
    protected async beforeRemove(id: number): Promise<void> {
        return;
    }
    protected getOwnerColumn(): string | null {
        return null;
    }
}
