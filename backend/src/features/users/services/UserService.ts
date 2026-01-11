import { BaseCrudService } from "#core/services/BaseCrudService.js";
import UserRepository from "../repository/UserRepository.js";

class UserService extends BaseCrudService<UserRepository> {}

export default UserService;
