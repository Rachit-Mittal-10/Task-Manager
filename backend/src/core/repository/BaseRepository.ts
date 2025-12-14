import { BaseModel } from "#core/models/BaseModel.js";
import { ResultSetHeader, type Pool } from "mysql2/promise";

/*
 * @file: BaseRepository.js
 * @descripiton: This class serves as abstract data layer for all the application repository
 * It is mandatory to pass the tableName and db connection object.
 */

export abstract class BaseRepository<TRow, TModel extends BaseModel> {
    /*
     * @private
     * @type: string
     * @description: contains the table name exactly same as db. This is used in building the queries.
     */
    protected readonly table: string;
    /*
     * @private
     * @type: Pool
     * @description: this variable contains the model details. this is used to run the queries on the database
     */
    #db: Pool;
    /*
     * @constructor
     * @params: string tablename and Object dbConnectioon
     */
    public constructor(tableName: string, dbConnection: Pool) {
        this.table = tableName;
        this.#db = dbConnection;
    }
    /*
     * @method: getter db
     * @return: Pool object
     * @description: this will returrn the db connection pool
     */
    protected get db() : Pool {
        return this.#db;
    }
    protected abstract toModel(row: TRow): TModel;
    /*
     * @protected
     * @method: query
     * @params: String, Array
     * @return: Array of Objects
     * @description: this will execute the provided query with provided params on the db.
     */
    protected async query(customQuery: string, params: readonly unknown[] = []) : Promise<ResultSetHeader> {
        const result:any = await this.db.execute(customQuery, params);
        // result is [ResultSetHeader, FieldPacket]
        return result[0];
    }
}