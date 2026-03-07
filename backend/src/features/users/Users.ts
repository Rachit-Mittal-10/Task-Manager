import UserRepository from "./repository/UserRepository.js";
import UserService from "./services/UserService.js";
import UserController from "./controllers/UserController.js";
import UserRouter from "./routes/UserRouter.js";
import db from "#config/knex.js";

const userRepository: UserRepository = new UserRepository(db);
const userService: UserService = new UserService(userRepository);
const userController: UserController = new UserController(userService);
const userRouter: UserRouter = new UserRouter(userController);

export { userService, userRouter };
