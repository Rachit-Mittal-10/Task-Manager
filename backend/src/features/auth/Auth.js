import conn from "#config/mysql.js";
import AuthRepository from "./repository/AuthRepository.js";
import AuthController from "./controllers/AuthController.js";
import AuthService from "./services/AuthService.js";
import AuthRouter from "./routes/AuthRouter.js";
import { userService } from "#features/users/Users.js";

// Initialise model with db connection instance.
const authRepository = new AuthRepository(conn);
// Initialise service with model instance.
const authService = new AuthService(authRepository, {
    "user-service": userService,
});
// Initialise controller with service instance.
const authController = new AuthController(authService);
// Initialise router with controller instance.
const authRouter = new AuthRouter(authController);

// Export the router and service instances.
export { authService, authRouter };
