import conn from "#config/mysql.js";
import { hashPassword, verifyPassword } from "#utils/utils.js";

class User {
    static create = async (username, email, password) => {
        const query =
            "INSERT INTO users(username, email, password) VALUES(?,?,?)";
        try {
            const passwordHashed = await hashPassword(password);
            const [result] = await conn.execute(query, [
                username,
                email,
                passwordHashed,
            ]);
        } catch (err) {
            console.log(`Error while adding the data: ${err.message}`);
            throw err;
        }
    };

    //* This is the private function and ties the retrieved user information to class instance
    #checkUsername = async (username) => {
        const query = `SELECT * FROM users WHERE username=?`;
        try {
            const [result] = await conn.query(query, [username]);
            this.user = result[0];
        } catch (err) {
            console.log(
                `Error while checking whether account with this username exists: ${err}`,
            );
            throw err;
        }
    };

    //* This is the private function and ties the retrieved user information to class instance
    #checkEmail = async (email) => {
        const query = "SELECT * FROM users WHERE email=?";
        try {
            const [result] = await conn.query(query, [email]);
            this.user = result[0];
        } catch (err) {
            console.log(
                `Error while checking whether account with this email exists: ${err}`,
            );
            throw err;
        }
    };

    verifyUserByUsername = async (username, password) => {
        try {
            await this.#checkUsername(username);
            const verifyStatus = await verifyPassword(
                password,
                this.user.password,
            );
            return verifyStatus;
        } catch {
            return false;
        }
    };

    verifyUserByEmail = async (email, password) => {
        try {
            await this.#checkEmail(email);
            const verifyStatus = await verifyPassword(
                password,
                this.user.password,
            );
            return verifyStatus;
        } catch {
            return false;
        }
    };

    static getUserDetails = async (userId) => {
        const query = "SELECT username,email FROM users WHERE id = ?";
        try {
            const result = await conn.execute(query, [userId]);
            return result[0][0];
        }
        catch (err) {
            console.log(`Error while getting user data: ${err.message}`);
            throw err;
        }
    }
}

export default User;
