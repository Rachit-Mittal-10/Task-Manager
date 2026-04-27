import { ProjectRepository } from "./repository/ProjectRepository.js";
import { ProjectService } from "./services/ProjectService.js";
import { ProjectController } from "./controllers/ProjectController.js";
import { ProjectRouter } from "./routes/ProjectRouter.js";
import { db } from "#config/knex.js";

const projectRepository: ProjectRepository = new ProjectRepository(db);
const projectService: ProjectService = new ProjectService(projectRepository, { db });
const projectController: ProjectController = new ProjectController(projectService);
const projectRouter: ProjectRouter = new ProjectRouter(projectController);

export { projectService, projectRouter };
