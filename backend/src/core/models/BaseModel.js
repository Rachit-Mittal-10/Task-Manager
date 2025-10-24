/*
* BaseModel.js
* 
* This class serves as abstract data layer for all the application model
* It is mandatory to pass the tableName and db connection object. 
*/
class BaseModel {
    #table;
    #db;
    constructor(tableName, dbConnection) {
        if(!tableName || typeof tableName !== "string"){
            throw new Error(`base Model requires valid table name of type "string"`)
        }
        this.#table = tableName;
        this.#db = dbConnection;
    }
    get table(){
        return this.#table;
    }
    get db(){
        return this.#db;
    }
    /* 
    * @method: query
    * @params: String, Array
    * @return: Array of Objects
    * 
    * this will execute the provided query with provided params on the db.
    */
    async query(customQuery, params = []){
        try {
            const [result] = await this.#db.execute(customQuery, params);
            return result;
        }
        catch (err) {
            // console.log(`Error while executing custom query in the table ${this.#table}: ${err.message}`);
            throw err;
        }
    }
};

export default BaseModel;