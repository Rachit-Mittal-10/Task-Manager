import AuthModel from "./models/AuthModel";
import AuthController from "./controllers/AuthController";
import AuthService from "./services/AuthService";
import conn from "#config/mysql.js";

// Initalise model with db connection instance.
const authModel = new AuthModel(conn);
const authService = new AuthService(authModel);
const authController = new AuthController(authService);

export {
    authService,
    authController
};