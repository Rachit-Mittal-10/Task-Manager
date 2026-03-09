/*
 * @file: BaseCrudRepository.js
 * @description: This class serves as abstract data layer for all the application repository
 * It is mandatory to pass the tableName and db connection object.
 * It provides the basic crud functionality.
 */


import { BaseRepository } from "./BaseRepository.js";
import type { Knex } from "knex";
import type { IData } from "#common/types/IData.js";

export type IOptions = {
    limit?: number;
    offset?: number;
};

export abstract class BaseCrudRepository extends BaseRepository {
    /*
     * @constructor
     * @params: string and Object
     */
    public constructor(tableName: string, dbConnection: Knex) {
        super(tableName, dbConnection);
    }
    /*
     * @public
     * @method: create
     * @params: Object key value pair
     * @return: Array of number which is first id of created rows for MySQL
     * @description: This will create the entry in table
     */
    public async create(data: IData): Promise<number> {
        const [id] = await this.db(this.table).insert(data);
        return id;
    }
    /* 
    * @public
    * @method: read
    * @params: id, filters and options for pagination
    * @return: Object or Array of objects
    * @description: This will return the data based on id or key value pair provided in filters and options for pagination
    */
    public async read(id?: number | undefined, filters?: IData | undefined, options?: IOptions): Promise<any> {
        const { limit = 10, offset = 0 } = options || {};
        let query = this.db(this.table);
        //: handles the GET /:id. single resource will be returned based on id
        if(id !== undefined) {
            return query.where({id}).select("*").first();
        }
        //: handles the GET /?key=value. this will return the data based on key value pair provided in filters and options for pagination.
        if(filters) {
            query =  query.where(filters);
        }
        //: if filters are undefined then it will return all the data in table with pagination
        return await query.limit(limit).offset(offset).select("*");
    }
    /*
     * @public
     * @method: update
     * @params: Int, Object
     * @return: number of rows updated
     * @description: This will update the value of provided id
     */
    public async update(id: number, data: IData): Promise<number> {
        return await this.db(this.table).where({ id }).update(data);
    }
    /*
     * @public
     * @method: remove
     * @params: Int
     * @return: number of rows deleted
     * @description: This will delete the row with provided id
     */
    public async remove(id: number): Promise<number> {
        return await this.db(this.table).where({ id }).delete();
    }
}
