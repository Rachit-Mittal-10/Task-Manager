import { BaseCrudController } from "#core/controllers/BaseCrudController.js";
import type { UserModel } from "../models/UserModel.js";
import { UserService } from "../services/UserService.js";

export class UserController extends BaseCrudController<UserModel, UserService> {}
