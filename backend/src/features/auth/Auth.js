import conn from "#config/mysql.js";
import AuthModel from "./models/AuthModel.js";
import AuthController from "./controller/AuthController.js";
import AuthService from "./services/AuthService.js";
import AuthRouter from "./routes/AuthRouter.js";

// Initialise model with db connection instance.
const AuthModelInstance = new AuthModel(conn);
// Initialise service with model instance.
const AuthServiceInstance = new AuthService(AuthModelInstance);
// Initialise controller with service instance.
const AuthControllerInstance = new AuthController(AuthServiceInstance);
// Initialise router with controller instance.
const AuthRouterInstance = new AuthRouter(AuthControllerInstance);

// Export the router and service instances.
export {
    AuthServiceInstance,
    AuthRouterInstance
};