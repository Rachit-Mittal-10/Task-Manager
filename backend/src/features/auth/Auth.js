import conn from "#config/mysql.js";
import AuthModel from "./models/AuthModel";
import AuthController from "./controllers/AuthController";
import AuthService from "./services/AuthService";
import AuthRouter from "./routes/AuthRouter";

// Initialise model with db connection instance.
const authModel = new AuthModel(conn);
// Initialise service with model instance.
const authService = new AuthService(authModel);
// Initialise controller with service instance.
const authController = new AuthController(authService);
// Initialise router with controller instance.
const authRouter = new AuthRouter(authController);

// Export the router and service instances.
export {
    authService,
    authRouter
};