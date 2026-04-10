import { BaseCrudService } from "#core/services/BaseCrudService.js";
import type { ProjectModel } from "../models/ProjectModel.js";
import type { ProjectRepository } from "../repository/ProjectRepository.js";

export class ProjectService extends BaseCrudService<ProjectModel, ProjectRepository> {}
