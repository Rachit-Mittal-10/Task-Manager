import { BaseRepository } from "./BaseRepository.js";
import { type Pool } from "mysql2/promise";

/*
 * @file: BaseCrudRepository.js
 * @description: This class serves as abstract data layer for all the application model
 * It is mandatory to pass the tableName and db connection object.
 */
export abstract class BaseCrudRepository extends BaseRepository {
    /*
     * @constructor
     * @params: string and Object
     */
    // constructor(tableName, dbConnection, Model){
    public constructor(tableName: string, dbConnection: Pool) {
        // super(tableName, dbConnection, Model);
        super(tableName, dbConnection);
    }
    /*
     * @public
     * @method: create
     * @params: Object key value pair
     * @return: Array
     * @description: This will create the entry in table
     */
    protected async create(data: any) {
        const dataValueArr = Object.values(data);
        let cols = Object.keys(data).join(", ");
        let placeholders = Object.keys(data)
            .map(() => {
                return "?";
            })
            .join(", ");
        const query = `INSERT INTO ${this.table}(${cols}) VALUES(${placeholders});`;
        try {
            const [result] = await this.query(query, dataValueArr);
            return result;
        } catch (err) {
            // console.log(`Error while adding data in table ${this.table}: ${err.message}`);
            throw err;
        }
    }
    /*
     * @public
     * @method: get
     * @params: Int
     * @return: array of objects
     * @description: This will return the row with provided id
     */
    protected async get(id) {
        const query = `SELECT * FROM ${this.table} WHERE id = ?;`;
        try {
            const [result] = await this.query(query, [id]);
            // return this.Model(result)
            return result;
        } catch (err) {
            // console.log(`Error while get data in table ${this.table}: ${err.message}`);
            throw err;
        }
    }
    /*
     * @public
     * @method: getAll
     * @params: None
     * @return: Array of Objects
     * @description: This will return the entire data in the table
     */
    protected async getAll() {
        const query = `SELECT * FROM ${this.table};`;
        try {
            const [result] = await this.query(query);
            return result;
        } catch (err) {
            console.log(
                `Error while getting all data in the table ${this.table}: ${err.message}`,
            );
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
    protected async update(id, data) {
        const dataValuesArr = Object.values(data);
        let setString = Object.keys(data)
            .map((key) => {
                return `${key} = ?`;
            })
            .join(", ");
        const query = `UPDATE ${this.table} SET ${setString} WHERE id = ?;`;
        try {
            const [result] = await this.query(query, [...dataValuesArr, id]);
            return result;
        } catch (err) {
            // console.log(`Error while updating data in the table ${this.table}: ${err.message}`);
            throw err;
        }
    }
    /*
     * @public
     * @method: remove
     * @params: Int
     * @return: Array of Objects
     * @description: This will delete the row with provided id
     */
    protected async remove(id) {
        const query = `DELETE FROM ${this.table} WHERE id = ?;`;
        try {
            const [result] = await this.query(query, [id]);
            return result;
        } catch (err) {
            throw err;
        }
    }
    // Here data is key value pair.
    protected async findBy(data, options = {}) {
        const limit = options.limit;
        const offset = options.offset;
        const WHERE = Object.key(data)
            .map((key) => {
                `${key} = ?`;
            })
            .join(", ");
        console.log(WHERE);
        const placeholders = Object.values(data);
        const query = `SELECT * FROM ${this.table} WHERE ${WHERE}`;
        if (limit) {
            query += `LIMIT ${limit}`;
        }
        if (offset) {
            query += `OFFSET ${offset}`;
        }
        console.log(query);
        query += `;`;
        try {
            const result = await this.query(query, placeholders);
            return result;
        } catch (err) {
            throw err;
        }
    }
}