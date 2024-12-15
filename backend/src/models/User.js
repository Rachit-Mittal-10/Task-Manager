import conn from "../config/mysql.js";
import { hashPassword } from "../utils/utils.js";

class User{
    create = async (username, email, password) => {
        const query = "INSERT INTO users(username, email, password_hashed) VALUES(?,?,?)";
        try{
            const passwordHashed = await hashPassword(password);
            const result = conn.query(query,[username, email, passwordHashed]);
            console.log(`Inserted the data.`);
        }
        catch(err){
            console.log(`Error while adding the data: ${err}`);
            throw err;
        }
    };

    checkUsername = async (username) => {
        const query = "SELECT * FROM users WHERE username=?";
        try{
            const result = conn.query(query,[username]);
            console.log(result);
        }
        catch(err){
            throw err;
        }
    };
};

export default User;