import { IBaseModel } from "#core/models/IBaseModel.js";
import { RequestContext } from "#common/types/RequestContext.js";
import type { Knex } from "knex";

/*
 * @file: BaseRepository.js
 * @descripiton: This class serves as abstract data layer for all the application repository
 * It is mandatory to pass the tableName and db connection object.
 */
export abstract class BaseRepository<T extends IBaseModel> {
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
     * @protected: readonly
     * @type: T
     * @description: This is used to store the function to create the model
    */
    protected readonly modelConstructor : new (data: any) => T;
    /*
     * @constructor
     * @params: string tablename and Object dbConnectioon
     */
    public constructor(tableName: string, dbConnection: Knex, modelConstructor: new (data: any) => T) {
        this.table = tableName;
        this.#db = dbConnection;
        this.modelConstructor = modelConstructor;
    }
    /*
     * @method: getter db
     * @return: Knex object
     * @description: this will returrn the Knex object which is used to run the queries on the database
     */
    protected get db() : Knex {
        return this.#db;
    }

    protected getExecutor(context?: RequestContext): Knex | Knex.Transaction {
        return context?.tx || this.#db;
    }
    /*
     * @method: mapToModel
     * @params: data object returned from database query
     * @return: T which is the model instance of the data
     * @description: this will map the data returned from database query to the model instance
    */
    protected mapToModel(data: any) : T {
        return new this.modelConstructor(data);
    }
}