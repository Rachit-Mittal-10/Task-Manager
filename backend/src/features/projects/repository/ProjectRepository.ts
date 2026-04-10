import { BaseCrudRepository } from "#core/repository/BaseCrudRepository.js";
import type { Knex } from "knex";
import { ProjectModel } from "../models/ProjectModel.js";

export class ProjectRepository extends BaseCrudRepository<ProjectModel> {
    constructor(conn: Knex) {
        super("projects", conn, ProjectModel);
    }
    protected getOwnerColumn(): string {
        return "user_id";
    }
}
