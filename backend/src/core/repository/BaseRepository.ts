import { type Pool } from "mysql2/promise";

/*
 * @file: BaseRepository.js
 * @descripiton: This class serves as abstract data layer for all the application model
 * It is mandatory to pass the tableName and db connection object.
 */

abstract class BaseRepository {
    /*
     * @private
     * @type: string
     * @description: contains the table name exactly same as db. This is used in building the queries.
     */
    #table: string;
    /*
     * @private
     * @type: Object
     * @description: this variable contains the model details. this is used to run the queries on the database
     */
    #db: Pool;
    // #Model;
    /*
     * @constructor
     * @params: string tablename and Object dbConnectioon
     */
    // constructor(tableName, dbConnection,. Model) {
    public constructor(tableName: string, dbConnection: Pool) {
        if (!tableName || typeof tableName !== "string") {
            throw new Error(
                `base Model requires valid table name of type "string"`,
            );
        }
        this.#table = tableName;
        this.#db = dbConnection;
        // this.Model = Model;
    }
    /*
     * @public
     * @method: get table
     * @params: None
     * @return: string
     * @description: returns the table
     */
    protected get table() {
        return this.#table;
    }
    /*
     * @public
     * @method: get db
     * @params: None
     * @return: Object
     * @description: returns the db
     */
    protected get db(): Pool {
        return this.#db;
    }
    /*
     * @public
     * @method: query
     * @params: String, Array
     * @return: Array of Objects
     * @description: this will execute the provided query with provided params on the db.
     */
    protected async query(customQuery: string, params = []) {
        try {
            const [result] = await this.#db.execute(customQuery, params);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

export default BaseRepository;
