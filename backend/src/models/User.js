import conn from "../config/mysql.js";
import { hashPassword } from "../utils/utils.js";

class User{
    create = async (username, email, password) => {
        const query = "INSERT INTO users(username, email, password_hashed) VALUES(?,?,?)";
        try{
            const passwordHashed = await hashPassword(password);
            const result = conn.query(query,[username, email, passwordHashed]);
            console.log(`Inserted the data.\n${JSON.stringify(result,null,2)}`);
        }
        catch(err){
            console.log(`Error while adding the data: ${err}`);
            throw err;
        }
    };

    checkUsername = async (username) => {
        const query = `SELECT * FROM users WHERE username=\'${username}\';`;
        try{
            const result = conn.query(query);
            console.log(JSON.stringify(result,null,2));
        }
        catch(err){
            console.log(`Error while checking whether account with this username exists: ${err}`)
            throw err;
        }
    };

    checkEmail = async (email) => {
        const query = "SELECT * FROM users WHERE email=?";
        try{
            const result = conn.query(query,[email]);
            console.log(result);
        }
        catch(err){
            console.log(`Error while checking whether account with this email exists: ${err}`)
        }
    };
};

export default User;