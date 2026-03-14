import { BaseCrudService } from "#core/services/BaseCrudService.js";
import { UserModel } from "../models/UserModel.js";
import { UserRepository } from "../repository/UserRepository.js";

export class UserService extends BaseCrudService<UserModel, UserRepository> {}
