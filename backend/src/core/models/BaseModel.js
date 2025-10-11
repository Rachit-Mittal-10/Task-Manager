import conn from "#config/mysql.js";

class BaseModel {
    constructor(tableName = "base") {
        this.table = tableName;
    }
    create = async (data) => {
        if(!data || Object.keys(data).length === 0){
            throw new Error("Empty data");
        }
        const dataValueArr = Object.values(data);
        let cols = Object.keys(data).join(", ");
        let placeholders = Object.keys(data).map(()=>{return "?"}).join(", ");
        const query = `INSERT INTO ${this.table}(${cols}) VALUES(${placeholders});`;
        try {
            const [result] = await conn.execute(query, dataValueArr);
            return result;
        }
        catch (err) {
            console.log(`Error while adding data in table ${this.table}: ${err.message}`);
            throw err;
        }
    };
    get = async (id) => {
        const query = `SELECT * FROM ${this.table} WHERE id = ?;`;
        try {
            const [result] = await conn.execute(query, [id]);
            return result;
        }
        catch (err) {
            console.log(`Error while get data in table ${this.table}: ${err.message}`);
            throw err;
        }
    };
    getAll = async () => {
        const query = `SELECT * FROM ${this.table};`;
        try {
            const [result] = await conn.execute(query);
            return result;
        }
        catch (err) {
            console.log(`Error while getting all data in the table ${this.table}: ${err.message}`);
            throw err;
        }
    }
    update = async (id, data) => {
        if(Object.keys(data).length === 0){
            throw new Error("Empty data");
        }
        const dataValuesArr = Object.values(data);
        let setString = Object.keys(data).map((key) => { return `${key} = ?`; }).join(", ");
        const query = `UPDATE ${this.table} SET ${setString} WHERE id = ?;`;
        try {
            const [result] = await conn.execute(query, [...dataValuesArr, id]);
            return result;
        }
        catch (err) {
            console.log(`Error while updating data in the table ${this.table}: ${err.message}`);
            throw err;
        }
    };
    remove = async (id) => {
        const query = `DELETE FROM ${this.table} WHERE id = ?;`;
        try {
            const [result] = await conn.execute(query, [id]);
            return result;
        }
        catch (err) {
            console.log(`Error while deleting in the table ${this.table}: ${err.message}`);
            throw err;
        }
    };
};

export default BaseModel;