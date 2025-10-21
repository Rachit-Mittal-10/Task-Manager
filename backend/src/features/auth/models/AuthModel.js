import BaseModel from "#core/models/BaseModel.js";

class AuthModel extends BaseModel {
    constructor(conn) {
        super("auth", conn);
    }
    async getUserByUsername(username){
        const query = `SELECT * FROM ${this.table} WHERE username = ?;`;
        try {
            const result = await this.query(query,[username]);
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async getUserByEmail(email){
        const query = `SELECT * FROM ${this.table} WHERE email = ?;`;
        try {
            const result = await this.query(query,[email]);
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async me(){
        return "This is reching the model";
    }
};

export default AuthModel;