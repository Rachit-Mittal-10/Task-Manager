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
            return response.status(401).json({
                message: "Login Failed. Invalid Credentials!!!"
            })
        }
    }
    async register(request, response){
        const {username, email, password} = request.body;
        try{
            const result = await this.service.register(username, email, password);
            return response.status(201).json({
                result
            });
        }
        catch(err) {
            return response.status(404).json({
                message: "Error Occured!!!"
            });
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