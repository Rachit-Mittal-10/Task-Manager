import type { Knex } from "knex";

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
     * @type: Knex
     * @description: this variable contains the model details. this is used to run the queries on the database
     */
    #db: Knex;
    /*
     * @constructor
     * @params: string tablename and Object dbConnectioon
     */
    public constructor(tableName: string, dbConnection: Knex) {
        this.table = tableName;
        this.#db = dbConnection;
    }
    /*
     * @method: getter db
     * @return: Knex object
     * @description: this will returrn the Knex object which is used to run the queries on the database
     */
    protected get db() : Knex {
        return this.#db;
    }
}