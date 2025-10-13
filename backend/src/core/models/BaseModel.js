/*
* BaseModel.js
* 
* This class serves as abstract data layer for all the application model
* It is mandatory to pass the tableName and db connection object. 
*/

//! Never use the arrow function in class since they destroy the inheritance chain. rememeber this
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
            console.log(`Error while adding data in table ${this.#table}: ${err.message}`);
            throw err;
        }
    };
    async get(id){
        const query = `SELECT * FROM ${this.#table} WHERE id = ?;`;
        try {
            const [result] = await this.#db.execute(query, [id]);
            return result;
        }
        catch (err) {
            console.log(`Error while get data in table ${this.#table}: ${err.message}`);
            throw err;
        }
    };
    async getAll(){
        const query = `SELECT * FROM ${this.#table};`;
        try {
            const [result] = await this.#db.execute(query);
            return result;
        }
        catch (err) {
            console.log(`Error while getting all data in the table ${this.#table}: ${err.message}`);
            throw err;
        }
    }
    async update(id, data){
        const dataValuesArr = Object.values(data);
        let setString = Object.keys(data).map((key) => { return `${key} = ?`; }).join(", ");
        const query = `UPDATE ${this.#table} SET ${setString} WHERE id = ?;`;
        try {
            const [result] = await this.#db.execute(query, [...dataValuesArr, id]);
            return result;
        }
        catch (err) {
            console.log(`Error while updating data in the table ${this.#table}: ${err.message}`);
            throw err;
        }
    };
    async remove(id){
        const query = `DELETE FROM ${this.#table} WHERE id = ?;`;
        try {
            const [result] = await this.#db.execute(query, [id]);
            return result;
        }
        catch (err) {
            console.log(`Error while deleting in the table ${this.#table}: ${err.message}`);
            throw err;
        }
    };
};

export default BaseModel;