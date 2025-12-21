import { BaseModel } from "#core/models/BaseModel.js";
import { type Pool } from "mysql2/promise";
import { ExecuteOutput, QueryOutput, ReadOutput, WriteOutput } from "./IQueryOutput.js";

/*
 * @file: BaseRepository.js
 * @descripiton: This class serves as abstract data layer for all the application repository
 * It is mandatory to pass the tableName and db connection object.
 */
export abstract class BaseRepository {
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
    /*
     * @protected
     * @method: query
     * @params: String, Array
     * @return: Array of Objects
     * @description: this will execute the provided query with provided params on the db.
     */
    private async query(customQuery: string, params: readonly unknown[] = []) : Promise<QueryOutput> {
        const result:ExecuteOutput = await this.db.execute(customQuery, params);
        return result[0] as QueryOutput;
    }
    protected async read(customQuery: string, params: readonly unknown[] = []): Promise<ReadOutput>{
        const result = await this.query(customQuery,params);
        return result as ReadOutput;
    }
    protected async write(customQuery: string, params: readonly unknown[] = []): Promise<WriteOutput>{
        const result = await this.query(customQuery,params);
        return result as WriteOutput;
    }
}