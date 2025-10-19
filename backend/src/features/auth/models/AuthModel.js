import BaseModel from "#core/models/BaseModel.js";

class AuthModel extends BaseModel {
    constructor(conn) {
        super("auth", conn);
    }
    async loginByUsername(username, password) {
        const customQuery = `SELECT * FROM ${this.table} WHERE username = ?;`;
        try {
            const result = await this.query(customQuery, [username]);
            console.log(result);
            if (result.length === 0) {
                return null; // User not found
            }
            const user = result[0];
            // Here you would typically compare the hashed password
            return user;
        }
        catch (err) {
            // console.log(`Error during login by username in table ${this.table}: ${err.message}`);
            throw err;
        }
    }
    async loginByEmail(email, password) {
        const customQuery = `SELECT * FROM ${this.table} WHERE email = ?;`;
        try {
            const result = await this.query(customQuery, [email]);
            if (result.length === 0) {
                return null; // User not found
            }
            console.log(result);
            const user = result[0];
            // Here you would typically compare the hashed password
            // if (verifyPassword(password, user.password)) {
            //     return user;
            // } else {
            //     return null; // Invalid password
            // }
        }
        catch (err) {
            // console.log(`Error during login by email in table ${this.table}: ${err.message}`);
            throw err;
        }
    }
    async register(username, email, password) {
        const userData = { username, email, password, };
        try {
            const result = await this.create(userData);
            return result;
        }
        catch (err) {
            console.log(`Error during registration in table ${this.table}: ${err.message}`);
            throw err;
        }
    }
    async me(){
        return "This is reching the model";
    }
};

export default AuthModel;