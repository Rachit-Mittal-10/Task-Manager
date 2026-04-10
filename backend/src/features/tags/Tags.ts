import { TagRepository } from "./repository/TagRepository.js";
import { TagService } from "./services/TagService.js";
import { TagController } from "./controllers/TagController.js";
import { TagRouter } from "./routes/TagRouter.js";
import { db } from "#config/knex.js";

const tagRepository: TagRepository = new TagRepository(db);
const tagService: TagService = new TagService(tagRepository);
const tagController: TagController = new TagController(tagService);
const tagRouter: TagRouter = new TagRouter(tagController);

export { tagService, tagRouter };
