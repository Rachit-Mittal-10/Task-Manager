import BaseController from "#core/controllers/BaseController.js";

class AuthController extends BaseController {
    constructor(service){
        super(service);
    }
    async login (request, response) {
        const { username, email, password } = request.body;
        try {
            const loginStatus = await this.service.login(username, email, password);
        }
        catch (err) {
            response.status(401).json({
                message: "Login Failed. Invalid Credentials!!!"
            })
        }
    }
};

export default AuthController;