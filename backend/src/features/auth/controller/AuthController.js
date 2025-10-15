import BaseController from "#core/controllers/BaseController.js";

class AuthController extends BaseController {
    constructor(service){
        super(service);
    }
    async login (request, response) {
        const { username, email, password } = request.body;
        try {
            const loginStatus = await this.service.login(username, email, password);
            return response.status(200);
        }
        catch (err) {
            response.status(401).json({
                message: "Login Failed. Invalid Credentials!!!"
            })
        }
    }
    async me (request, response) {
        const message = await this.service.me();

        response.status(200).json({
            message
        });
    }
};

export default AuthController;