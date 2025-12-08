/*
 * @file: BaseRepository.js
 * @descripiton: This class serves as abstract data layer for all the application model
 * It is mandatory to pass the tableName and db connection object.
 */
class BaseRepository {
    /*
     * @private
     * @type: string
     * @description: contains the table name exactly same as db. This is used in building the queries.
     */
    #table;
    /*
     * @private
     * @type: Object
     * @description: this variable contains the model details. this is used to run the queries on the database
     */
    #db;
    /*
     * @constructor
     * @params: string tablename and Object dbConnectioon
     */
    constructor(tableName, dbConnection) {
        if (!tableName || typeof tableName !== "string") {
            throw new Error(
                `base Model requires valid table name of type "string"`,
            );
        }
        this.#table = tableName;
        this.#db = dbConnection;
    }
    /*
     * @public
     * @method: get table
     * @params: None
     * @return: string
     * @description: returns the table
     */
    get table() {
        return this.#table;
    }
    /*
     * @public
     * @method: get db
     * @params: None
     * @return: Object
     * @description: returns the db
     */
    get db() {
        return this.#db;
    }
    /*
     * @public
     * @method: query
     * @params: String, Array
     * @return: Array of Objects
     * @description: this will execute the provided query with provided params on the db.
     */
    async query(customQuery, params = []) {
        try {
            const [result] = await this.#db.execute(customQuery, params);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

export default BaseRepository;
