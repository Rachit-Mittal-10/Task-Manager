import BaseService from "#core/services/BaseCrudService.js";
import {
    generateToken,
    hashPassword,
    verifyPassword,
} from "../utils/AuthUtils.js";
import dotenv from "dotenv";

const env = dotenv.config({
    path: "../.env",
});

class AuthService extends BaseService {
    async login(username, email, password) {
        if (!password || (!username && !email)) {
            throw new Error(
                "Username or email and password are required for login",
            );
        }
        try {
            let user = null;
            if (username) {
                user = await this.repository.getUserByUsername(username, password);
            } else if (email) {
                user = await this.repository.getUserByEmail(email, password);
            }
            if (!user) {
                return null;
            }
            const userPassword = user[0]["password"];
            const passwordStatus = await verifyPassword(password, userPassword);
            if (!passwordStatus) {
                return null;
            }
            // this means user exist and password is verified
            const token = generateToken(user[0], process.env.JWT_SECRET_KEY);
            return {
                token,
            };
        } catch (err) {
            console.log(err);
            console.log(err.stack);
            throw err;
        }
    }
    /* 
    insertId is result.insertId
    */
    async register(username, email, password, firstname) {
        if (!(username && email && password && firstname)) {
            throw new Error("All parameters are required for registration");
        }
        try {
            const provider = this.getDep("user-service");
            const userResult = await provider.create({
                firstname,
            });
            const hashedPassword = await hashPassword(password);
            const result = await this.repository.create({
                username,
                email,
                password: hashedPassword,
                user_id: userResult.insertId,
            });
            return result;
        } catch (err) {
            switch (err.code) {
                case "ER_DUP_ENTRY":
                    console.log(`Error due to duplicate entry: ${err}`);
                    throw new Error("Duplicate Entry");
                    break;
                default:
                    console.log(`Error during registration in service: ${err}`);
                    throw err;
                    break;
            }
            throw err;
        }
    }
    async me() {
        return await this.repository.me();
    }
}

export default AuthService;
