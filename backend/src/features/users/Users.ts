import UserRepository from "./repository/UserRepository.js";
import UserService from "./services/UserService.js";
import UserController from "./controllers/UserController.js";
import UserRouter from "./routes/UserRouter.js";
import conn from "#config/mysql.js";

const userRepository: UserRepository = new UserRepository(conn);
const userService: UserService = new UserService(userRepository);
const userController: UserController = new UserController(userService);
const userRouter: UserRouter = new UserRouter(userController);

export { userService, userRouter };
