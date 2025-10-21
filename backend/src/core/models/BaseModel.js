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
    * @method: create
    * @params: Object key value pair
    * @return: Array
    * 
    * This will create the entry in table
    */
    async create(data){
        const dataValueArr = Object.values(data);
        let cols = Object.keys(data).join(", ");
        let placeholders = Object.keys(data).map(() => { return "?" }).join(", ");
        const query = `INSERT INTO ${this.#table}(${cols}) VALUES(${placeholders});`;
        try {
            const [result] = await this.#db.execute(query, dataValueArr);
            return result;
        }
        catch (err) {
            // console.log(`Error while adding data in table ${this.#table}: ${err.message}`);
            throw err;
        }
    };
    /*
    * @method: get 
    * @params: Int
    * @return: array of objects
    * 
    * This will return the row with provided id
    */
    async get(id){
        const query = `SELECT * FROM ${this.#table} WHERE id = ?;`;
        try {
            const [result] = await this.#db.execute(query, [id]);
            return result;
        }
        catch (err) {
            // console.log(`Error while get data in table ${this.#table}: ${err.message}`);
            throw err;
        }
    };
    /* 
    * @method: getAll
    * @params: None
    * @return: Array of Objects
    * 
    * This will return the entire data in the table
    */
    async getAll(){
        const query = `SELECT * FROM ${this.#table};`;
        try {
            const [result] = await this.#db.execute(query);
            return result;
        }
        catch (err) {
            // console.log(`Error while getting all data in the table ${this.#table}: ${err.message}`);
            throw err;
        }
    }
    /* 
    * @method: update
    * @params: Int, Object
    * @return: Array of Objects
    * 
    * This will update the value of provided id
    */
    async update(id, data){
        const dataValuesArr = Object.values(data);
        let setString = Object.keys(data).map((key) => { return `${key} = ?`; }).join(", ");
        const query = `UPDATE ${this.#table} SET ${setString} WHERE id = ?;`;
        try {
            const [result] = await this.#db.execute(query, [...dataValuesArr, id]);
            return result;
        }
        catch (err) {
            // console.log(`Error while updating data in the table ${this.#table}: ${err.message}`);
            throw err;
        }
    };
    /* 
    * @method: remove
    * @params: Int
    * @return: Array of Objects
    * 
    * This will delete the row with provided id
    */
    async remove(id){
        const query = `DELETE FROM ${this.#table} WHERE id = ?;`;
        try {
            const [result] = await this.#db.execute(query, [id]);
            return result;
        }
        catch (err) {
            // console.log(`Error while deleting in the table ${this.#table}: ${err.message}`);
            throw err;
        }
    };
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
    // Here data is key value pair.
    async findBy(data, options){

    }
};

export default BaseModel;