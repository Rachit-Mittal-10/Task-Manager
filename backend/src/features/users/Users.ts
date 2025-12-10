import UserRepository from "./repository/UserRepository.js";
import UserService from "./services/UserService.js";
import UserController from "./controllers/UserController.js";
import UserRouter from "./routes/UserRouter.js";
import conn from "#config/mysql.js";

const userRepository = new UserRepository(conn);
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRouter = new UserRouter(userController);

export { userService, userRouter };
