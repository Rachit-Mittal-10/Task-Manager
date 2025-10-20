import UserModel from "./models/UserModel";
import UserService from "./services/UserService";
import UserController from "./controller/UserController";
import UserRouter from "./routes/UserRouter";
import conn from "#config/mysql.js";

const userModel = new UserModel(conn);
const userService = new UserService(userModel);
const userController = new UserController(userService);
const userRouter = new UserRouter(userController);

export {
    userService,
    userRouter
};