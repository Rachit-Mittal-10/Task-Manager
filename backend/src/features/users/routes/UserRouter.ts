import { BaseCrudRouter } from "#core/routes/BaseCrudRouter.js";
import UserController from "../controllers/UserController.js";

class UserRouter extends BaseCrudRouter<UserController> {
    constructor(controller: UserController) {
        super(controller, ["create", "getAll"]);
    }
}

export default UserRouter;
