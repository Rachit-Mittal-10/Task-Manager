import BaseModel from "./BaseModel.js";
/*
* @file: BaseCrudModel.js
* @description: This class serves as abstract data layer for all the application model
* It is mandatory to pass the tableName and db connection object. 
*/
class BaseCrudModel extends BaseModel {
    /* 
    * @constructor
    * @params: string and Object
    */
    constructor(tableName, dbConnection) {
        super(tableName, dbConnection);
    }
    /*
    * @public
    * @method: create
    * @params: Object key value pair
    * @return: Array
    * @description: This will create the entry in table
    */
    async create(data){
        const dataValueArr = Object.values(data);
        let cols = Object.keys(data).join(", ");
        let placeholders = Object.keys(data).map(() => { return "?" }).join(", ");
        const query = `INSERT INTO ${this.table}(${cols}) VALUES(${placeholders});`;
        try {
            const [result] = await this.db.execute(query, dataValueArr);
            return result;
        }
        catch (err) {
            // console.log(`Error while adding data in table ${this.table}: ${err.message}`);
            throw err;
        }
    };
    /*
    * @public
    * @method: get 
    * @params: Int
    * @return: array of objects
    * @description: This will return the row with provided id
    */
    async get(id){
        const query = `SELECT * FROM ${this.table} WHERE id = ?;`;
        try {
            const [result] = await this.db.execute(query, [id]);
            return result;
        }
        catch (err) {
            // console.log(`Error while get data in table ${this.table}: ${err.message}`);
            throw err;
        }
    };
    /* 
    * @public
    * @method: getAll
    * @params: None
    * @return: Array of Objects
    * @description: This will return the entire data in the table
    */
    async getAll(){
        const query = `SELECT * FROM ${this.table};`;
        try {
            const [result] = await this.db.execute(query);
            return result;
        }
        catch (err) {
            console.log(`Error while getting all data in the table ${this.table}: ${err.message}`);
            throw err;
        }
    }
    /* 
    * @public
    * @method: update
    * @params: Int, Object
    * @return: Array of Objects 
    * @description: This will update the value of provided id
    */
    async update(id, data){
        const dataValuesArr = Object.values(data);
        let setString = Object.keys(data).map((key) => { return `${key} = ?`; }).join(", ");
        const query = `UPDATE ${this.table} SET ${setString} WHERE id = ?;`;
        try {
            const [result] = await this.db.execute(query, [...dataValuesArr, id]);
            return result;
        }
        catch (err) {
            // console.log(`Error while updating data in the table ${this.table}: ${err.message}`);
            throw err;
        }
    };
    /* 
    * @public
    * @method: remove
    * @params: Int
    * @return: Array of Objects
    * @description: This will delete the row with provided id
    */
    async remove(id){
        const query = `DELETE FROM ${this.table} WHERE id = ?;`;
        try {
            const [result] = await this.db.execute(query, [id]);
            return result;
        }
        catch (err) {
            // console.log(`Error while deleting in the table ${this.table}: ${err.message}`);
            throw err;
        }
    };
    // Here data is key value pair.
    async findBy(data, options){

    }
};

export default BaseCrudModel;