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
    public async read(id?: number | undefined, filters?: IData | undefined, options?: IOptions, context?: IData): Promise<T | T[] | undefined> {
        const { limit = 10, offset = 0 } = options || {};
        let query = this.db(this.table);

        //: sets the owner column value in query if owner column is defined in repository and context is provided. this will ensure that user can access only their resources.
        const ownerColumn = this.getOwnerColumn();
        if(ownerColumn) {
            const ownerValue = context ? context[ownerColumn] : null;
            if(ownerValue === undefined) {
                throw new Error(`Owner column ${ownerColumn} value is required in context`);
                return undefined;
            }
            console.log(`Owner column ${ownerColumn} value is ${ownerValue}`);
            query = query.where(ownerColumn, ownerValue);
        }

        //: handles the GET /:id. single resource will be returned based on id
        if(id !== undefined) {
            const rawData = await query.where({id}).select("*").first();
            if(!rawData) {
                return undefined;
            }
            const modelObject = this.mapToModel(rawData);
            return modelObject;
        }
        
        //: handles the GET /?key=value. this will return the data based on key value pair provided in filters and options for pagination.
        if(filters) {
            query =  query.where(filters);
        }

        //: if filters are undefined then it will return all the data in table with pagination
        const rawData = await query.limit(limit).offset(offset).select("*");
        return rawData.map(data => this.mapToModel(data));
    }
    /*
     * @public
     * @method: update
     * @params: Int, Object
     * @return: number of rows updated
     * @description: This will update the value of provided id
     */
    public async update(id: number, data: IData, context?: IData): Promise<number> {
        const processedData = await this.beforeUpdate(id, data);
        let query = this.db(this.table).where({ id });

        //: sets the owner column value in query if owner column is defined in repository and context is provided. this will ensure that user can update only their resources.
        const ownerColumn = this.getOwnerColumn();
        if(ownerColumn) {
            const ownerValue = context ? context[ownerColumn] : null;
            if(ownerValue === undefined) {
                throw new Error(`Owner column ${ownerColumn} value is required in context`);
                return 0;
            }
            query = query.andWhere(ownerColumn, ownerValue);
            context = context ? Object.fromEntries(Object.entries(context).filter(([key]) => key !== ownerColumn)) : undefined;
        }
        
        if(context && Object.keys(context).length > 0) {
            query = query.andWhere(context);
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
    public async remove(id: number, context?: IData): Promise<number> {
        await this.beforeRemove(id);
        let query = this.db(this.table).where({ id });

        //: sets the owner column value in query if owner column is defined in repository and context is provided. this will ensure that user can delete only their resources.
        const ownerColumn = this.getOwnerColumn();
        if(ownerColumn) {
            const ownerValue = context ? context[ownerColumn] : null;
            if(ownerValue === undefined) {
                throw new Error(`Owner column ${ownerColumn} value is required in context`);
                return 0;
            }
            query = query.andWhere(ownerColumn, ownerValue);
            context = context ? Object.fromEntries(Object.entries(context).filter(([key]) => key !== ownerColumn)) : undefined;
        }
        
        if(context && Object.keys(context).length > 0) {
            query = query.andWhere(context);
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
