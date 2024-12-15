import conn from "../config/mysql.js";
import { hashPassword, verifyPassword } from "../utils/utils.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const env = dotenv.config({
    path: "./.env"
});

class User{
    static create = async (username, email, password) => {
        const query = "INSERT INTO users(username, email, password_hashed) VALUES(?,?,?)";
        try{
            const passwordHashed = await hashPassword(password);
            const result = await conn.query(query,[username, email, passwordHashed]);
            // console.log(`Inserted the data.\n${JSON.stringify(result,null,2)}`);
        }
        catch(err){
            console.log(`Error while adding the data: ${err.message}`);
            throw err;
        }
    };

    static checkUsername = async (username) => {
        const query = `SELECT * FROM users WHERE username=?`;
        try{
            const [result] = await conn.query(query,[username]);
            return result[0];
        }
        catch(err){
            console.log(`Error while checking whether account with this username exists: ${err}`)
            throw err;
        }
    };

    static checkEmail = async (email) => {
        const query = "SELECT * FROM users WHERE email=?";
        try{
            const [result] = await conn.query(query,[email]);
            return result[0];
        }
        catch(err){
            console.log(`Error while checking whether account with this email exists: ${err}`);
            throw err;
        }
    };

    generateToken = () => {
        const payload = {
            id: this.user.id,
            username: this.user.username,
            email: this.user.email
        }
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            {expiresIn:"1h"}
        );
        return token;
    };

    verifyUserByUsername = async (username, password) => {
        const user = await User.checkUsername(username);
        this.user = user;
        const verifyStatus = await verifyPassword(password, user.password_hashed)
        return verifyStatus;
    };

    verifyUserByEmail = async (email, password) => {
        const user = await User.checkEmail(email);
        this.user = user;
        const verifyStatus = await verifyPassword(password, user.password_hashed);
        return verifyStatus;
    }
};

export default User;