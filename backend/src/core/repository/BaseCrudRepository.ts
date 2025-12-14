import { BaseRepository } from "./BaseRepository.js";
import { type Pool } from "mysql2/promise";

/*
 * @file: BaseCrudRepository.js
 * @description: This class serves as abstract data layer for all the application repository
 * It is mandatory to pass the tableName and db connection object.
 * It provides the basic crud functionality.
 */
export abstract class BaseCrudRepository extends BaseRepository {
    /*
     * @constructor
     * @params: string and Object
     */
    public constructor(tableName: string, dbConnection: Pool) {
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
        const [result] = await this.query(query, dataValueArr);
        return result;
    }
    /*
     * @public
     * @method: get
     * @params: Int
     * @return: array of objects
     * @description: This will return the row with provided id
     */
    protected async get(id: number) {
        const query = `SELECT * FROM ${this.table} WHERE id = ?;`;
        const [result] = await this.query(query, [id]);
        return result;
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
        const [result] = await this.query(query);
        return result;
    }
    /*
     * @public
     * @method: update
     * @params: Int, Object
     * @return: Array of Objects
     * @description: This will update the value of provided id
     */
    protected async update(id: number, data: any) {
        const dataValuesArr = Object.values(data);
        let setString = Object.keys(data)
            .map((key) => {
                return `${key} = ?`;
            })
            .join(", ");
        const query = `UPDATE ${this.table} SET ${setString} WHERE id = ?;`;
        const [result] = await this.query(query, [...dataValuesArr, id]);
        return result;
    }
    /*
     * @public
     * @method: remove
     * @params: Int
     * @return: Array of Objects
     * @description: This will delete the row with provided id
     */
    protected async remove(id: number) {
        const query = `DELETE FROM ${this.table} WHERE id = ?;`;
        const [result] = await this.query(query, [id]);
        return result;
    }
    // Here data is key value pair.
    protected async findBy(data: any, options: any = {}) {
        const limit = options.limit;
        const offset = options.offset;
        const WHERE = Object.keys(data)
            .map((key) => {
                `${key} = ?`;
            })
            .join(", ");
        console.log(WHERE);
        const placeholders = Object.values(data);
        let query: string = `SELECT * FROM ${this.table} WHERE ${WHERE}`;
        if (limit) {
            query += `LIMIT ${limit}`;
        }
        if (offset) {
            query += `OFFSET ${offset}`;
        }
        console.log(query);
        query += `;`;
        const result = await this.query(query, placeholders);
        return result;
    }
}