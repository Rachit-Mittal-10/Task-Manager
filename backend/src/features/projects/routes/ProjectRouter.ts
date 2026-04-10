import { BaseCrudRouter } from "#core/routes/BaseCrudRouter.js";
import type { ProjectController } from "../controllers/ProjectController.js";

export class ProjectRouter extends BaseCrudRouter<ProjectController> {
    constructor(controller: ProjectController) {
        super(controller);
    }
}
