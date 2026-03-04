/*
 * @file: BaseCrudRepository.js
 * @description: This class serves as abstract data layer for all the application repository
 * It is mandatory to pass the tableName and db connection object.
 * It provides the basic crud functionality.
 */


import { BaseRepository } from "./BaseRepository.js";
import type { Pool } from "mysql2/promise";
import type { Knex } from "knex";
import { ReadOutput, WriteOutput } from "./IQueryOutput.js";
import type { IData } from "#common/types/IData.js";
import type { IBaseCrudRepository } from "./IBaseCrudRepository.js";

export type IOptions = {
    limit?: number;
    offset?: number;
};

export abstract class BaseCrudRepository extends BaseRepository implements IBaseCrudRepository {
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
     * @return: Array 
     * @description: This will create the entry in table
     */
    public async create(data: IData): Promise<WriteOutput> {
        return await this.db(this.table).insert(data);
    }
    /*
     * @public
     * @method: get
     * @params: Int
     * @return: array of objects
     * @description: This will return the row with provided id
     */
    public async get(id: number): Promise<ReadOutput> {
        return await this.db(this.table).where({ id }).select("*");
    }
    /*
     * @public
     * @method: getAll
     * @params: None
     * @return: Array of Objects
     * @description: This will return the entire data in the table
     */
    public async getAll(): Promise<ReadOutput> {
        return await this.db(this.table).select("*");
    }
    /*
     * @public
     * @method: update
     * @params: Int, Object
     * @return: Array of Objects
     * @description: This will update the value of provided id
     */
    public async update(id: number, data: IData): Promise<WriteOutput> {
        return await this.db(this.table).where({ id }).update(data);
    }
    /*
     * @public
     * @method: remove
     * @params: Int
     * @return: Array of Objects
     * @description: This will delete the row with provided id
     */
    public async remove(id: number): Promise<WriteOutput> {
        return await this.db(this.table).where({ id }).delete();
    }
    // Here data is key value pair.
    public async findBy(data: IData, options: IOptions = {}): Promise<ReadOutput> {
        const limit = options.limit;
        const offset = options.offset;
        return await this.db(this.table).where(data).limit(limit).offset(offset).select("*");
    }
}
