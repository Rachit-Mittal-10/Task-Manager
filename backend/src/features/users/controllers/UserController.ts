import { BaseCrudController } from "#core/controllers/BaseCrudController.js";
import UserService from "../services/UserService.js";

class UserController extends BaseCrudController<UserService> {}

export default UserController;
