import conn from "#config/mysql.js";

class BaseModel {
    constructor(tableName = "base") {
        this.table = tableName;
    }
    create = async (data) => {
        if(Object.keys(data).length === 0){
            throw new Error("Empty data");
            return;
        }
        const dataValueArr = Object.values(data);
        let valueString = "";
        let keyString = "";
        for (let key of Object.keys(data)) {
            if (keyString) {
                keyString += ", ";
                valueString += ", ";
            }
            keyString += key;
            valueString += "?";
        }
        const query = `INSERT INTO ${this.table}(${keyString}) VALUES(${valueString});`;
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
            return;
        }
        let setString = Object.entries(data).map(([key, value]) => { return `${key} = ${value}`; }).join(", ");
        const query = `UPDATE ${this.table} SET ${setString} WHERE id = ?;`;
        try {
            const [result] = await conn.execute(query, [id]);
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