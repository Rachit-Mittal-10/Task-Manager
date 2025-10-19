import BaseCrudService from "#core/services/BaseCrudService.js";
import { hashPassword } from "../utils/AuthUtils.js";

class AuthService extends BaseCrudService {
    constructor(model) {
        super(model);
    }
    async login(username, email, password){
        if(!password || (!username && !email)){
            throw new Error("Username or email and password are required for login");
        }
        try {
            let user = null;
            // const nonHashedPassword = password;
            // password = await hashPassword(password);
            if(username){
                user = await this.model.loginByUsername(username, password);
            }
            else if(email){
                user = await this.model.loginByEmail(email, password);
            }
            return user;
        }
        catch(err){
            console.log(`Error during login in service: ${err.message}`);
            throw err;
        }
    }
    async register(username, email, password){
        if(!(username && email && password)){
            throw new Error("All parameters are required for registration");
        }
        try{
            const hashedPassword = await hashPassword(password);
            const result = await this.model.register(username, email, hashedPassword);
            return result;
        }
        catch (err) {
            console.log(err);
            throw err;
        }

    }
    async me(){
        return await this.model.me();
    }
};

export default AuthService;