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
     * @method: get
     * @params: Int
     * @return: object or undefined
     * @description: This will return the row with provided id
     */
    public async get(id: number): Promise<any | undefined> {
        return await this.db(this.table).where({ id }).select("*").first();
    }
    /*
     * @public
     * @method: getAll
     * @params: None
     * @return: Array of Objects
     * @description: This will return the entire data in the table
     */
    public async getAll(): Promise<any[]> {
        return await this.db(this.table).select("*");
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
    /*
     * @public
     * @method: findBy
     * @params: data  and options
     * @return: Array of objects
     * @description: This will return the data based on key value pair provided in data and options for pagination
     */
    public async findBy(data: IData, options: IOptions = {}): Promise<any[]> {
        let query = this.db(this.table).where(data);
        if (options.limit) {
            query = query.limit(options.limit);
        }
        if (options.offset) {
            query = query.offset(options.offset);
        }
        return await query.select("*");
    }
}
