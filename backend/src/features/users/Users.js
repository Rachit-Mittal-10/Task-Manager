import UserModel from "./models/UserModel.js";
import UserService from "./services/UserService.js";
import UserController from "./controllers/UserController.js";
import UserRouter from "./routes/UserRouter.js";
import conn from "#config/mysql.js";

const userModel = new UserModel(conn);
const userService = new UserService(userModel);
const userController = new UserController(userService);
const userRouter = new UserRouter(userController);

export {
    userService,
    userRouter
};