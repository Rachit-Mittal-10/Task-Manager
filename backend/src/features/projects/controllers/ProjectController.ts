import { BaseCrudController } from "#core/controllers/BaseCrudController.js";
import type { ProjectModel } from "../models/ProjectModel.js";
import type { ProjectService } from "../services/ProjectService.js";

export class ProjectController extends BaseCrudController<ProjectModel, ProjectService> {}
